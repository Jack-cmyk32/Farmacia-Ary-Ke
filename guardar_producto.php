<?php
include 'db.php';

if (
    isset($_POST['nombre'], $_POST['precio'], $_POST['descripcion'], $_POST['imagen'], $_POST['id_usuario'], $_POST['cantidad'])
) {
    $nombre = $_POST['nombre'];
    $precio = number_format(floatval($_POST['precio']), 3, '.', ''); // Formato decimal(65,3)
    $descripcion = $_POST['descripcion'];
    $imagen = $_POST['imagen'];
    $id_usuario = intval($_POST['id_usuario']);
    $cantidad = intval($_POST['cantidad']);
    $fecha = date('Y-m-d');

    // 1. Verificar si el producto ya existe
    $check = $conn->prepare("SELECT id_prod FROM producto WHERE nombre = ? AND precio = ?");
    if (!$check) {
        die("Error en prepare SELECT: " . $conn->error);
    }

    $check->bind_param("sd", $nombre, $precio);
    $check->execute();
    $result = $check->get_result();

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $id_prod = $row['id_prod'];
    } else {
        // 2. Insertar nuevo producto
        $stmt = $conn->prepare("INSERT INTO producto (nombre, precio, descripcion, imagen) VALUES (?, ?, ?, ?)");
        if (!$stmt) {
            die("Error en prepare INSERT producto: " . $conn->error);
        }

        $stmt->bind_param("sdss", $nombre, $precio, $descripcion, $imagen);
        if ($stmt->execute()) {
            $id_prod = $stmt->insert_id;
        } else {
            die("Error al ejecutar INSERT producto: " . $stmt->error);
        }

        $stmt->close();
    }

    // 3. Insertar en carrito_de_compras
    $stmt_cart = $conn->prepare("INSERT INTO carrito_de_compras (id, id_prod, cantidad, fecha_agregado) VALUES (?, ?, ?, ?)");
    if (!$stmt_cart) {
        die("Error en prepare INSERT carrito: " . $conn->error);
    }

    $stmt_cart->bind_param("iiis", $id_usuario, $id_prod, $cantidad, $fecha);
    if ($stmt_cart->execute()) {
        echo "Producto agregado al carrito exitosamente.";
    } else {
        echo "Error al insertar en carrito_de_compras: " . $stmt_cart->error;
    }

    $stmt_cart->close();
    $check->close();
} else {
    echo "Datos incompletos. POST recibido: ";
    print_r($_POST);
}
?>

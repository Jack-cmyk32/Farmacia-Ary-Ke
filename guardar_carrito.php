<?php
include 'db.php';

if (isset($_POST['id_users'], $_POST['id_prod'], $_POST['cantidad'])) {  // Cambié 'id' a 'id_users'
    $id_users = $_POST['id_users'];  // Cambié 'id' a 'id_users'
    $id_prod = $_POST['id_prod'];
    $cantidad = $_POST['cantidad'];
    $fecha = date('Y-m-d H:i:s');

    // Depuración: Verifica los valores que estás recibiendo
    echo "ID Usuario: " . $id_users . "<br>";  // Mostrar id del usuario
    echo "ID Producto: " . $id_prod . "<br>";
    echo "Cantidad: " . $cantidad . "<br>";

    $stmt = $conn->prepare("INSERT INTO carrito_de_compras (id, id_prod, cantidad, fecha_agregado) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("iiis", $id_users, $id_prod, $cantidad, $fecha);  // Cambié 'id' a 'id_users'

    if ($stmt->execute()) {
        echo "Carrito actualizado exitosamente.";
    } else {
        echo "Error al guardar en carrito_de_compras: " . $stmt->error;
    }

    $stmt->close();
} else {
    echo "Datos incompletos para carrito.";
}
?>

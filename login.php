<?php
/*
require 'db.php';

header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $email = trim($_POST['email']);
    $password = $_POST['password'];

    $stmt = $conn->prepare("SELECT username, password FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows === 1) {
        $stmt->bind_result($username, $hashed_password);
        $stmt->fetch();

        if (password_verify($password, $hashed_password)) {
            echo json_encode(['success' => true, 'username' => $username]);
            exit;
        } else {
            echo json_encode(['success' => false, 'message' => 'Contraseña incorrecta.']);
            exit;
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Usuario no encontrado.']);
        exit;
    }
}
echo json_encode(['success' => false, 'message' => 'Solicitud inválida.']);
?>*/

require 'db.php';

header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $email = trim($_POST['email']);
    $password = $_POST['password'];

    // ✅ Modificamos la consulta para incluir también el ID
    $stmt = $conn->prepare("SELECT id, username, password FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows === 1) {
        $stmt->bind_result($id, $username, $hashed_password);
        $stmt->fetch();

        if (password_verify($password, $hashed_password)) {
            // ✅ Devolvemos también el ID
            echo json_encode([
                'success' => true,
                'id' => $id,
                'username' => $username
            ]);
            exit;
        } else {
            echo json_encode([
                'success' => false,
                'message' => 'Contraseña incorrecta.'
            ]);
            exit;
        }
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'Usuario no encontrado.'
        ]);
        exit;
    }
}

echo json_encode([
    'success' => false,
    'message' => 'Solicitud inválida.'
]);
?>


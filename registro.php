<?php
require 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = trim($_POST['email']);
    $username = trim($_POST['username']);
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);

    if (!empty($email) && !empty($username) && !empty($password)) {
        $stmt = $conn->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $username, $email, $password);

        if ($stmt->execute()) {
            // Obtener el ID del usuario recién insertado
            $user_id = $stmt->insert_id;

            // JS que guarda el username y el id del usuario, y redirige a index.html
            echo "<script>
                localStorage.setItem('username', " . json_encode($username) . ");
                localStorage.setItem('user_id', " . json_encode($user_id) . ");
                window.location.href = 'index.html';
            </script>";
            exit();
        } else {
            echo "Error al registrar: " . $stmt->error;
        }
        $stmt->close();
    } else {
        echo "Todos los campos son obligatorios.";
    }
}
$conn->close();
?>

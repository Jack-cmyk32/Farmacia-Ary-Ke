<?php
/*
// db.php - Archivo de conexión a la base de datos
$host = "localhost";
$user = "root";
$password = "";
$dbname = "db_farmacia";

$conn = new mysqli($host, $user, $password, $dbname);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}
?>
*/

// db.php - Conexión a base de datos en Clever Cloud

$host = "b0ugerqswzqotwcctdpa-mysql.services.clever-cloud.com";
$user = "uufbop1vssflcvqi";
$password = "6dqOoMb2X5rHM0BFUcQg";
$dbname = "b0ugerqswzqotwcctdpa";
$port = 3306;

$conn = new mysqli($host, $user, $password, $dbname, $port);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}
?>

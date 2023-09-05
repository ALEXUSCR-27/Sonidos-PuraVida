<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Content-Type: text/html; charset=utf-8");
$method = $_SERVER['REQUEST_METHOD'];

function connectDB() {
    $servername = "localhost";
    $username = "root";
    $password = "Smand.com2772";
    $database = "prueba";

    $conn = new mysqli($servername, $username, $password, $database);
    if ($conn){
        echo "";
    }
    else {
        echo 'Ha sucedido un error inexperado en la conexion de la base de datos';
    }

    return $conn;
}

?>

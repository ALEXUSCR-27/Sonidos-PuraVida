<?php
$servername = "localhost";
$username = "root";
$password = "Smand.com2772";
$database = "sonidos-puravida";


function connectDB() {
    $servername = "localhost";
    $username = "root";
    $password = "Smand.com2772";
    $database = "sonidos-puravida";

    $conn = new mysqli($servername, $username, $password, $database);
    if ($conn){
        return $conn;
    }
    else {
        return null;
    }
    
}

?>

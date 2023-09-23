<?php
const servername = "localhost";
const username = "admin";
const password = "sonidos_puravida-uned_2023";
const database = "sonidos_puravida";

function connectDB() {
    try {
        $connection = new mysqli(servername, username, password, database);
        if ($connection){
            return $connection;
        }
        else {
            throw new Exception("Database error connection: " . $connection->connect_error);
            return null;
        }
    }
    catch (Exception $e) {
        echo "Error: " . $e->getMessage();
    }
    
}

?>

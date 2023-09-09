<?php
include "../db-config/db-connection.php";

function registerPostInDB($data) {
    $namePost = $data["namePost"];
    $sound = $data["sound"];
    $picture = $data["picture"]; 
    $username = $data["username"];
    $lastname = $data["lastname"];
    $postDetails = $data["postDetails"];
    $lat = $data["lat"];
    $long = $data["long"];

    //echo json_encode(array("mensaje"=>"llego bien", "user"=>$lat));

    
    $connection = connectDB();
    if ($connection != null) {
        
        $sql = "SELECT * FROM Provincias;";
        $stmt = $connection->prepare($sql);
        $stmt->execute();
        echo json_encode($stmt);



    
        /*
        $sql_query = "CALL procedureInsertarPublicacion (:codigoProvincia, :titulo, :descripcion, :fecha, :nombreAutor, :sonido, :foto";
        $stmt = $connection->prepare($sql_query);
        $stmt->bindParam(':codigoProvincia', $codigoProvincia, PDO::PARAM_INT);
        $stmt->bindParam(':titulo', $titulo, PDO::PARAM_STR);
        $stmt->bindParam(':descripcion', $descripcion, PDO::PARAM_STR);
        $stmt->bindParam(':fecha', $fecha, PDO::PARAM_STR);
        $stmt->bindParam(':nombreAutor', $nombreAutor, PDO::PARAM_STR);
        $stmt->bindParam(':sonido', $sonido, PDO::PARAM_STR);
        $stmt->bindParam(':foto', $foto, PDO::PARAM_STR);
        if ($stmt->execute()) {
            echo "La llamada al procedimiento almacenado se realizó correctamente.";
        } else {
            echo "Error al ejecutar la consulta: " . $stmt->errorInfo()[2];
        }*/

    }
    else {
        echo json_encode(array("mensaje"=>"error"));
    }
    $connection->close();
}

?>
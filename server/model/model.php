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
    try {
    
   
        
        $sql = "SELECT * FROM Administradores;";
        $stmt = connectDB();
        $result = $stmt->query($sql);
            print("exito");
            if ($result->num_rows > 0) {
                echo json_encode(array('conectado'=>true, 'todo good'));
                // Crear un array para almacenar los resultados
                $mensajes = array();
        
                // Iterar a través de los resultados y agregarlos al array
                while ($row = $result->fetch_assoc()) {
                    $mensajes[] = $row;
                }
        
                // Devolver los resultados como JSON al frontend
                header('Content-Type: application/json');
                echo json_encode($mensajes);
         }
        
        //$stmt->execute();
        //$resultados = $stmt->fetchAll(PDO::FETCH_ASSOC);
    

        //foreach ($resultados as $fila) {
        //    echo "ID: " . $fila['id'] . "<br>";
        //    echo "Nombre: " . $fila['nombre'] . "<br>";
        //    echo "Correo: " . $fila['correo'] . "<br>";
        //    echo "<hr>";
        //}

    }
    catch (PDOException $e) {
        echo "Error de consulta: " . $e->getMessage();
    }

    
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

?>

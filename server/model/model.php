<?php
include "../db-config/db-connection.php";

function registerPostInDB($data) {

    $namePost = $data["namePost"];
    $sound = $data["sound"];
    $picture = $data["picture"]; 
    $username = $data["username"];
    $lastname = $data["lastname"];
    $postDetails = $data["postDetails"];
    $lat = (double)$data["lat"];
    $long = (double)$data["long"];
    $codigoProvincia = 1;
    $actual_date = date("Y-m-d");
    try {
        $sql_query = "CALL procedureInsertarPublicacion($codigoProvincia, '$namePost', $lat, $long, '$postDetails', '$actual_date', '$username', '$lastname', '$sound', '$picture');";
        echo json_encode(array("consulta"=>$sql_query));
        $stmt = connectDB();
        $stmt->query($sql_query);
        if(!$stmt) {
            die("Error en la consulta: " . mysqli_error($stmt));
        }
        $stmt->close();

    }
    catch (PDOException $e) {
        echo "Error de consulta: " . $e->getMessage();
    }

}

function getPostFromDB() {
    try {

        $sql_query = "SELECT * FROM Publicaciones;";
        $stmt = connectDB();
        $result = $stmt->query($sql_query);
         
        if(!$stmt) {
            die("Error en la consulta: " . mysqli_error($stmt));
        }
        $posts = array();
        if ($result->num_rows > 0) {
                while ($row = $result->fetch_assoc()) {
                    $posts[] = array("titulo"=>$row["titulo"],"autor"=>$row["nombreAutor"]. $row["ApellidoAutor"], "descripcion"=>$row["descripcion"]);
                }
                
         }

        $stmt->close();
        header('Content-Type: application/json');
        echo json_encode($posts);

    }
    catch (PDOException $e) {
        echo "Error de consulta: " . $e->getMessage();
    }
}

?>

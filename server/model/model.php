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
    $province = $data["province"];
    $actual_date = date("Y-m-d");
    try {
        $sql_query = "CALL procedureInsertarPublicacion('$province', '$namePost', $lat, $long, '$postDetails', '$actual_date', '$username', '$lastname', '$sound', '$picture');";
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

        $sql_query = "SELECT *, AsText(ubicacion) as coordenadas FROM Publicaciones;";
        $stmt = connectDB();
        $result = $stmt->query($sql_query);
         
        if(!$stmt) {
            die("Error en la consulta: " . mysqli_error($stmt));
        }
        $posts = array();
        if ($result->num_rows > 0) {
                while ($row = $result->fetch_assoc()) {
                    $posts[] = array("titulo"=>$row["titulo"],"autor"=>$row["nombreAutor"]." ". $row["ApellidoAutor"], "descripcion"=>$row["descripcion"], "codigoPublicacion"=>$row["codigoPublicacion"], "foto"=>$row["fotografia"], "coordenadas"=>$row["coordenadas"], "fecha"=>$row["fecha"], "provincia"=>$row["provincia"]);
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

function getAdmins($username) {
    try {

        $sql_query = "CALL procedureBuscarAdministrador('$username');";
        $stmt = connectDB();
        $result = $stmt->query($sql_query);
         
        if(!$stmt) {
            die("Error en la consulta: " . mysqli_error($stmt));
        }
        /*
        $posts = array();
        if ($result->num_rows > 0) {
                while ($row = $result->fetch_assoc()) {
                    $posts[] = array("nombre"=>$row["nombreAdministrador"]);
                }
                
         }*/

        $stmt->close();
        //header('Content-Type: application/json');
        //echo json_encode($posts);


        return $result;

    }
    catch (PDOException $e) {
        echo "Error de consulta: " . $e->getMessage();
    }
}

function deletePostFromDB($id) {
    try {
        $sql_query = "CALL procedureEliminarPublicacion($id);";
        $stmt = connectDB();
        $result = $stmt->query($sql_query);
            
        if(!$stmt) {
            die("Error en la consulta: " . mysqli_error($stmt));
        }
        $posts = array();

        $stmt->close();
        header('Content-Type: application/json');
        echo json_encode($posts);

    }
    catch (PDOException $e) {
        echo "Error de consulta: " . $e->getMessage();
    }
}

function filterPostsFromDB($data) {
    $title = $data["titulo"];
    $author = $data["autor"];
    $province = $data["provincia"];
    $datePost = date('Y-m-d', strtotime($data["fecha"]));

    try {
        $sql_query = "CALL procedurefiltrarPublicaciones('$title','$author','$province','$datePost');";
        $stmt = connectDB();
        //echo json_encode(array("consulta"=>$sql_query));
        $result = $stmt->query($sql_query);
         
        if(!$stmt) {
            die("Error en la consulta: " . mysqli_error($stmt));
        }
 
        $posts = array();
        if ($result->num_rows > 0) {
                while ($row = $result->fetch_assoc()) {
                    $posts[] = array("titulo"=>$row["titulo"],"autor"=>$row["nombreAutor"]." ". $row["ApellidoAutor"], "descripcion"=>$row["descripcion"], "codigoPublicacion"=>$row["codigoPublicacion"], "foto"=>$row["fotografia"], "coordenadas"=>$row["coordenadas"], "fecha"=>$row["fecha"], "provincia"=>$row["provincia"]);
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

<?php
include "./db-config/db-connection.php";

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
                    $posts[] = array("titulo"=>$row["titulo"],"autor"=>$row["nombreAutor"]." ". $row["ApellidoAutor"], "descripcion"=>$row["descripcion"], "codigoPublicacion"=>$row["codigoPublicacion"], "foto"=>$row["fotografia"], "coordenadas"=>$row["coordenadas"], "fecha"=>$row["fecha"], "provincia"=>$row["provincia"], "audio"=>$row["sonido"]);
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
                    $posts[] = array("titulo"=>$row["titulo"],"autor"=>$row["nombreAutor"]." ". $row["ApellidoAutor"], "descripcion"=>$row["descripcion"], "codigoPublicacion"=>$row["codigoPublicacion"], "foto"=>$row["fotografia"], "coordenadas"=>$row["coordenadas"], "fecha"=>$row["fecha"], "provincia"=>$row["provincia"], "audio"=>$row["sonido"]);
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

function generateName($file_name, $upload_dir) {
    $random_name = date("Y-m-d") . "_" . rand(1000,1000000) . "-". $file_name;
    $upload_name = $upload_dir.strtolower($random_name);
    $upload_name = preg_replace('/\s+/', '-', $upload_name);
    return $upload_name;
}


function uploadFilesInDB($data) {
    $upload_dir_IMG = SITE_ROOT.'/uploads/postImages/';
    $upload_dir_AUD = SITE_ROOT.'/uploads/postSounds/';
    $carpeta = SITE_ROOT.'/uploads';
    $permisos = "755";

    // Asegúrate de validar o sanitizar la entrada antes de usarla en un comando shell.

    // Construye el comando chmod
    $comando = "sudo chmod -R $permisos $carpeta";

    // Ejecuta el comando
    $resultado = exec($comando, $salida, $codigo_salida);
        
    if (!is_dir($upload_dir_IMG)) {
        echo "no existe";
        //mkdir($uploadDir, 0755, true);
    }

    $file_name_Img = "";
    $file_tmp_name_Img = "";
    $file_name_aud = "";
    $file_tmp_name_aud = "";
    $response = [];
    
    //echo json_encode($data);
    if ($data["image"] != null) {
        $file_name_Img = $data["image"]["name"];
        $file_tmp_name_Img = $data["image"]["tmp_name"];
        $upload_name = generateName($file_name_Img, $upload_dir_IMG);

        if(move_uploaded_file($file_tmp_name_Img, $upload_name)) {
            $path = './'.$upload_name;
            $type = pathinfo($path, PATHINFO_EXTENSION);
            $data_Img = file_get_contents($path);
            $delimitador = '/\/server\//';
            $basePath = preg_split($delimitador, $path)[1];
           
            $response['successIMG'] = true;
            $response['imageUrl'] = $basePath;
    
        } else {
            $response['successIMG'] = false;
            $response['errorIMG'] = $path["file"]["error"];
        }
    }

    if ($data["audio"] != null) {
        $file_name_aud = $data["audio"]["name"];
        $file_tmp_name_aud = $data["audio"]["tmp_name"];
        $upload_name = generateName($file_name_aud, $upload_dir_AUD);

        if(move_uploaded_file($file_tmp_name_aud, $upload_name)) {
            $path = './'.$upload_name;
            $type = pathinfo($path, PATHINFO_EXTENSION);
            $data_Aud = file_get_contents($path);
            $delimitador = '/\/server\//';
            $basePath = preg_split($delimitador, $path)[1];
           
            $response['successAUD'] = true;
            $response['audioUrl'] = $basePath;
    
        } else {
            $response['successAUD'] = false;
            $response['errorAUD'] = $path["file"]["error"];
        }
    }

    echo json_encode($response);

}

?>

<?php
include "../model/model.php";

function registerPost($data) {
    //validar recaptcha
    registerPostInDB($data);
    
    //header('Content-Type: application/json');
    //echo json_encode(array('conectado'=>true, 'todo good'));
}

/*


include "server.php";
$mysqli = connectDB();
    $JSONData = file_get_contents("php://input");
	$dataObject = json_decode($JSONData);
    $usuario = $dataObject-> mensaje;
    
    
    $sql = "SELECT * FROM mensajes";
    //echo json_encode(array('conectado'=>true, 'todo good'));
    // Ejecutar la consulta
    $result = $mysqli->query($sql);

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

    $mysqli->close();

//header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

header("Access-Control-Allow-Headers: Content-Type, Authorization");

include 'server.php'; // Incluye el archivo de conexión.

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Origin: http://localhost");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    http_response_code(204);
    exit;
}


if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Manejar solicitudes GET aquí, por ejemplo, obtener mensajes de la base de datos.
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Manejar solicitudes POST aquí, por ejemplo, insertar un nuevo mensaje en la base de datos.
} else {
    http_response_code(405); // Método no permitido.
    echo json_encode(array("message" => "Método no permitido."));
}*/




?>

<?php
include "../controller/controller.php";
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Content-Type: text/html; charset=utf-8");


$JSONData = file_get_contents("php://input");
$data = json_decode($JSONData, true);

if (isset($_GET['action'])) {
    $action = $_GET['action'];
    if ($action === 'registerPost') {
        registerPost($data);
    }
    if ($action === 'getPost') {
        getPost();
    }
    
}



?>
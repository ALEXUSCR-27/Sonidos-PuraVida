<?php

include "./controller/controller.php";
define ('SITE_ROOT', realpath(dirname(__FILE__)));
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Content-Type: text/html; charset=utf-8");


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_GET['action'])) {
        $action = $_GET['action'];
        if ($action === 'registerPost') {
            $JSONData = file_get_contents("php://input");
            $data = json_decode($JSONData, true);
            registerPost($data);
        }
        if ($action === 'getPost') {
            $JSONData = file_get_contents("php://input");
            $data = json_decode($JSONData, true);
            getPost();
        }
        if ($action === 'adminModule') {
            $JSONData = file_get_contents("php://input");
            $data = json_decode($JSONData, true);
            adminLogin($data);
        }
        if ($action === 'deletePost') {
            $JSONData = file_get_contents("php://input");
            $data = json_decode($JSONData, true);
            deletePost($data);
        }
        if ($action === 'filterPosts') {
            $JSONData = file_get_contents("php://input");
            $data = json_decode($JSONData, true);
            filterPosts($data);
            
        }
        if ($action === 'uploadFiles') {
            $data = $_FILES;
            uploadFiles($data);
        }
        
    }
}



?>
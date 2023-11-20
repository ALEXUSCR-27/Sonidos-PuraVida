<?php
include "./model/model.php";

function registerPost($data) {
    //validar recaptcha
    echo json_encode($data);
    registerPostInDB($data);
     
}

function getPost() {
    getPostFromDB();
}


function adminLogin($data) {
    $username = $data["username"];
    $password = $data["password"];
    $result = getAdmins($username);
    $flag = 0;
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $passAdmin = $row["contraseña"];
            if ($passAdmin == $password) {
                $flag = 1;
            }
        }

    }
    header('Content-Type: application/json');
    echo json_encode(array("result"=>$flag));
}

function deletePost($data) {
    $id = (int) $data["id"];
    deletePostFromDB($id);
}

function filterPosts($data) {
    filterPostsFromDB($data);
}

function uploadFiles($data) {
    uploadFilesInDB($data);
}

function modifyPost($data) {
    modifyPostInDB($data);
}

?>

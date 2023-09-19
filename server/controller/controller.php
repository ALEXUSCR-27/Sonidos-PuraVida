<?php
include "../model/model.php";

function registerPost($data) {
    //validar recaptcha
    registerPostInDB($data);
    
   
}

function getPost() {
    getPostFromDB();
}

//probando smart commits


?>

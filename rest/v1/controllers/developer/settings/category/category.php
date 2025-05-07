<?php

//Set http header
require '../../../../core/header.php';
// use needed functions
require '../../../../core/functions.php';
// use needed models
require '../../../../models/developer/settings/category/Category.php';
$body = file_get_contents("php://input");
$data = json_decode($body, true);

if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    //GET READ ALL OR BY ID

    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $result = require 'read.php';
        sendResponse($result);
        exit;
    }

    // POST OR CREATE
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $result = require 'create.php';
        sendResponse($result);
        exit;
    }
}

http_response_code(200);
checkEndpoint();

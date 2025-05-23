<?php

// set http header
require '../../../core/header.php';
// use needed function
require '../../../core/functions.php';
// use needed models
require '../../../models/developer/about/About.php';
require './function.php';


$conn = null;
$conn = checkDbConnection();


$about = new About($conn);

$body = file_get_contents('php://input');
$data = json_decode($body, true);

if (isset($_SERVER['HTTP_AUTHORIZATION'])) {

    checkPayload($data);

    $about->search = $data['searchValue'];

    if ($data['isFilter']) {
        $about->about_is_active = $data['isActive'];
        http_response_code(200);

        if ($about->search != '') {
            $query = checkFilterSearch($about);
            getQueriedData($query);
        }
        $query = checkFilter($about);
        getQueriedData($query);
    }

    $query = checkSearch($about);
    http_response_code(200);
    getQueriedData($query);
}

checkEndpoint();

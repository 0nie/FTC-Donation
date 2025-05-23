<?php

// set http header
require '../../../core/header.php';
// use needed function
require '../../../core/functions.php';
// use needed models
require '../../../models/developer/testimonials/Testimonials.php';
require './function.php';


$conn = null;
$conn = checkDbConnection();


$testimonials = new Testimonials($conn);

$body = file_get_contents('php://input');
$data = json_decode($body, true);

if (isset($_SERVER['HTTP_AUTHORIZATION'])) {

    checkPayload($data);

    $testimonials->search = $data['searchValue'];

    if ($data['isFilter']) {
        $testimonials->testimonials_is_active = $data['isActive'];
        http_response_code(200);

        if ($testimonials->search != '') {
            $query = checkFilterSearch($testimonials);
            getQueriedData($query);
        }
        $query = checkFilter($testimonials);
        getQueriedData($query);
    }

    $query = checkSearch($testimonials);
    http_response_code(200);
    getQueriedData($query);
}

checkEndpoint();

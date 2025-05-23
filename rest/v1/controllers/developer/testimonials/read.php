<?php

// check database connection
$conn = null;
$conn = checkDbConnection();

// make instance of classes or use the model
$testimonials = new Testimonials($conn);

if (array_key_exists("testimonialsid", $_GET)) {
    $testimonialsid->testimonials_id = $_GET['testimonialsid'];
    checkId($testimonials->testimonials_aid);
    $query = checkReadById($testimonials);
    http_response_code(200);
    getQueriedData($query);
}

if (empty($_GET)) {
    $query = checkReadAll($testimonials);
    http_response_code(200);
    getQueriedData($query);
}

checkEndpoint();

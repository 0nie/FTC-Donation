<?php
// set http header
require '../../../core/header.php';
// use needed function
require '../../../core/functions.php';
// use needed models
require '../../../models/developer/testimonials/Testimonials.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// store model in variable
$testimonials = new Testimonials($conn);
// get payload
$body = file_get_contents("php://input");
$data = json_decode($body, true);

// VALIDATE API KEY
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {

    if (array_key_exists('testimonialsid', $_GET)) {
        //CHECK DATA
        checkPayload($data);
        $testimonials->testimonials_aid = $_GET['testimonialsid'];
        $testimonials->testimonials_is_active = trim($data['isActive']);
        $testimonials->testimonials_updated = date('Y-m-d H:i:s');

        checkId($testimonials->testimonials_aid);
        $query = checkActive($testimonials);
        returnSuccess($testimonials, 'testimonials active', $query);
    }

    // 404 if endpoint not available
    checkEndpoint();
} // ✅ <-- This was missing

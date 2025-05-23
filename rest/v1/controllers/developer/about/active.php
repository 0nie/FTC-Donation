<?php
// set http header
require '../../../core/header.php';
// use needed function
require '../../../core/functions.php';
// use needed models
require '../../../models/developer/about/About.php';
require './function.php';

// check database connection
$conn = null;
$conn = checkDbConnection();
// store model in variable
$about = new About($conn);
// get payload
$body = file_get_contents("php://input");
$data = json_decode($body, true);

// VALIDATE API KEY
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {

    if (array_key_exists('aboutid', $_GET)) {
        //CHECK DATA
        checkPayload($data);
        $about->about_aid = $_GET['aboutid'];
        $about->about_is_active = trim($data['isActive']);
        $about->about_updated = date('Y-m-d H:i:s');

        checkId($about->about_aid);
        $query = checkActive($about);
        returnSuccess($about, 'about active', $query);
    }

    // 404 if endpoint not available
    checkEndpoint();
} // ✅ <-- This was missing

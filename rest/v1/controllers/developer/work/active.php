<?php
// set http header
require '../../../core/header.php';
// use needed function
require '../../../core/functions.php';
// use needed models
require '../../../models/developer/work/Work.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// store model in variable
$work = new Work($conn);
// get payload
$body = file_get_contents("php://input");
$data = json_decode($body, true);

// VALIDATE API KEY
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {

    if (array_key_exists('workid', $_GET)) {
        //CHECK DATA
        checkPayload($data);
        $work->work_aid = $_GET['workid'];
        $work->work_is_active = trim($data['isActive']);
        $work->work_updated = date('Y-m-d H:i:s');

        checkId($work->work_aid);
        $query = checkActive($work);
        returnSuccess($work, 'work active', $query);
    }

    // 404 if endpoint not available
    checkEndpoint();
} // ✅ <-- This was missing

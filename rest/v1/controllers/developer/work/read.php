<?php

// check database connection
$conn = null;
$conn = checkDbConnection();

// make instance of classes or use the model
$work = new Work($conn);

if (array_key_exists("workid", $_GET)) {
    $workid->work_id = $_GET['workid'];
    checkId($work->work_aid);
    $query = checkReadById($work);
    http_response_code(200);
    getQueriedData($query);
}

if (empty($_GET)) {
    $query = checkReadAll($work);
    http_response_code(200);
    getQueriedData($query);
}

checkEndpoint();

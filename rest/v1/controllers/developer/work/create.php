<?php

$connection = null;
$conn = checkDbConnection(); // Check DB connection

// Create instance of the WorkList model
$work = new Work($conn);

// GET method should not be used here
if (array_key_exists("workid", $_GET)) {
    checkEndpoint(); // Deny access if 'workid' is passed via GET
}

// Check if payload has value
checkPayload($data);

// Assign and validate input data
$work->work_title = checkIndex($data, 'work_title');
$work->work_description = checkIndex($data, 'work_description');

// Set timestamps and status
$work->work_is_active = 1;
$work->work_created = date("Y-m-d H:i:s");
$work->work_updated = date("Y-m-d H:i:s");

isTitleExist($work, $work->work_title);


// Call create function
$query = checkCreate($work);
returnSuccess($work, 'work create', $query);

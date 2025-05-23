<?php

$connection = null;
$conn = checkDbConnection(); // Check DB connection

// Create instance of the AboutList model
$about = new About($conn);

// GET method should not be used here
if (array_key_exists("aboutid", $_GET)) {
    checkEndpoint(); // Deny access if 'aboutid' is passed via GET
}

// Check if payload has value
checkPayload($data);

// Assign and validate input data
$about->about_title = checkIndex($data, 'about_title');
$about->about_description = checkIndex($data, 'about_description');

// Set timestamps and status
$about->about_is_active = 1;
$about->about_created = date("Y-m-d H:i:s");
$about->about_updated = date("Y-m-d H:i:s");

isTitleExist($about, $about->about_title);


// Call create function
$query = checkCreate($about);
returnSuccess($about, 'about create', $query);

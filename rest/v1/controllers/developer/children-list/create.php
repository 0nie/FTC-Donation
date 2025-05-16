<?php

$connection = null;
$conn = checkDbConnection(); // Check DB connection

// Create instance of the ChildrenList model
$children = new ChildrenList($conn);

// GET method should not be used here
if (array_key_exists("childrenid", $_GET)) {
    checkEndpoint(); // Deny access if 'childrenid' is passed via GET
}

// Check if payload has value
checkPayload($data);

// Assign and validate input data
$children->children_list_first_name = checkIndex($data, 'children_list_first_name');
$children->children_list_last_name = checkIndex($data, 'children_list_last_name');
$children->children_list_birthdate = checkIndex($data, 'children_list_birthdate');
$children->children_list_donation = checkIndex($data, 'children_list_donation');
$children->children_list_story = $data['children_list_story'];

// Auto-calculate age from birthdate
$birthdate = new DateTime($children->children_list_birthdate);
$today = new DateTime();
$children->children_list_age = $today->diff($birthdate)->y;

// Set timestamps and status
$children->children_list_is_active = 1;
$children->children_list_created = date("Y-m-d H:i:s");
$children->children_list_updated = date("Y-m-d H:i:s");

// Call create function
$query = checkCreate($children);
returnSuccess($children, 'children create', $query);

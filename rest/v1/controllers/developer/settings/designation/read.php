<?php 

// check database connection
$conn = null;
$conn = checkDbConnection();

// make instance of classes or use the model
$designation = new Designation($conn);

if(array_key_exists("designationid", $_GET)){
    $designationid->designation_id = $_GET['designationid'];
    checkId($designation->designation_aid);
    $query = checkReadById($designation);
    http_response_code(200);
    getQueriedData($query);
}

if (empty($_GET)){
    $query = checkReadAll($designation);
    http_response_code(200);
    getQueriedData($query);
}

checkEndpoint();
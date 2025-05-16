<?php

// check database connection
$conn = null;
$conn = checkDbConnection();

// make instance of classes or use the model
$donor = new DonorList($conn);

if (array_key_exists("donorid", $_GET)) {
    $donorid->donor_id = $_GET['donorid'];
    checkId($donor->donor_list_aid);
    $query = checkReadById($donor);
    http_response_code(200);
    getQueriedData($query);
}

if (empty($_GET)) {
    $query = checkReadAll($donor);
    http_response_code(200);
    getQueriedData($query);
}

checkEndpoint();

<?php 

// check database connection
$conn = null;
$conn = checkDbConnection();

// make instance of classes or use the model
$category = new Category($conn);

if(array_key_exists("categoryid", $_GET)){
    $categoryid->category_id = $_GET['categoryid'];
    checkId($category->category_aid);
    $query = checkReadById($category);
    http_response_code(200);
    getQueriedData($query);
}

if (empty($_GET)){
    $query = checkReadAll($category);
    http_response_code(200);
    getQueriedData($query);
}

checkEndpoint();
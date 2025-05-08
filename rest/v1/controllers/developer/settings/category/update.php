<?php

//CHECK DATABASE CONNECTION
$conn = null;
$conn = checkDbConnection();
// USE MODELS
$category = new Category($conn);

if (array_key_exists('categoryid', $_GET)) {
    //CHECK DATA
    checkPayload($data);
    //CHECKING DATA
    $category->category_aid = $_GET['categoryid'];
    $category->category_name = checkIndex($data, 'category_name');
    $category->category_description = checkIndex($data, 'category_description');
    $category->category_updated = date('Y-m-d H:i:s');

    //VALIDATION

    checkId($category->category_aid);

    $query = checkUpdate($category);
    returnSuccess($category, 'category update', $query);
}

// exist if not available
checkEndpoint();

<?php 

$conn = null;
$conn = checkDbConnection();

$category = new Category($conn);

if(array_key_exists('categoryid', $_GET)){

    $category->category_aid = $_GET['categoryid'];
    checkId($category->category_aid);

    isAssociated($category);

    $query = checkDelete($category);
    returnSuccess($category, 'category delete', $query);
}

checkEndpoint();
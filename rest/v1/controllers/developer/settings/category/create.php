<?php

$connection = null;
$conn = checkDbConnection();
//MAKE INSTANCE OF A CLASS
$category = new Category($conn);

//GET METHOD REQUEST SHOULD NOT BE PRESENT IN THIS REQUEST
if (array_key_exists("categoryid", $_GET)) {
    checkEndpoint();
}

// CHECK IF DATA HAS VALUE
checkPayload($data);
//GET DATA
$category->category_name = checkIndex($data, 'category_name');
$category->category_description = checkIndex($data, 'category_description');
$category->category_is_active = 1;
$category->category_created = date("Y-m-d H:i:s");
$category->category_updated = date("Y-m-d H:i:s");

//VALIDATION
isNameExist($category, $category->category_name);


$query = checkCreate($category);
returnSuccess($category, 'category create', $query);

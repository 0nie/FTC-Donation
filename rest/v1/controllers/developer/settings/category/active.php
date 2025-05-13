<?php
// set http header
require '../../../../core/header.php';
// use needed function
require '../../../../core/functions.php';
// use model
require '../../../../models/developer/settings/category/Category.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// store model in variable
$category = new Category($conn);
// get payload
$body = file_get_contents("php://input");
$data = json_decode($body, true);
// VALIDATE API KEY
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {

    if (array_key_exists('categoryid', $_GET)) {
        //CHECK DATA
        checkPayload($data);
        $category->category_aid = $_GET['categoryid'];
        $category->category_is_active = trim($data['isActive']);
        $category->category_updated = date('Y-m-d H:i:s');

        checkId($category->category_aid);
        $query = checkActive($category);
        returnSuccess($category, 'category active', $query);
    }
    // 404 if endpoint available
    checkEndpoint();
}

<?php
// set http header
require '../../../core/header.php';
// use needed function
require '../../../core/functions.php';
// use model
require '../../../models/developer/children-list/ChildrenList.php';

// check database connection
$conn = null;
$conn = checkDbConnection();
// store model in variable
$children = new ChildrenList($conn);
// get payload
$body = file_get_contents("php://input");
$data = json_decode($body, true);
// VALIDATE API KEY
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {

    if (array_key_exists('childrenid', $_GET)) {
        //CHECK DATA
        checkPayload($data);
        $children->children_list_aid = $_GET['childrenid'];
        $children->children_list_is_active = trim($data['isActive']);
        $children->children_list_updated = date('Y-m-d H:i:s');

        checkId($children->children_list_aid);
        $query = checkActive($children);
        returnSuccess($children, 'children active', $query);
    }
    // 404 if endpoint available
    checkEndpoint();
}

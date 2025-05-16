<?php

// check database connection
$conn = null;
$conn = checkDbConnection();

// make instance of classes or use the model
$children = new ChildrenList($conn);

if (array_key_exists("childrenid", $_GET)) {
    $childrenid->children_id = $_GET['childrenid'];
    checkId($children->children_list_aid);
    $query = checkReadById($children);
    http_response_code(200);
    getQueriedData($query);
}

if (empty($_GET)) {
    $query = checkReadAll($children);
    http_response_code(200);
    getQueriedData($query);
}

checkEndpoint();

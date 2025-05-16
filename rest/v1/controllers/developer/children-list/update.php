<?php

//CHECK DATABASE CONNECTION
$conn = null;
$conn = checkDbConnection();
// USE MODELS
$children = new ChildrenList($conn);

if (array_key_exists('childrenid', $_GET)) {
    //CHECK DATA
    checkPayload($data);
    //CHECKING DATA
    $children->children_list_aid = $_GET['childrenid'];
    $children->children_list_last_name = checkIndex($data, 'children_list_last_name');
    $children->children_list_first_name = checkIndex($data, 'children_list_first_name');
    $children->children_list_birthdate = $data['children_list_birthdate'];

    $children->children_list_donation = checkIndex($data, 'children_list_donation');
    $children->children_list_story = $data['children_list_story'];
    $children->children_list_updated = date('Y-m-d H:i:s');

    //VALIDATION
    checkId($children->children_list_aid);





    $query = checkUpdate($children);
    returnSuccess($children, 'children update', $query);
}

// exist if not available
checkEndpoint();

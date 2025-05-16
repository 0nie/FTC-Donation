<?php 

$conn = null;
$conn = checkDbConnection();

$children = new ChildrenList($conn);

if(array_key_exists('childrenid', $_GET)){

    $children->children_list_aid = $_GET['childrenid'];
    checkId($children->children_list_aid);


    $query = checkDelete($children);
    returnSuccess($children, 'children delete', $query);
}

checkEndpoint();
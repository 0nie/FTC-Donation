<?php 

$conn = null;
$conn = checkDbConnection();

$work = new Work($conn);

if(array_key_exists('workid', $_GET)){

    $work->work_aid = $_GET['workid'];
    checkId($work->work_aid);


    $query = checkDelete($work);
    returnSuccess($work, 'work delete', $query);
}

checkEndpoint();
<?php

//CHECK DATABASE CONNECTION

$conn = null;
$conn = checkDbConnection();
//USE MODELS
$work = new Work($conn);

if (array_key_exists('workid', $_GET)) {
    // check data
    checkPayload($data);
    // CHECKING DATA
    $work->work_aid = $_GET['workid'];
    $work->work_title = checkIndex($data, 'work_title');
    $work->work_description = checkIndex($data, 'work_description');
    $work->work_is_active = 1;
    $work->work_created = date("Y-m-d H:i:s");
    $work->work_updated = date("Y-m-d H:i:s");
    $work_title_old = checkIndex($data, 'work_title_old');


    // VALIDATION
    checkId($work->work_aid);

    compareTitle($work, $work->work_title, $work_title_old);





    $query = checkUpdate($work);
    returnSuccess($work, 'portfolio list update', $query);
}

// exit if not available

checkEndPoint();

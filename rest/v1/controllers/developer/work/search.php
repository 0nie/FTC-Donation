<?php

// set http header
require '../../../core/header.php';
// use needed function
require '../../../core/functions.php';
// use needed models
require '../../../models/developer/work/Work.php';
require './function.php';


$conn = null;
$conn = checkDbConnection();


$work = new Work($conn);

$body = file_get_contents('php://input');
$data = json_decode($body, true);

if (isset($_SERVER['HTTP_AUTHORIZATION'])) {

    checkPayload($data);

    $work->search = $data['searchValue'];

    if ($data['isFilter']) {
        $work->work_is_active = $data['isActive'];
        http_response_code(200);

        if ($work->search != '') {
            $query = checkFilterSearch($work);
            getQueriedData($query);
        }
        $query = checkFilter($work);
        getQueriedData($query);
    }

    $query = checkSearch($work);
    http_response_code(200);
    getQueriedData($query);
}

checkEndpoint();

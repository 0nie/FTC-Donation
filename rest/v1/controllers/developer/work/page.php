<?php
// set http header
require '../../../core/header.php';
// use needed function
require '../../../core/functions.php';
// use needed models
require '../../../models/developer/work/Work.php';


$conn = null;
$conn = checkDbConnection();


$work = new Work($conn);

if (isset($_SERVER['HTTP_AUTHORIZATION'])) {

    if (array_key_exists('start', $_GET)) {
        $work->start = $_GET['start'];
        $work->total = 3;

        $query = checkReadLimit($work);
        $total_result = checkReadAll($work);
        http_response_code(200);

        checkReadQuery(
            $query,
            $total_result,
            $work->total,
            $work->start
        );
    }

    checkEndpoint();
}

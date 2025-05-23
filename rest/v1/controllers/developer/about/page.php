<?php
// set http header
require '../../../core/header.php';
// use needed function
require '../../../core/functions.php';
// use needed models
require '../../../models/developer/about/About.php';


$conn = null;
$conn = checkDbConnection();


$about = new About($conn);

if (isset($_SERVER['HTTP_AUTHORIZATION'])) {

    if (array_key_exists('start', $_GET)) {
        $about->start = $_GET['start'];
        $about->total = 3;

        $query = checkReadLimit($about);
        $total_result = checkReadAll($about);
        http_response_code(200);

        checkReadQuery(
            $query,
            $total_result,
            $about->total,
            $about->start
        );
    }

    checkEndpoint();
}

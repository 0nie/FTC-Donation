<?php
// set http header
require '../../../core/header.php';
// use needed function
require '../../../core/functions.php';
// use needed models
require '../../../models/developer/testimonials/Testimonials.php';


$conn = null;
$conn = checkDbConnection();


$testimonials = new Testimonials($conn);

if (isset($_SERVER['HTTP_AUTHORIZATION'])) {

    if (array_key_exists('start', $_GET)) {
        $testimonials->start = $_GET['start'];
        $testimonials->total = 3;

        $query = checkReadLimit($testimonials);
        $total_result = checkReadAll($testimonials);
        http_response_code(200);

        checkReadQuery(
            $query,
            $total_result,
            $testimonials->total,
            $testimonials->start
        );
    }

    checkEndpoint();
}

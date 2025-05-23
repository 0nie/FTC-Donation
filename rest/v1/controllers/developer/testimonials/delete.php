<?php 

$conn = null;
$conn = checkDbConnection();

$testimonials = new Testimonials($conn);

if(array_key_exists('testimonialsid', $_GET)){

    $testimonials->testimonials_aid = $_GET['testimonialsid'];
    checkId($testimonials->testimonials_aid);


    $query = checkDelete($testimonials);
    returnSuccess($testimonials, 'testimonials delete', $query);
}

checkEndpoint();
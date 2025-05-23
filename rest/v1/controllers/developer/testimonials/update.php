<?php

//CHECK DATABASE CONNECTION

$conn = null;
$conn = checkDbConnection();
//USE MODELS
$testimonials = new Testimonials($conn);

if (array_key_exists('testimonialsid', $_GET)) {
    // check data
    checkPayload($data);
    // CHECKING DATA
    $testimonials->testimonials_aid = $_GET['testimonialsid'];
    $testimonials->testimonials_first_name = checkIndex($data, 'testimonials_first_name');
    $testimonials->testimonials_last_name = checkIndex($data, 'testimonials_last_name');

    isFullNameExist($testimonials, $testimonials->testimonials_first_name, $testimonials->testimonials_last_name);

    $testimonials->testimonials_email = checkIndex($data, 'testimonials_email');
    $testimonials->testimonials_description = checkIndex($data, 'testimonials_description');
    $testimonials->testimonials_is_active = 1;
    $testimonials->testimonials_created = date("Y-m-d H:i:s");
    $testimonials->testimonials_updated = date("Y-m-d H:i:s");

    $testimonials_email_old = checkIndex($data, 'testimonials_email_old');



    // VALIDATION
    checkId($testimonials->testimonials_aid);


    compareEmail($testimonials, $testimonials->testimonials_email, $testimonials_email_old);






    $query = checkUpdate($testimonials);
    returnSuccess($testimonials, 'portfolio list update', $query);
}

// exit if not available

checkEndPoint();

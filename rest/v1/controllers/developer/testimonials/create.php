<?php

$connection = null;
$conn = checkDbConnection(); // Check DB connection

// Create instance of the TestimonialsList model
$testimonials = new Testimonials($conn);

// GET method should not be used here
if (array_key_exists("testimonialsid", $_GET)) {
    checkEndpoint(); // Deny access if 'testimonialsid' is passed via GET
}

// Check if payload has value
checkPayload($data);

// Assign and validate input data
$testimonials->testimonials_first_name = checkIndex($data, 'testimonials_first_name');
$testimonials->testimonials_last_name = checkIndex($data, 'testimonials_last_name');

isFullNameExist($testimonials, $testimonials->testimonials_first_name, $testimonials->testimonials_last_name);

$testimonials->testimonials_email = checkIndex($data, 'testimonials_email');
$testimonials->testimonials_description = checkIndex($data, 'testimonials_description');

isEmailExist($testimonials, $testimonials->testimonials_email);


// Set timestamps and status
$testimonials->testimonials_is_active = 1;
$testimonials->testimonials_created = date("Y-m-d H:i:s");
$testimonials->testimonials_updated = date("Y-m-d H:i:s");




// Call create function
$query = checkCreate($testimonials);
returnSuccess($testimonials, 'testimonials create', $query);

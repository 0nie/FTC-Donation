<?php

$conn = null;
$conn = checkDBConnection();
//make instance of a class
$designation = new Designation($conn);

//get method request should not be present in this request
if (array_key_exists("designationid", $_GET)) {
    checkEndPoint();
}
//check if data has value
checkPayload($data);

//get data
$designation->designation_name = checkIndex($data, 'designation_name');
// $designation->designation_category = checkIndex($data, 'designation_category');
$designation->designation_is_active = 1;
$designation->designation_created = date("Y-m-d H:i:s");
$designation->designation_updated = date("Y-m-d H:i:s");

$query = checkCreate($designation);
returnSuccess($designation, 'designation create', $query);

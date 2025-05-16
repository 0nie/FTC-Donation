<?php

$connection = null;
$conn = checkDbConnection();
//MAKE INSTANCE OF A CLASS
$donor = new DonorList($conn);

//GET METHOD REQUEST SHOULD NOT BE PRESENT IN THIS REQUEST
if (array_key_exists("donorid", $_GET)) {
    checkEndpoint();
}

// CHECK IF DATA HAS VALUE
checkPayload($data);
//GET DATA
$donor->donor_list_first_name = checkIndex($data, 'donor_list_first_name');
$donor->donor_list_last_name = checkIndex($data, 'donor_list_last_name');
$donor->donor_list_email = checkIndex($data, 'donor_list_email');
$donor->donor_list_is_active = 1;
$donor->donor_list_created = date("Y-m-d H:i:s");
$donor->donor_list_updated = date("Y-m-d H:i:s");

isEmailExist($donor, $donor->donor_list_email);


$query = checkCreate($donor);
returnSuccess($donor, 'donor create', $query);

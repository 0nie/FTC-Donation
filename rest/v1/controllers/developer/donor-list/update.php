<?php

//CHECK DATABASE CONNECTION
$conn = null;
$conn = checkDbConnection();
// USE MODELS
$donor = new DonorList($conn);

if (array_key_exists('donorid', $_GET)) {
    //CHECK DATA
    checkPayload($data);
    //CHECKING DATA
    $donor->donor_list_aid = $_GET['donorid'];
    $donor->donor_list_last_name = checkIndex($data, 'donor_list_last_name');
    $donor->donor_list_first_name = checkIndex($data, 'donor_list_first_name');
    $donor->donor_list_email = checkIndex($data, 'donor_list_email');
    $donor->donor_list_contact_number = $data['donor_list_contact_number'];
    $donor->donor_list_address = $data['donor_list_address'];
    $donor->donor_list_city = $data['donor_list_city'];
    $donor->donor_list_state_province = $data['donor_list_state_province'];
    $donor->donor_list_country = $data['donor_list_country'];
    $donor->donor_list_zip = $data['donor_list_zip'];
    $donor->donor_list_updated = date('Y-m-d H:i:s');

    //VALIDATION
    checkId($donor->donor_list_aid);





    $query = checkUpdate($donor);
    returnSuccess($donor, 'donor update', $query);
}

// exist if not available
checkEndpoint();

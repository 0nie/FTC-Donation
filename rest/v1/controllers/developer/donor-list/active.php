<?php
// set http header
require '../../../core/header.php';
// use needed function
require '../../../core/functions.php';
// use model
require '../../../models/developer/donor-list/DonorList.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// store model in variable
$donor = new DonorList($conn);
// get payload
$body = file_get_contents("php://input");
$data = json_decode($body, true);
// VALIDATE API KEY
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {

    if (array_key_exists('donorid', $_GET)) {
        //CHECK DATA
        checkPayload($data);
        $donor->donor_list_aid = $_GET['donorid'];
        $donor->donor_list_is_active = trim($data['isActive']);
        $donor->donor_list_updated = date('Y-m-d H:i:s');

        checkId($donor->donor_list_aid);
        $query = checkActive($donor);
        returnSuccess($donor, 'donor active', $query);
    }
    // 404 if endpoint available
    checkEndpoint();
}

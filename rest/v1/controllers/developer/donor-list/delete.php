<?php 

$conn = null;
$conn = checkDbConnection();

$donor = new DonorList($conn);

if(array_key_exists('donorid', $_GET)){

    $donor->donor_list_aid = $_GET['donorid'];
    checkId($donor->donor_list_aid);


    $query = checkDelete($donor);
    returnSuccess($donor, 'donor delete', $query);
}

checkEndpoint();
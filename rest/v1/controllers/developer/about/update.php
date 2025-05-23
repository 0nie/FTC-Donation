<?php

//CHECK DATABASE CONNECTION

$conn = null;
$conn = checkDbConnection();
//USE MODELS
$about = new About($conn);

if (array_key_exists('aboutid', $_GET)) {
    // check data
    checkPayload($data);
    // CHECKING DATA
    $about->about_aid = $_GET['aboutid'];
    $about->about_title = checkIndex($data, 'about_title');
    $about->about_description = checkIndex($data, 'about_description');
    $about->about_is_active = 1;
    $about->about_created = date("Y-m-d H:i:s");
    $about->about_updated = date("Y-m-d H:i:s");
    $about_title_old = checkIndex($data, 'about_title_old');


    // VALIDATION
    checkId($about->about_aid);

    compareTitle($about, $about->about_title, $about_title_old);





    $query = checkUpdate($about);
    returnSuccess($about, 'portfolio list update', $query);
}

// exit if not available

checkEndPoint();

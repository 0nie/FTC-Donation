<?php

//CHECK DATABASE CONNECTION
$conn = null;
$conn = checkDbConnection();
// USE MODELS
$notifications = new Notifications($conn);

if (array_key_exists('notificationsid', $_GET)) {
    //CHECK DATA
    checkPayload($data);
    //CHECKING DATA
    $notifications->notifications_aid = $_GET['notificationsid'];
    $notifications->notifications_name = checkIndex($data, 'notifications_name');
    $notifications->notifications_email = checkIndex($data, 'notifications_email');
    $notifications->notifications_purpose = checkIndex($data, 'notifications_purpose');
    $notifications->notifications_updated = date('Y-m-d H:i:s');

    $notifications_name_old = $data['notifications_name_old'];


    //VALIDATION

    checkId($notifications->notifications_aid);

    compareName(
        $notifications, // PASS THE MODEL PARAMETER 1
        $notifications->notifications_name, // PASS THE NAME PARAMETER 2
        $notifications_name_old // PASS THE OLD NAME || PARAMETER 3
    );

    $query = checkUpdate($notifications);
    returnSuccess($notifications, 'notifications update', $query);
}

// exist if not available
checkEndpoint();

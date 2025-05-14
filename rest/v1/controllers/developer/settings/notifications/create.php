<?php

$connection = null;
$conn = checkDbConnection();
//MAKE INSTANCE OF A CLASS
$notifications = new Notifications($conn);

//GET METHOD REQUEST SHOULD NOT BE PRESENT IN THIS REQUEST
if (array_key_exists("notificationsid", $_GET)) {
    checkEndpoint();
}

// CHECK IF DATA HAS VALUE
checkPayload($data);
//GET DATA
$notifications->notifications_name = checkIndex($data, 'notifications_name');
$notifications->notifications_email = checkIndex($data, 'notifications_email');
$notifications->notifications_purpose = checkIndex($data, 'notifications_purpose');
$notifications->notifications_is_active = 1;
$notifications->notifications_created = date("Y-m-d H:i:s");
$notifications->notifications_updated = date("Y-m-d H:i:s");

//VALIDATION
isNameExist($notifications, $notifications->notifications_name);

$query = checkCreate($notifications);
returnSuccess($notifications, 'notifications create', $query);

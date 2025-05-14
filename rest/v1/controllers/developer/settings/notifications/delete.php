<?php

$conn = null;
$conn = checkDbConnection();

$notifications = new Notifications($conn);

if (array_key_exists('notificationsid', $_GET)) {

    $notifications->notifications_aid = $_GET['notificationsid'];
    checkId($notifications->notifications_aid);
    $query = checkDelete($notifications);
    returnSuccess($notifications, 'notifications delete', $query);
}

checkEndpoint();

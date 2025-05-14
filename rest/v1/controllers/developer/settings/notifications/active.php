<?php
// set http header
require '../../../../core/header.php';
// use needed function
require '../../../../core/functions.php';
// use model
require '../../../../models/developer/settings/notifications/Notifications.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// store model in variable
$notifications = new Notifications($conn);
// get payload
$body = file_get_contents("php://input");
$data = json_decode($body, true);
// VALIDATE API KEY
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {

    if (array_key_exists('notificationsid', $_GET)) {
        //CHECK DATA
        checkPayload($data);
        $notifications->notifications_aid = $_GET['notificationsid'];
        $notifications->notifications_is_active = trim($data['isActive']);
        $notifications->notifications_updated = date('Y-m-d H:i:s');

        checkId($notifications->notifications_aid);
        $query = checkActive($notifications);
        returnSuccess($notifications, 'notifications active', $query);
    }
    // 404 if endpoint available
    checkEndpoint();
}

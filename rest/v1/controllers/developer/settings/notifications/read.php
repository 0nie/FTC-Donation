<?php 

// check database connection
$conn = null;
$conn = checkDbConnection();

// make instance of classes or use the model
$notifications = new Notifications($conn);

if(array_key_exists("notificationsid", $_GET)){
    $notificationsid->notifications_id = $_GET['notificationsid'];
    checkId($notifications->notifications_aid);
    $query = checkReadById($notifications);
    http_response_code(200);
    getQueriedData($query);
}

if (empty($_GET)){
    $query = checkReadAll($notifications);
    http_response_code(200);
    getQueriedData($query);
}

checkEndpoint();
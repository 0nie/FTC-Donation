<?php

require "Database.php";
require "Response.php";

function checkDbConnection()
{
    try {
        $conn = Database::connectDb();
        return $conn;
    } catch (PDOException $ex) {
        $response = new Response();
        $error = [];
        $response->setSuccess(false);
        $error['type'] = 'invalid_request_error';
        $error['success'] = false;
        $error['error'] = 'Database Connection Failed.';
        $response->setData($error);
        $response->send();
        exit;
    }
}

function checkQuery($query, $msg)
{
    if (!$query) {
        $response = new Response();
        $error = [];
        $response->setSuccess(false);
        $error['count'] = 0;
        $error['type'] = 'invalid_request_error';
        $error['success'] = false;
        $error['error'] = $msg;
        $response->setData($error);
        $response->send();
        exit;
    }
}

function invalidInput()
{
    $response = new Response();
    $error = [];
    $response->setSuccess(false);
    $error['count'] = 0;
    $error['success'] = false;
    $error['error'] = "Invalid Input.";
    $response->setData($error);
    $response->send();
    exit;
}

function checkPayload($jsonData)
{
    if (empty($jsonData) || $jsonData === null) invalidInput();
}

function checkIndex($jsonData, $index)
{
    if (!isset($jsonData[$index]) || $jsonData[$index] === '') {
        invalidInput();
    }
    return trim($jsonData[$index]);
}

function checkId($id)
{
    if ($id == '' || !is_numeric($id)) {
        $response = new Response();
        $error = [];
        $response->setSuccess(false);
        $error['code'] = "400";
        $error['success'] = false;
        $error['error'] = "ID cannot be blank or must be numeric.";
        $response->setData($error);
        $response->send();
        exit;
    }
}

function checkKeyword($keyword)
{
    if ($keyword == '') {
        $response = new Response();
        $error = [];
        $response->setSuccess(false);
        $error['code'] = "400";
        $error['success'] = false;
        $error['error'] = "Search keyword cannot be blank.";
        $response->setData($error);
        $response->send();
        exit;
    }
}

function checkLimitId($start, $total)
{
    if (
        $start == '' || !is_numeric($start) ||
        $total == '' || !is_numeric($total)
    ) {
        $response = new Response();
        $error = [];
        $response->setSuccess(false);
        $error['code'] = "400";
        $error['success'] = false;
        $error['error'] = "Limit ID cannot be blank or must be numeric.";
        $response->setData($error);
        $response->send();
        exit;
    }
}

function getResultData($query)
{
    return $query->fetchAll();
}

function checkReadQuery($query, $total_result, $object_total, $object_start)
{
    $response = new Response();
    $returnData = [];

    $returnData['data'] = getResultData($query);
    $returnData['count'] = $query->rowCount();
    $returnData['total'] = $total_result->rowCount();
    $returnData['per_page'] = $object_total;
    $returnData['page'] = (int)$object_start;
    $returnData['total_pages'] = ceil($total_result->rowCount() / $object_total);
    $returnData['success'] = true;
    $response->setData($returnData);
    $response->send();
    exit;
}

function checkCreate($object)
{
    $query = $object->create();
    checkQuery($query, "There's a problem with you request. (core create)");
    return $query;
}

function checkReadAll($object)
{
    $query = $object->readAll();
    checkQuery($query, "There's a problem with you request. (core readAll)");
    return $query;
}

function checkReadLimit($object)
{
    $query = $object->readLimit();
    checkQuery($query, "There's a problem with you request. (core readLimit)");
    return $query;
}

function checkSearch($object)
{
    $query = $object->search();
    checkQuery($query, "There's a problem with you request. (core search)");
    return $query;
}

function checkReadById($object)
{
    $query = $object->readById();
    checkQuery($query, "There's a problem with you request. (core readById)");
    return $query;
}

function checkReadKey($object)
{
    $query = $object->readKey();
    checkQuery($query, "There's a problem with you request. (core readKey)");
    return $query;
}

function checkUpdate($object)
{
    $query = $object->update();
    checkQuery($query, "There's a problem with you request. (core update)");
    return $query;
}

function checkDelete($object)
{
    $query = $object->delete();
    checkQuery($query, "There's a problem with you request. (core delete)");
    return $query;
}

function checkActive($object)
{
    $query = $object->active();
    checkQuery($query, "There's a problem with you request. (core active)");
    return $query;
}

function returnSuccess($object, $name, $query, $data = '')
{
    $response = new Response();
    $returnData = [];
    $returnData['data'] = [$data];
    $returnData['count'] = $query->rowCount();
    $returnData["{$name} ID"] = $object->lastInsertedId;
    $returnData['success'] = true;
    $response->setData($returnData);
    $response->send();
    exit;
}

function returnError($msg)
{
    $response = new Response();
    $response->setSuccess(false);
    $error = [];
    $error['count'] = 0;
    $error['success'] = true;
    $error['error'] = $msg;
    $response->setData($error);
    $response->send();
    exit;
}

function getQueriedData($query)
{
    $response = new Response();
    $returnData = [];
    $returnData['data'] = getResultData($query);
    $returnData['count'] = $query->rowCount();
    $returnData['success'] = true;
    $response->setData($returnData);
    $response->send();
    exit;
}

function sendResponse($result)
{
    $response = new Response();
    $response->setSuccess(true);
    $response->setStatusCode(200);
    $response->setData($result);
    $response->send();
}

function checkEndpoint()
{
    $response = new Response();
    $error = [];
    $response->setSuccess(false);
    $error['code'] = '404';
    $error['error'] = 'Method not found.';
    $error['success'] = false;
    $response->setData($error);
    $response->send();
    exit;
}

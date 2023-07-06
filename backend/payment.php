<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
$data = json_decode(file_get_contents('php://input'), true);
include_once("db_connect.php");

$cus_id = $data['cus_id'];
$order_id = $data['$order_id'];





header('Content-Type: application/json');
echo json_encode($orders);
?>
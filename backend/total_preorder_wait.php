<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

include_once("db_connect.php");

$sql = "SELECT * FROM order_pre_tbl WHERE state_id = 2";

// Execute the query
$result = mysqli_query($conn, $sql);

// Fetch the products into an array
$pd_vl = array();
$row = mysqli_num_rows($result);

$pd_vl[] = $row;

// Return the pd_vl as JSON
header('Content-Type: application/json');
echo json_encode($pd_vl);
?>

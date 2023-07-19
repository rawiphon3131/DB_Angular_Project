<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");


include_once("db_connect.php");
$data = json_decode(file_get_contents('php://input'), true);
$prd_id = $data['prd_id'];


$sql = "UPDATE product_tbl SET state_id = 6 WHERE prd_id = '$prd_id'";
$query = mysqli_query($conn,$sql);
// Return the type_prd as JSON

?>
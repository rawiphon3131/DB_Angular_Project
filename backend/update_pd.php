<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
$data = json_decode(file_get_contents('php://input'), true);
include_once("db_connect.php");



$prd_id = $data['prd_id'];
$userId = $data['userId'];
$where_pick = $data['where_pick'];
$product_values = $data['product_values'];
$size_id = $data['size_id'];

$sql = "UPDATE product_tbl SET prd_value = prd_value+'$product_values' WHERE prd_id = '$prd_id' AND size_id = '$size_id'";
if ($conn->query($sql) === TRUE) {
        $response = "เพิ่มข้อมูลสำเร็จ";
} else {
        $response = "Error: " . $sql . "<br>" . $conn->error;
}


$conn->close();

// Send the response back to Angular
echo $response;

?>
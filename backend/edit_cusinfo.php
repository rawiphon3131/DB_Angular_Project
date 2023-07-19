<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

$data = json_decode(file_get_contents('php://input'), true);
include_once("db_connect.php");

$cus_id = $data[0]['cus_id'];
$cus_name_id = $data[0]['cus_name_id'];
$cus_name = $data[0]['cus_name'];
$cus_numtel = $data[0]['cus_numtel'];
$cus_address = $data[0]['cus_address'];

$response = array();

if (!empty($cus_name)) {
    $sql = "UPDATE customer_name_tbl SET cus_name = '$cus_name' WHERE cus_name_id = '$cus_name_id'";
    $query = mysqli_query($conn, $sql);
    if ($query) {
        $response['status'] = 'Data inserted successfully';
    }
}

if (!empty($cus_numtel)) {
    $sql = "UPDATE customer_name_tbl SET cus_numtel = '$cus_numtel' WHERE cus_name_id = '$cus_name_id'";
    $query = mysqli_query($conn, $sql);
    if ($query) {
        $response['status'] = 'Data inserted successfully';
    }
}

if (!empty($cus_address)) {
    $sql = "UPDATE customer_tbl SET cus_adddress = '$cus_address' WHERE cus_id = '$cus_id'";
    $query = mysqli_query($conn, $sql);
    if ($query) {
        $response['status'] = 'Data inserted successfully';
    }
}

// Default case
if (empty($response)) {
    $response['status'] = 'No data received';
}

echo json_encode($response);
?>

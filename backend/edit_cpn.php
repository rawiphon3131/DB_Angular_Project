<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

$data = json_decode(file_get_contents('php://input'), true);
include_once("db_connect.php");

$cpn_id = $data[0]['cpn_id'];
$cpn_edit_name = $data[0]['cpn_edit_name'];
$cpn_edit_numtel = $data[0]['cpn_edit_numtel'];
$cpn_edit_address = $data[0]['cpn_edit_address'];

$response = array();

if (!empty($cpn_edit_name)) {
    $sql = "UPDATE company_tbl SET cpn_name = '$cpn_edit_name' WHERE cpn_id = '$cpn_id'";
    $query = mysqli_query($conn, $sql);
    if ($query) {
        $response['status'] = 'Data inserted successfully';
    }
}

if (!empty($cpn_edit_numtel)) {
    $sql = "UPDATE company_tbl SET cpn_numtel = '$cpn_edit_numtel' WHERE cpn_id = '$cpn_id'";
    $query = mysqli_query($conn, $sql);
    if ($query) {
        $response['status'] = 'Data inserted successfully';
    }
}

if (!empty($cpn_edit_address)) {
    $sql = "UPDATE company_tbl SET cpn_address = '$cpn_edit_address' WHERE cpn_id = '$cpn_id'";
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

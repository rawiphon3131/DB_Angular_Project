<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

include_once("db_connect.php");

$data = json_decode(file_get_contents('php://input'), true);
$size_id = $data['size_id'];

$sql = "DELETE FROM size_tbl WHERE size_id = $size_id";
$query = mysqli_query($conn, $sql);

if ($query) {
  $response = array('COMPLEAT');
} else {
  $response = array('ERROR');
}

echo json_encode($response);
?>

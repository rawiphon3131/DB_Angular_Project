<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");


include_once("db_connect.php");
$data = json_decode(file_get_contents('php://input'), true);
$cpn_id = $data['cpn_id'];


$sql = "DELETE FROM company_tbl WHERE cpn_id ='$cpn_id'";
$query = mysqli_query($conn,$sql);
// Return the type_prd as JSON
$response = array('COMPLEAT');
echo json_encode($response);
?>
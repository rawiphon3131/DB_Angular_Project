<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");


include_once("db_connect.php");
$data = json_decode(file_get_contents('php://input'), true);
$size_id = $data['size_id'];
$size_edit = $data['size_edit'];

if($size_edit != ''){
    $sql = "UPDATE size_tbl SET size_name = '$size_edit' WHERE size_id ='$size_id'";
    $query = mysqli_query($conn,$sql);
    $response['status'] = 'Data inserted successfully';
}





echo json_encode($response);
?>
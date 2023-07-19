<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

include_once("db_connect.php");

$data = json_decode(file_get_contents('php://input'), true);

$size_name = $data['size_name_new'];

if (!empty($data)){
    
$sql = "INSERT INTO size_tbl(size_name) VALUES ('$size_name')";
$query = mysqli_query($conn,$sql);
}




$conn->close();
// Send the response back to Angular
$response =  json_encode('เสร็จละ');
echo json_encode($response);
?>

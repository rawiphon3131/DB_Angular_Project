<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

include_once("db_connect.php");

$data = json_decode(file_get_contents('php://input'), true);

$prd_id = $data['prd_id'];
$userId = $data['userId'];
$where_pick = $data['where_pick'];
$product_values = $data['product_values'];
$date=date("Y-m-d h:i:sa");


$sql = "INSERT INTO pickin_tbl (prd_id, user_id, prdin_mk, prdin_values, prdin_date) VALUES
('$prd_id', '$userId','$where_pick','$product_values','$date')";

if ($conn->query($sql) === TRUE) {
    $response = "SUCSS";
} else {
    $response = "Error: " . $conn->error;
}

$conn->close();

// Send the response back to Angular
echo json_encode($response);
?>

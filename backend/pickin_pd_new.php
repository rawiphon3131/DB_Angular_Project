<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

include_once("db_connect.php");

$data = json_decode(file_get_contents('php://input'), true);

$prd_id = $data['prd_id'];
$userId = $data['userId'];
$where_pick = $data['where'];
$product_values = $data['value'];
$date=$data['date'];
$price = $data['price'];
$price_sell = $data['price_sell'];


$sql = "INSERT INTO pickin_tbl (prd_id, user_id, prdin_mk, prdin_values, prdin_date) VALUES
('$prd_id', '$userId','$where_pick','$product_values','$date')";

if ($conn->query($sql) === TRUE) {
    $response = "SUCSS";
} else {
    $response = "Error: " . $conn->error;
}

$sql ="UPDATE product_tbl SET prd_value=prd_value+$product_values WHERE prd_id = $prd_id";
$query = mysqli_query($conn,$sql);

$sql = "INSERT INTO product_price_tbl(prd_id,prd_price_pickin,prd_sell,prdp_date) VALUES ('$prd_id','$price','$price_sell','$date')";
$query = mysqli_query($conn,$sql);

$conn->close();

// Send the response back to Angular
echo json_encode($response);
?>

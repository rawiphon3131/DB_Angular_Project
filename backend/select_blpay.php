<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

$data = json_decode(file_get_contents('php://input'), true);
$order_id = $data['order_id'];

include_once("db_connect.php");


$sql = "SELECT a.order_id,cus_id,user_id,order_type_id,state_id,b.ordd_id,SUM(order_sum) FROM order_tbl as a
INNER JOIN order_detail_tbl as b
ON a.order_id = b.order_id WHERE a.order_id = '$order_id'";

// Execute the query
$result = mysqli_query($conn, $sql);

// Fetch the products into an array
$paybl = array();
while ($row = mysqli_fetch_assoc($result)) {
    $customer = array(
        'order_id' => $row['order_id'],
        'cus_id' => $row['cus_id'],
        'user_id' => $row['user_id'],
        'order_type_id' => $row['order_type_id'],
        'state_id' => $row['state_id'],
        'order_sum' => $row['SUM(order_sum)'],
        'ordd_id' => $row['ordd_id']

        
    );
    $paybl[] = $customer;
}

// Return the type_prd as JSON
header('Content-Type: application/json');
echo json_encode($paybl);
?>
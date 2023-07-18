<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
$data = json_decode(file_get_contents('php://input'), true);
include_once("db_connect.php");

$order_id_j = $data['order_id'];

$sql = "SELECT ordd_id,a.prdp_id,b.prd_id,prd_name_id,prd_name,c.size_id,size_name,order_values,order_sum,prd_sell FROM order_detail_tbl as a
INNER JOIN product_price_tbl as b
ON a.prdp_id =b.prdp_id
INNER JOIN product_tbl as c
ON b.prd_id = c.prd_id 
INNER JOIN size_tbl as d
ON c.size_id = d.size_id
WHERE order_id = '$order_id_j'
";

// Execute the query
$result = mysqli_query($conn, $sql);

// Fetch the products into an array
$orders = array();
while ($row = mysqli_fetch_assoc($result)) {
    $order = array(
        'ordd_id' => $row['ordd_id'],
        'prd_name' => $row['prd_name'].' '.$row['size_name'],
        'order_values' =>$row['order_values'],
        'order_sum' => $row['order_sum'],
        'prd_sell' => $row['prd_sell'],
        'prd_name_id' => $row['prd_name_id'],
        
    );
    $orders[] = $order;
}

// Return the orders as JSON
header('Content-Type: application/json');
echo json_encode($orders);
?>
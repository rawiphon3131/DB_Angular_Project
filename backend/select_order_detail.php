<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

include_once("db_connect.php");

$sql = "SELECT a.order_id,a.cus_id,b.cus_name_id,cus_name,order_date,a.order_type_id,order_type_name,a.state_id,state_name,ordd_id,order_values,order_sum FROM order_tbl as a
INNER JOIN customer_tbl as b
ON a.cus_id = b.cus_id
INNER JOIN customer_name_tbl as d
ON b.cus_name_id = d.cus_name_id
INNER JOIN order_type_tbl as c
ON a.order_type_id = c.order_type_id
INNER JOIN state_tbl as e 
ON a.state_id = e.state_id
INNER JOIN order_detail_tbl as f 
ON a.order_id = f.order_id";

// Execute the query
$result = mysqli_query($conn, $sql);

// Fetch the products into an array
$orderList = array();
while ($row = mysqli_fetch_array($result)) {
    $order = array(
        'cus_id' => $row['cus_id'],
        'cus_name' => $row['cus_name'],
        'order_date' => $row['order_date'],
        'order_type_id' => $row['order_type_id'],
        'order_type_name' =>$row['order_type_name'],
        'state_id' => $row['state_id'],
        'state_name' => $row['state_name'],
        'ordd_id' => $row['ordd_id'],
        'order_values' => $row['order_values'],
        'order_sum' => $row['order_sum']



    );
    $orderList[] = $order;
}

// Return the products as JSON
header('Content-Type: application/json');
echo json_encode($orderList);
?>

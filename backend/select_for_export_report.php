<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

include_once("db_connect.php");

$sql = "SELECT a.order_id,a.cus_id,b.cus_name_id,cus_name,a.user_id,user_fname,user_lname,order_date,a.order_type_id,order_type_name,a.state_id,state_name,g.ordd_id,g.prdp_id,h.prd_id,prd_name,order_values,order_sum FROM order_tbl as a
INNER JOIN customer_tbl as b
ON a.cus_id = b.cus_id
INNER JOIN customer_name_tbl as c
ON b.cus_name_id = c.cus_name_id
INNER JOIN user_tbl as d
ON a.user_id = d.user_id
INNER JOIN order_type_tbl as e
ON a.order_type_id = e.order_type_id
INNER JOIN state_tbl as f
ON a.state_id = f.state_id
INNER JOIN order_detail_tbl as g
ON a.order_id = g.order_id
INNER JOIN product_price_tbl as h
ON g.prdp_id = h.prdp_id
INNER JOIN product_tbl as i
ON h.prd_id = i.prd_id";

// Execute the query
$result = mysqli_query($conn, $sql);

// Fetch the products into an array
$dataReport = array();
while ($row = mysqli_fetch_array($result)) {
    $order = array(
        'order_id' => $row['order_id'],
        'cus_id' => $row['cus_id'],
        'cus_name' => $row['cus_name'],
        'user_name' => $row['user_fname'].$row['user_lname'],
        'order_date' =>$row['order_date'],
        'state_id' => $row['state_id'],
        'state_name' => $row['state_name'],
        'ordd_id' => $row['ordd_id'],
        'order_values' => $row['order_values'],
        'order_sum' => $row['order_sum'],
        'prd_name' => $row['prd_name']



    );
    $dataReport[] = $order;
}

// Return the products as JSON
header('Content-Type: application/json');
echo json_encode($dataReport);
?>

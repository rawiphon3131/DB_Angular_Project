<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
$data = json_decode(file_get_contents('php://input'), true);
include_once("db_connect.php");

$order_id_j = $data['order_id'];

$sql = "SELECT ordd_id,a.prdp_id,b.prd_id,prd_name,c.size_id,size_name,order_values,order_sum,prd_sell,a.order_id,e.cus_id,f.cus_name_id,cus_name,cus_numtel,cus_adddress,e.user_id,user_fname,user_lname
FROM order_detail_tbl as a
INNER JOIN product_price_tbl as b
ON a.prdp_id =b.prdp_id
INNER JOIN product_tbl as c
ON b.prd_id = c.prd_id 
INNER JOIN size_tbl as d
ON c.size_id = d.size_id
INNER JOIN order_tbl as e
ON a.order_id = e.order_id
INNER JOIN customer_tbl as f
ON e.cus_id = f.cus_id
INNER JOIN customer_name_tbl as g
ON f.cus_name_id = g.cus_name_id
INNER JOIN user_tbl as h
ON e.user_id = h.user_id
WHERE a.order_id = '$order_id_j'
";

// Execute the query
$result = mysqli_query($conn, $sql);

// Fetch the products into an array
$orders = array();
while ($row = mysqli_fetch_assoc($result)) {
    $order = array(
        'cus_name' => $row['cus_name'],
        'cus_numtel' => $row['cus_numtel'],
        'cus_adddress' => $row['cus_adddress'],
        'user_name' => $row['user_fname'].' '.$row['user_lname'],
        'order_idb' => $row['order_id']

        
    );
    $orders[] = $order;
}

// Return the orders as JSON
header('Content-Type: application/json');
echo json_encode($orders);
?>
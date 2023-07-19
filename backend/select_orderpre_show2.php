<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

include_once("db_connect.php");

$sql = "SELECT a.ordp_id,ordp_bill_no, a.user_id,user_fname,user_lname,ordp_date,state_id,a.cpn_id,cpn_name,cpn_numtel,cpn_address FROM order_pre_tbl as a
INNER JOIN user_tbl as b
ON a.user_id = b.user_id
INNER JOIN company_tbl as c
ON a.cpn_id = c.cpn_id";


// Execute the query
$result = mysqli_query($conn, $sql);

// Fetch the orders into an array
$orderList = array();
while ($row = mysqli_fetch_array($result)) {
    $order = array(
        'ordp_id' => $row['ordp_id'],
        'ordp_bill_no' => $row['ordp_bill_no'],
        'ordp_date' => $row['ordp_date'],
        'user_id' => $row['user_id'],
        'user_name' => $row['user_fname'].$row['user_lname'],
        'state_id' => $row['state_id'],
        'cpn_name' => $row['cpn_name'].' '.$row['cpn_numtel'].' '.$row['cpn_address']
    );
    $orderList[] = $order;
}

// Return the orders as JSON
header('Content-Type: application/json');
echo json_encode($orderList);

?>

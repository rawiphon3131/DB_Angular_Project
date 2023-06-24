<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

include_once("db_connect.php");

$sql = "SELECT order_id, a.cus_id, b.cus_name_id, cus_name, a.user_id, user_fname, user_lname, a.order_type_id, order_type_name, a.state_id, state_name, order_date
        FROM order_tbl AS a
        INNER JOIN customer_tbl AS b ON a.cus_id = b.cus_id
        INNER JOIN customer_name_tbl AS c ON b.cus_name_id = c.cus_name_id
        INNER JOIN user_tbl AS d ON a.user_id = d.user_id
        INNER JOIN order_type_tbl AS e ON a.order_type_id = e.order_type_id
        INNER JOIN state_tbl AS f ON a.state_id = f.state_id";

// Execute the query
$result = mysqli_query($conn, $sql);

// Fetch the orders into an array
$orderList = array();
while ($row = mysqli_fetch_array($result)) {
    $order = array(
        'order_id' => $row['order_id'],
        'cus_id' => $row['cus_id'],
        'cus_name' => $row['cus_name'],
        'user_id' => $row['user_id'],
        'user_name' => $row['user_fname'].$row['user_lname'],
        'order_date' => $row['order_date'],
        'order_type_id' => $row['order_type_id'],
        'order_type_name' => $row['order_type_name'],
        'state_id' => $row['state_id'],
        'state_name' => $row['state_name'],
    );
    $orderList[] = $order;
}

// Return the orders as JSON
header('Content-Type: application/json');
echo json_encode($orderList);

?>

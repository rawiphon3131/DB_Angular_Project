<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
$data = json_decode(file_get_contents('php://input'), true);
include_once("db_connect.php");

$order_id_j = $data['order_id'];

$sql = "SELECT SUM(order_sum) AS total_sum FROM order_detail_tbl WHERE order_id = '$order_id_j'";

// Execute the query
$result = mysqli_query($conn, $sql);

// Fetch the total sum into an array
$OrderSum = array();
while ($row = mysqli_fetch_assoc($result)) {
    $order = array(
        'order_sum_sum' => $row['total_sum']
    );
    $OrderSum[] = $order;
}

// Return the OrderSum as JSON
header('Content-Type: application/json');
echo json_encode($OrderSum);
?>

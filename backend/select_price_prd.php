<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
$data = json_decode(file_get_contents('php://input'), true);
include_once("db_connect.php");

$order_id_j = $data['order_id'];

$sql = "SELECT * FROM order_detail_tbl WHERE order_id = '$order_id_j'";
$query = mysqli_query($conn, $sql);
$prdp_ids = array();
while ($row = mysqli_fetch_assoc($query)) {
    $prdp_ids[] = $row['prdp_id'];
}

// Create a comma-separated string of prdp_ids
$prdp_ids_str = implode(',', $prdp_ids);

$sql = "SELECT * FROM product_price_tbl WHERE prdp_id IN ($prdp_ids_str)";
$query2 = mysqli_query($conn, $sql);

$price_prd_id = array();
while ($row = mysqli_fetch_assoc($query2)) {
    $order = array(
        'prd_sell' => $row['prd_sell'],
        'prd_idd' => $row['prd_id']
    );
    $price_prd_id[] = $order;
}

// Return the price_prd_id as JSON
header('Content-Type: application/json');
echo json_encode($price_prd_id);
?>

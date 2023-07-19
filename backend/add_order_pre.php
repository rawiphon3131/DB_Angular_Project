<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
$data = json_decode(file_get_contents('php://input'), true);
include_once("db_connect.php");

$bill_date = $data[0]['bill_date'];
$bill_no = $data[0]['bill_no'];
$selectedValue = $data[0]['selectedValue'];
$userId = $data[0]['userId'];
$totalSum = $data[0]['totalSum'];

$sql = "INSERT INTO order_pre_tbl(ordp_bill_no, user_id,cpn_id, ordp_date, state_id)
        VALUES ('$bill_no', '$userId','$selectedValue', '$bill_date', 2)";
$query = mysqli_query($conn, $sql);
$order_pre_id_tbl = mysqli_insert_id($conn);

if ($query) {
    foreach ($data as $item) {
        $prdp_id = $item['prdp_id'];
        $prd_sell = $item['prd_sell'];
        $product_values = $item['product_values'];

        $sql = "INSERT INTO order_pre_detail(ordp_id, ordpd_valuse, ordpd_price, prdp_id)
                VALUES ('$order_pre_id_tbl', '$product_values', '$totalSum', '$prdp_id')";
        $query = mysqli_query($conn, $sql);

        if (!$query) {
            $response = array('status' => 'error', 'message' => 'Error inserting order details');
            echo json_encode($response);
            exit; // Stop execution to prevent further iteration
        }
    }

    $response = array('status' => 'success', 'message' => 'Order details inserted successfully');
    echo json_encode($response);
} else {
    $response = array('status' => 'error', 'message' => 'Error inserting order');
    echo json_encode($response);
}
?>

<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

include_once("db_connect.php");
$data = json_decode(file_get_contents('php://input'), true);
$prd_id = $data[0]['prd_id'];
$prd_sell = $data[0]['prd_sell'];
$product_values = $data[0]['product_values'];
$size_name = $data[0]['size_name'];
$cusId = $data[0]['cusId'];
$selectedOption = $data[0]['selectedOption'];
$customerCredit = $data[0]['customerCredit'];
$customerAddress = $data[0]['customerAddress'];
$customerNumphone = $data[0]['customerNumphone'];
$userId = $data[0]['userId'];
$type_sell = $data[0]['type_sell'];
$date = date("Y-m-d H:i:s");



// Insert the order into order_tbl
$sql = "INSERT INTO order_tbl (cus_id, user_id, order_date, order_type_id, state_id) 
        VALUES ('$cusId', '$userId', '$date', '$type_sell', 2)";
$query = mysqli_query($conn, $sql);

if (!$query) {
    $response = array('ERROR');
    echo json_encode($response);
    exit;
}

// Get the inserted order_id
$order_id_tbl = mysqli_insert_id($conn);

// Process each item in the data array
foreach ($data as $item) {
    $prd_id = $item['prd_id'];
    $prd_sell = $item['prd_sell'];
    $product_values = $item['product_values'];
    $size_name = $item['size_name'];

    // Insert into the order_detail_tbl
    $sql = "SELECT prdp_id, prd_sell FROM product_price_tbl WHERE prd_id = '$prd_id'";
    $query = mysqli_query($conn, $sql);

    if (mysqli_num_rows($query) > 0) {
        $row = mysqli_fetch_array($query);
        $prdp_id_table = $row['prdp_id'];
        $prd_sell_table = $row['prd_sell'];

        $order_sumerly = $product_values * $prd_sell_table;

        $sql = "INSERT INTO order_detail_tbl (order_id, prdp_id, order_values, order_sum, ordd_date) 
                VALUES ('$order_id_tbl', '$prdp_id_table', '$product_values', '$order_sumerly', '$date')";
        $query = mysqli_query($conn, $sql);

        if (!$query) {
            $response = array('ERROR');
            echo json_encode($response);
            exit;
        }

        // Update prd_value in product_tbl
        $sql = "UPDATE product_tbl SET prd_value = prd_value - $product_values WHERE prd_id = '$prd_id'";
        $query = mysqli_query($conn, $sql);

        if (!$query) {
            $response = array('ERROR');
            echo json_encode($response);
            exit;
        }
    }
}

// Update state_id in order_tbl based on type_sell
if ($type_sell == 1) {
    $state_id = 7;
} elseif ($type_sell == 2) {
    $state_id = 8;

    // Update ods_tbl and customer_name_tbl
    $sql = "SELECT cus_id, cus_name_id FROM customer_tbl WHERE cus_id = '$userId'";
    $query = mysqli_query($conn, $sql);

    if (mysqli_num_rows($query) > 0) {
        $row = mysqli_fetch_array($query);
        $cus_name_id_tbl = $row['cus_name_id'];

        $sql = "SELECT SUM(order_sum) as total_sum FROM order_detail_tbl WHERE order_id = '$order_id_tbl'";
        $query = mysqli_query($conn, $sql);

        if (mysqli_num_rows($query) > 0) {
            $row = mysqli_fetch_array($query);
            $sum_ods = $row['total_sum'];

            $sql = "SELECT * FROM ods_tbl WHERE cus_id = '$cusId'";
            $query = mysqli_query($conn, $sql);

            if (mysqli_num_rows($query) > 0) {
                $sql = "UPDATE ods_tbl SET ods_values = ods_values + $sum_ods, state_id = 3, ods_date = '$date' WHERE cus_id = '$cusId'";
            } else {
                $sql = "INSERT INTO ods_tbl (cus_id, ods_values, state_id, ods_date) VALUES ('$cusId', $sum_ods, 3, '$date')";
            }

            $query = mysqli_query($conn, $sql);

            if (!$query) {
                $response = array('ERROR');
                echo json_encode($response);
                exit;
            }

            $sql = "UPDATE customer_name_tbl SET cus_credit = cus_credit - $sum_ods WHERE cus_name_id = '$cus_name_id_tbl'";
            $query = mysqli_query($conn, $sql);

            if (!$query) {
                $response = array('ERROR');
                echo json_encode($response);
                exit;
            }
        }
    }
}

// Close the database connection
$conn->close();

// Send the response back to Angular
$response = array('COMPLEAT');
echo json_encode($response);

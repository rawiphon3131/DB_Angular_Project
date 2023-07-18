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
// Extract the necessary values from the data


$sql = "INSERT INTO order_tbl (cus_id, user_id, order_date, order_type_id, state_id) VALUES ('$cusId', '$userId', '$date', '$type_sell', 2)";
$query = mysqli_query($conn, $sql);

// Get the inserted order_id
$order_id_tbl = mysqli_insert_id($conn);



foreach ($data as $item) {
    $prd_id = $item['prd_id'];
    $prd_sell = $item['prd_sell'];
    $product_values = $item['product_values'];
    $size_name = $item['size_name'];
    $cusId = $item['cusId'];
    $selectedOption = $item['selectedOption'];
    $customerCredit = $item['customerCredit'];
    $customerAddress = $item['customerAddress'];
    $customerNumphone = $item['customerNumphone'];
    $userId = $item['userId'];
    $type_sell = $item['type_sell'];
    $date = date("Y-m-d H:i:s");

    // Insert into the database, update values, etc.

    $sql = "SELECT * FROM product_price_tbl WHERE prd_id = '$prd_id'";
    $query = mysqli_query($conn, $sql);
    $row2 = mysqli_fetch_array($query);
    $prd_sell_table = $row2['prd_sell'];
    $prdp_id_table = $row2['prdp_id'];

    $order_sumerly = $product_values * $prd_sell_table;

    $sql = "INSERT INTO order_detail_tbl (order_id, prdp_id, order_values, order_sum,ordd_date) VALUES ('$order_id_tbl', '$prdp_id_table', '$product_values', '$order_sumerly','$date')";
    $query = mysqli_query($conn, $sql);

    
    switch ($type_sell){
        case 1 :
            $sql = "UPDATE order_tbl SET state_id = 4 WHERE order_id = '$order_id_tbl'";
            $query = mysqli_query($conn, $sql);
            break;
        case 2 :
            $sql = "UPDATE order_tbl SET state_id = 3 WHERE order_id = '$order_id_tbl'";
            $query = mysqli_query($conn, $sql);

           
            
    }
   
    $sql = "UPDATE product_tbl SET prd_value=prd_value-$product_values WHERE prd_id = '$prd_id'";
    $query = mysqli_query($conn, $sql);
}
if($type_sell == 2){
    
        $sql = "SELECT order_id,SUM(order_sum) FROM order_detail_tbl WHERE order_id = '$order_id_tbl'";
        $query = mysqli_query($conn, $sql);
        
        if(mysqli_num_rows($query) > 0){
            $row = mysqli_fetch_array($query);
            $order_id_ods = $row['order_id'];
            $sum_ods = $row['SUM(order_sum)'];
            $sql = "SELECT * FROM ods_tbl WHERE cus_id = '$cusId'";
            $query = mysqli_query($conn, $sql);
            if(mysqli_num_rows($query) > 0){
                $sql = "UPDATE ods_tbl SET ods_values = ods_values+$sum_ods ,state_id = 3 ,ods_date = '$date' WHERE cus_id = '$cusId'";
                $query = mysqli_query($conn, $sql);
            }else{
                $sql = "INSERT INTO ods_tbl(cus_id,ods_values,state_id,ods_dae) VALUES ('$cusId','$sum_ods',3,'$date')";
                $query = mysqli_query($conn, $sql);
            }
                 
        }
        $sql = "SELECT cus_id,a.cus_name_id FROM customer_tbl as a 
        INNER JOIN customer_name_tbl as b
        ON a.cus_name_id = b.cus_name_id WHERE cus_id = '$userId'";
        $query = mysqli_query($conn,$sql);
        if(mysqli_num_rows($query) > 0){
            $row = mysqli_fetch_array($query);
            $cus_name_id_tbl = $row['cus_name_id'];
            $sql = "UPDATE customer_name_tbl SET cus_credit=cus_credit-$sum_ods";
            $query = mysqli_query($conn,$sql);
        }
    }

$conn->close();

// Send the response back to Angular
?>

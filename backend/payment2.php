<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

include_once("db_connect.php");
$data = json_decode(file_get_contents('php://input'), true);
$ods_id = $data['ods_id'];
$cus_id = $data['cus_id'];
$payment_amount = $data['payment_amount'];

$sql = "SELECT ods_id,a.cus_id,b.cus_name_id,cus_name,cus_credit,state_id FROM ods_tbl as a
INNER JOIN customer_tbl as b
ON a.cus_id = b.cus_id
INNER JOIN customer_name_tbl as c
ON b.cus_name_id = c.cus_name_id WHERE ods_id ='$ods_id' AND a.cus_id ='$cus_id'";
$query = mysqli_query($conn,$sql);

    

    if(mysqli_num_rows($query) > 0){
        $row = mysqli_fetch_array($query);
        $cus_name_id_tbl = $row['cus_name_id'];
        $sql = "UPDATE ods_tbl SET ods_values = ods_values-$payment_amount WHERE ods_id ='$ods_id' AND cus_id ='$cus_id'";
        $query = mysqli_query($conn,$sql);

        $sql = "UPDATE customer_name_tbl SET cus_credit = cus_credit+$payment_amount WHERE cus_name_id = '$cus_name_id_tbl'";
        $query = mysqli_query($conn,$sql);

        $sql = "UPDATE ods_tbl SET state_id = 4 WHERE ods_id = '$ods_id'";
        $query = mysqli_query($conn,$sql);
    }

$response = [
    'status' => 'success',
    'message' => 'Payment data received successfully'
];


header('Content-Type: application/json');
echo json_encode($response);
?>
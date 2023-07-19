<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

include_once("db_connect.php");

$data = json_decode(file_get_contents('php://input'), true);
$selectedProducts = $data['selectedProducts'];
$selectProdus = $data['selectProdus'];

foreach ($selectedProducts as $prdpn) {
    $cpn_name = $prdpn['cpn_name'];
    $ordp_id = $prdpn['ordp_id'];
    $user_id = $prdpn['user_id'];
    $prdin_date = $prdpn['ordp_date'];

    $sql = "INSERT INTO pickin_tbl(user_id,prdin_mk,prdin_date,ordp_id) VALUES ('$user_id','$cpn_name','$prdin_date','$ordp_id')";
    $query = mysqli_query($conn,$sql);
    $prdin_id_tbl = mysqli_insert_id($conn);
}
foreach($selectProdus as $prdd){
    $prdp_id = $prdd['prdp_id'];
    $inputValue = $prdd['inputValue'];
    $prd_id = $prdd['prd_id'];
    $ordpd_id = $prdd['ordpd_id'];

    $sql = "INSERT INTO pickin_detail_tbl(prdin_id,prdp_id,prdin_values) VALUES ('$prdin_id_tbl','$prdp_id','$inputValue')";
    $query = mysqli_query($conn,$sql);

    $sql = " UPDATE product_tbl SET prd_value=prd_value+$inputValue WHERE prd_id='$prd_id'";
    $query = mysqli_query($conn,$sql);
    
    $sql = "UPDATE order_pre_detail SET ordpd_valuse = ordpd_valuse-$inputValue WHERE ordpd_id ='$ordpd_id'";
    $query = mysqli_query($conn,$sql);

    $sql = "SELECT SUM(ordpd_valuse),ordpd_id FROM order_pre_detail WHERE ordp_id = '$ordp_id'";
$query = mysqli_query($conn, $sql);
$row = mysqli_fetch_array($query);
$value_sum = $row['SUM(ordpd_valuse)'];
if ($value_sum == 0) {
    $sql = "UPDATE order_pre_tbl SET state_id = 4 WHERE ordp_id = '$ordp_id'";
    $query = mysqli_query($conn, $sql);
}else{
    $sql = "UPDATE order_pre_tbl SET state_id = 3 WHERE ordp_id = '$ordp_id'";
    $query = mysqli_query($conn, $sql);
}

}
$conn->close();
$response = json_encode('เพิ่มข้อมูลเสร็จสิ้น');
// Send the response back to Angular
echo json_encode($response);

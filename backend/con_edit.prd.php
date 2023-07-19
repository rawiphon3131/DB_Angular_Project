<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");


include_once("db_connect.php");
$data = json_decode(file_get_contents('php://input'), true);
$prd_id = $data[0]['prd_id'];
$prd_name_id = $data[0]['prd_name_id'];
$prd_name = $data['prd_name'];
$prd_sell_in = $data[0]['prd_sell_in'];
$prd_sell_out = $data[0]['prd_sell_out'];
$prdp_id = $data[0]['prdp_id'];
$size = $data[0]['size'];
$type = $data[0]['type'];
$type_prd = $data[0]['type_prd'];


if($prd_name_id != ''){
    $sql= "UPDATE product_tbl SET prd_name_id = '$prd_name_id ' WHERE prd_id = '$prd_id'";
    $query = mysqli_query($conn,$sql);
}
if($prd_name != ''){
    $sql= "UPDATE product_tbl SET prd_name = '$prd_name ' WHERE prd_id = '$prd_id'";
    $query = mysqli_query($conn,$sql);
}
if($size != ''){
    $sql= "UPDATE product_tbl SET size_id = '$size ' WHERE prd_id = '$prd_id'";
    $query = mysqli_query($conn,$sql);
}
if($type != ''){
    $sql= "UPDATE product_tbl SET type_id = '$type ' WHERE prd_id = '$prd_id'";
    $query = mysqli_query($conn,$sql);
}
if($type_prd != ''){
    $sql= "UPDATE product_tbl SET type_prd_id = '$type_prd ' WHERE prd_id = '$prd_id'";
    $query = mysqli_query($conn,$sql);
}
if($prd_sell_in != ''){
    $sql= "UPDATE product_price_tbl SET prd_price_pickin = '$prd_sell_in ' WHERE prdp_id = '$prdp_id'";
    $query = mysqli_query($conn,$sql);
}
if($prd_sell_out != ''){
    $sql= "UPDATE product_price_tbl SET prd_sell = '$prd_sell_out ' WHERE prdp_id = '$prdp_id'";
    $query = mysqli_query($conn,$sql);
}
$response['status'] = 'Data inserted successfully';
echo json_encode($response);
?>
<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

include_once("db_connect.php");

// Get the request payload
$data = json_decode(file_get_contents('php://input'), true);
$id_product = $data['id_product'];
$name_product = $data['name_product'];
$price_in = $data['price_in'];
$price_sell = $data['price_sell'];
$size = $data['size'];
$type = $data['type'];
$type_prd = $data['type_prd'];
$values = $data['values'];
$date = date("Y-m-d H:i:s");

// Check if data is available

  // Loop through the products array
  
  $sql = "SELECT * FROM product_tbl 
  WHERE prd_name_id='$id_product' 
  AND prd_name='$name_product' 
  AND size_id='$size' 
  AND type_prd_id='$type_prd' 
  AND type_id='$type'";
$query = mysqli_query($conn, $sql);

if (mysqli_num_rows($query) > 0) {
$row = mysqli_fetch_array($query);
$prd_id = $row['prd_id'];

$sql = "SELECT * FROM product_price_tbl 
      WHERE prd_id='$prd_id' 
      AND prd_price_pickin='$price_in' 
      AND prd_sell='$price_sell'";
$query = mysqli_query($conn, $sql);

if (mysqli_num_rows($query) > 0) {
  $response = array('YANG MAI DAI NA');
  echo json_encode($response);
} else {
  $sql = "INSERT INTO product_price_tbl (prd_id, prd_price_pickin, prd_sell, prdp_date) 
          VALUES ('$prd_id', '$price_in', '$price_sell', '$date')";
  $query = mysqli_query($conn, $sql);

  if ($query) {
      $response = array('COMPLEAT');
      echo json_encode($response);
  } else {
      $response = array('ERROR');
      echo json_encode($response);
  }
}
} else {
$sql = "INSERT INTO product_tbl (prd_name_id, prd_name, size_id, type_prd_id, type_id, prd_value,state_id) 
      VALUES ('$id_product', '$name_product', '$size', '$type_prd', '$type', '$values',5)";
$query = mysqli_query($conn, $sql);

if ($query) {
  $prd_id_new = mysqli_insert_id($conn);

  $sql = "INSERT INTO product_price_tbl (prd_id, prd_price_pickin, prd_sell, prdp_date) 
          VALUES ('$prd_id_new', '$price_in', '$price_sell', '$date')";
  $query = mysqli_query($conn, $sql);

  if ($query) {
      $response = array('COMPLEAT');
      echo json_encode($response);
  } else {
      $response = array('ERROR');
      echo json_encode($response);
  }
} else {
  $response = array('ERROR');
  echo json_encode($response);
}
}



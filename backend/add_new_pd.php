<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

include_once("db_connect.php");

// Get the request payload
$data = json_decode(file_get_contents('php://input'), true);

// Check if data is available
if (!empty($data)) {
  // Loop through the products array
  foreach ($data as $product) {
    $name = $product['name'];
    $size = $product['size'];
    $type_prd_name = $product['type_prd_name'];
    $type_name = $product['type_name'];
    $where = $product['where'];
    $value_new = $product['value_new'];
    $price_in = $product['price_in'];
    $price_sell = $product['price_sell'];
    $userId = $product['userId'];

    $date = date("Y-m-d h:i:sa");

    //PART OF type_prd_tbl
    $sql = "SELECT * FROM type_prd_tbl WHERE type_prd_name = '$type_name'";
    $query = mysqli_query($conn, $sql);

    if ($row1 = mysqli_fetch_array($query)) {
      $type_name_tbl = $row1['type_prd_name'];
      $type_name_id = $row1['type_prd_id'];
    } else {
      $sql = "INSERT INTO type_prd_tbl(type_prd_name) VALUES ('$type_name')";
      $query = mysqli_query($conn, $sql);

      $sql = "SELECT * FROM type_prd_tbl GROUP BY type_prd_id DESC LIMIT 1 ";
      $query = mysqli_query($conn, $sql);
      $rowtype = mysqli_fetch_array($query);
      $type_name_id_new = $rowtype['type_prd_id'];
    }

    //PART OF SIZE_TBL
    $sql = "SELECT * FROM size_tbl WHERE size_name ='$size'";
    $query = mysqli_query($conn, $sql);
    if ($row2 = mysqli_fetch_array($query)) {
      $size_name_tbl = $row2['size_name'];
      $size_id_tbl = $row2['size_id'];
    } else {
      $sql = "INSERT INTO size_tbl(size_name) VALUES ('$size')";
      $query = mysqli_query($conn, $sql);

      $sql = "SELECT * FROM size_tbl GROUP BY size_id DESC LIMIT 1 ";
      $query = mysqli_query($conn, $sql);
      $rowsize = mysqli_fetch_array($query);
      $size_id_new = $rowsize['size_id'];
    }

    //PART OF PRODUCT_TBL
    $sql = "SELECT * FROM size_tbl WHERE size_name ='$size'";
    $query = mysqli_query($conn, $sql);
    $rowsize_sec = mysqli_fetch_array($query);
    $size_query = $rowsize_sec['size_id'];

    $sql = "SELECT * FROM type_prd_tbl WHERE type_prd_name = '$type_name'";
    $query = mysqli_query($conn, $sql);
    $rowtype_sec = mysqli_fetch_array($query);
    $type_query = $rowtype_sec['type_prd_id'];


    $sql = "SELECT * FROM product_tbl WHERE prd_name = '$name' AND size_id='$size_query' AND type_prd_id ='$type_query' AND type_id ='$type_prd_name'";
    $query = mysqli_query($conn, $sql);
    if ($row3 = mysqli_fetch_array($query)) {
      $product_id_tbl = $row3['prd_id'];
      $product_name_tbl = $row3['prd_name'];
      $sql = "UPDATE product_tbl SET prd_value=prd_value+$value_new WHERE prd_id = '$product_id_tbl' ";
      $query = mysqli_query($conn, $sql);
    } else {
      $sql = "INSERT INTO product_tbl(prd_name,size_id,type_prd_id,type_id,prd_value) 
        VALUES ('$name','$size_query','$type_query','$type_prd_name','$value_new')";
      $query = mysqli_query($conn, $sql);

      $sql = "SELECT * FROM product_tbl GROUP BY prd_id DESC LIMIT 1 ";
      $query = mysqli_query($conn, $sql);
      $rowprdname = mysqli_fetch_array($query);
      $prd_id_new = $rowprdname['prd_id'];
    }

    $sql = "SELECT * FROM product_tbl WHERE prd_name = '$name' AND size_id='$size_query' AND type_prd_id ='$type_query' AND type_id ='$type_prd_name'";
    $query = mysqli_query($conn, $sql);
    $row_prd_id = mysqli_fetch_array($query);
    $prd_id_q = $row_prd_id['prd_id'];

    //PART OF PRICE_PRD
    $sql = "SELECT * FROM product_price_tbl WHERE prd_id = '$product_id_tbl'";
    $query = mysqli_query($conn, $sql);
    if (mysqli_num_rows($query) > 0) {
      $row4 = mysqli_fetch_array($query);
      $prdp_id_tbl = $row4['prdp_id'];
      $sql = "UPDATE product_price_tbl SET prd_price_pickin = '$price_in', prd_sell = '$price_sell' WHERE prdp_id = '$prdp_id_tbl'";
    } else {
      $sql = "INSERT INTO product_price_tbl (prd_id, prd_price_pickin, prd_sell) VALUES ('$prd_id_q', '$price_in', '$price_sell')";
      $query = mysqli_query($conn, $sql);

      $sql = "SELECT * FROM product_price_tbl ORDER BY prdp_id DESC LIMIT 1";
      $query = mysqli_query($conn, $sql);
      $rowprdsell = mysqli_fetch_array($query);
      $prdprice_id_new = $rowprdsell['prdp_id'];
    }
    $sql = "SELECT a.prd_id, a.prd_name, a.size_id, b.size_name, a.type_prd_id, d.type_prd_name, a.type_id, c.type_name
    FROM product_tbl AS a
    INNER JOIN size_tbl AS b ON a.size_id = b.size_id
    INNER JOIN type_prd_tbl AS d ON a.type_prd_id = d.type_prd_id
    INNER JOIN type_tbl AS c ON a.type_id = c.type_id
    WHERE a.prd_name = '$name' AND b.size_name = '$size' AND d.type_prd_name = '$type_name' AND a.type_id = '$type_prd_name'";
  $query = mysqli_query($conn, $sql);
  if (mysqli_num_rows($query) > 0) {
  $row5 = mysqli_fetch_array($query);
  $prd_id_pinkin = $row5['prd_id'];
  
  $sql = "INSERT INTO pickin_tbl (prd_id, user_id, prdin_mk, prdin_values, prdin_date)
      VALUES ('$prd_id_pinkin', '$userId', '$where', '$value_new', '$date')";
  $query = mysqli_query($conn, $sql);
  if ($query) {
  $response = array('status' => 'Data inserted successfully');
  } else {
  $response = array('status' => 'error', 'message' => 'Failed to insert into pickin_tbl');
  }
  } else {
  $response = array('status' => 'error', 'message' => 'Product not found');
  }
  }





  // Return a success message or any other response if needed
  $response = array('status' => 'Data inserted successfully');
  echo json_encode($response);
} else {
  // Return an error message if no data is available
  $response = array('status' => 'error', 'message' => 'No data received');
  echo json_encode($response);
}

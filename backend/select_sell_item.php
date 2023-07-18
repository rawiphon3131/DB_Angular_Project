<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

include_once("db_connect.php");

$sql = "SELECT prdp_id,a.prd_id,prd_name_id,prd_price_pickin,prd_sell,prd_name,prd_value,b.size_id,size_name
FROM product_price_tbl as a
INNER JOIN product_tbl as b
ON a.prd_id = b.prd_id
INNER JOIN size_tbl as d
ON b.size_id = d.size_id";

// Execute the query
$result = mysqli_query($conn, $sql);

// Fetch the products into an array
$products = array();
while ($row = mysqli_fetch_assoc($result)) {
    $product = array(
        'prd_id' => $row['prd_id'],
        'prd_name' => $row['prd_name'],
        'prd_value' => $row['prd_value'],
        'size_id' => $row['size_id'],
        'size_name' => $row['size_name'],
        'prd_price_pickin' => $row['prd_price_pickin'],
        'prd_sell' => $row['prd_sell'],
        'prd_name_id' => $row['prd_name_id'],
    );
    $products[] = $product;
}

// Return the products as JSON
header('Content-Type: application/json');
echo json_encode($products);
?>

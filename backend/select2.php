<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

include_once("db_connect.php");

$sql = "SELECT a.prd_id, prd_name, a.size_id, size_name, d.type_id, type_name,prd_price_pickin
        FROM product_tbl AS a
        INNER JOIN size_tbl AS b ON a.size_id = b.size_id
        INNER JOIN type_tbl AS d ON a.type_id = d.type_id
        INNER JOIN product_price_tbl as e ON a.prd_id = e.prd_id";

// Execute the query
$result = mysqli_query($conn, $sql);

// Fetch the products into an array
$products = array();
while ($row = mysqli_fetch_assoc($result)) {
    $product = array(
        'prd_id' => $row['prd_id'],
        'prd_name' => $row['prd_name'],
        'type_id' => $row['type_id'],
        'type_name' => $row['type_name'],
        'size_id' => $row['size_id'],
        'size_name' => $row['size_name'],
        'prd_price_pickin' => $row['prd_price_pickin']
    );
    $products[] = $product;
}

// Return the products as JSON
header('Content-Type: application/json');
echo json_encode($products);
?>

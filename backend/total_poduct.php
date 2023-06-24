<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

include_once("db_connect.php");

$sql = "SELECT prdp_id,prd_price_pickin,prd_sell,a.prd_id,prd_name,b.size_id,size_name,b.type_id,type_name,b.type_prd_id,type_prd_name,prd_value FROM product_price_tbl as a
INNER JOIN product_tbl as b
ON a.prd_id = b.prd_id 
INNER JOIN size_tbl as d
ON b.size_id = d.size_id
INNER JOIN type_tbl as e
ON b.type_id = e.type_id
INNER JOIN type_prd_tbl as f
ON b.type_prd_id = f.type_prd_id";

// Execute the query
$result = mysqli_query($conn, $sql);

// Fetch the products into an array
$pd_vl = array();
while ($row = mysqli_fetch_assoc($result)) {
    $value_pd = array(
        'prd_name' => $row['prd_name'],
        'prd_value' => $row['prd_value'],
        'size_name' => $row['size_name'],
        'prd_sell' => $row['prd_sell'],
        'type_name' => $row['type_name'],
        'type_prd_name' => $row['type_prd_name'],
    );
    $pd_vl[] = $value_pd;
}

// Return the pd_vl as JSON
header('Content-Type: application/json');
echo json_encode($pd_vl);
?>

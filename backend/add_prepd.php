<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");


include_once("db_connect.php");
$data = json_decode(file_get_contents('php://input'), true);
$ordp_id = $data['ordp_id'];

$sql = "SELECT ordpd_id,ordpd_valuse,a.prdp_id,b.prd_id,prd_name,prd_price_pickin,c.size_id,size_name FROM order_pre_detail as a
INNER JOIN product_price_tbl as b
ON a.prdp_id = b.prdp_id
INNER JOIN product_tbl as c
ON b.prd_id = c.prd_id
INNER JOIN size_tbl as d
ON c.size_id = d.size_id WHERE ordp_id = '$ordp_id'";

// Execute the query
$result = mysqli_query($conn, $sql);

// Fetch the products into an array
$cpnNa = array();
while ($row = mysqli_fetch_assoc($result)) {
    $customer = array(
        'ordpd_id' => $row['ordpd_id'],
        'prd_name' => $row['prd_name']. ' '.$row['size_name'],
        'ordpd_valuse' => $row['ordpd_valuse'],
        'prdp_id' => $row['prdp_id'],
        'prd_price_pickin' => $row['prd_price_pickin'],
        'prd_id' => $row['prd_id'],

    );
    $cpnNa[] = $customer;
}

// Return the type_prd as JSON
header('Content-Type: application/json');
echo json_encode($cpnNa);
?>
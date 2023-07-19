<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");


include_once("db_connect.php");
$data = json_decode(file_get_contents('php://input'), true);
$cus_id = $data['cus_id'];

$sql = "SELECT cus_id,a.cus_name_id,cus_name,cus_numtel,cus_adddress FROM customer_tbl as a
INNER JOIN customer_name_tbl as b
ON a.cus_name_id = b.cus_name_id
WHERE cus_id = '$cus_id'";

// Execute the query
$result = mysqli_query($conn, $sql);

// Fetch the products into an array
$cpnNa = array();
while ($row = mysqli_fetch_assoc($result)) {
    $customer = array(
        'cus_id' => $row['cus_id'],
        'cus_name_id' => $row['cus_name_id'],
        'cus_name' => $row['cus_name'],
        'cus_numtel' => $row['cus_numtel'],
        'cus_adddress' => $row['cus_adddress'],
    );
    $cpnNa[] = $customer;
}

// Return the type_prd as JSON
header('Content-Type: application/json');
echo json_encode($cpnNa);
?>
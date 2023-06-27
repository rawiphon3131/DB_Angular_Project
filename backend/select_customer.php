<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

include_once("db_connect.php");

$sql = "SELECT cus_id,cus_adddress,a.cus_name_id,cus_name,cus_credit,cus_numtel FROM customer_tbl as a
INNER JOIN customer_name_tbl as b
ON a.cus_name_id = b.cus_name_id";

// Execute the query
$result = mysqli_query($conn, $sql);

// Fetch the products into an array
$customers = array();
while ($row = mysqli_fetch_assoc($result)) {
    $customer = array(
        'cus_id' => $row['cus_id'],
        'cus_name_id' => $row['cus_name_id'],
        'cus_name' => $row['cus_name'],
        'cus_address' => $row['cus_adddress'],
        'cus_credit' => $row['cus_credit'],
        'cus_name_id' => $row['cus_name_id'],
        'cus_numphone' => $row['cus_numtel']

        
    );
    $customers[] = $customer;
}

// Return the type_prd as JSON
header('Content-Type: application/json');
echo json_encode($customers);
?>
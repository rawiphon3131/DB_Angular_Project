<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");


include_once("db_connect.php");
$data = json_decode(file_get_contents('php://input'), true);
$cpn_id = $data['cpn_id'];
$sql = "SELECT * FROM company_tbl WHERE cpn_id = '$cpn_id'";

// Execute the query
$result = mysqli_query($conn, $sql);

// Fetch the products into an array
$cpnNa = array();
while ($row = mysqli_fetch_assoc($result)) {
    $customer = array(
        'cpn_id' => $row['cpn_id'],
        'cpn_name' => $row['cpn_name'],
        'cpn_address' => $row['cpn_address'],
        'cpn_numtel' => $row['cpn_numtel'],
    );
    $cpnNa[] = $customer;
}

// Return the type_prd as JSON
header('Content-Type: application/json');
echo json_encode($cpnNa);
?>
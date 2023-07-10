<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

include_once("db_connect.php");
$data = json_decode(file_get_contents('php://input'), true);

$sql = "SELECT a.ods_id,a.cus_id,c.cus_name_id,cus_name,cus_credit,ods_values,a.state_id,state_name FROM ods_tbl as a
INNER JOIN customer_tbl as b
ON a.cus_id = b.cus_id
INNER JOIN customer_name_tbl as c
ON b.cus_name_id = c.cus_name_id
INNER JOIN state_tbl as d
ON a.state_id = d.state_id";

// Execute the query
$result = mysqli_query($conn, $sql);

// Fetch the products into an array
$osd = array();
while ($row = mysqli_fetch_assoc($result)) {
    $prdtype = array(
        'osd_values' => $row['ods_values'],
        'cus_id' => $row['cus_id'],
        'ods_id' => $row['ods_id'],
        'cus_credit' => $row['cus_credit'],
        'cus_name' => $row['cus_name'],
        'ods_values' => $row['ods_values'],
        'state_name' => $row['state_name'],
        'state_id' => $row['state_id']



    );
    $osd[] = $prdtype;
}

// Return the type_prd as JSON
header('Content-Type: application/json');
echo json_encode($osd);
?>
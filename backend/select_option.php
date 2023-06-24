<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

include_once("db_connect.php");

$sql = "SELECT * FROM type_tbl";

// Execute the query
$result = mysqli_query($conn, $sql);

// Fetch the products into an array
$type_prd = array();
while ($row = mysqli_fetch_assoc($result)) {
    $prdtype = array(
        'type_prd_id' => $row['type_id'],
        'type_prd_name' => $row['type_name']
        
    );
    $type_prd[] = $prdtype;
}

// Return the type_prd as JSON
header('Content-Type: application/json');
echo json_encode($type_prd);
?>
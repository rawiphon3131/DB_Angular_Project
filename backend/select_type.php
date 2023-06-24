<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

include_once("db_connect.php");

$sql = "SELECT * FROM type_prd_tbl";

// Execute the query
$result = mysqli_query($conn, $sql);

// Fetch the products into an array
$typeoption = array();
while ($row = mysqli_fetch_assoc($result)) {
    $optiontype = array(
        'type_id' => $row['type_prd_id'],
        'type_name' => $row['type_prd_name']
        
    );
    $typeoption[] = $optiontype;
}

// Return the type_prd as JSON
header('Content-Type: application/json');
echo json_encode($typeoption);
?>
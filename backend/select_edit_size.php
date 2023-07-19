<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

include_once("db_connect.php");
$data = json_decode(file_get_contents('php://input'), true);
$size_id = $data['size_id'];
$sql = "SELECT * FROM size_tbl WHERE size_id = '$size_id'";

// Execute the query
$result = mysqli_query($conn, $sql);

// Fetch the products into an array
$sizename = array();
while ($row = mysqli_fetch_array($result)) {
    $size = array(
        'size_id' => $row['size_id'],
        'size_name' => $row['size_name']
    );
    $sizename[] = $size;
}

// Return the products as JSON
header('Content-Type: application/json');
echo json_encode($sizename);
?>

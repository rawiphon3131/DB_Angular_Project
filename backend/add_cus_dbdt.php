<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
$data = json_decode(file_get_contents('php://input'), true);
include_once("db_connect.php");

$type_sell = $data['type_sell'];
$userId = $data['userId'];

$sql = "SELECT * FROM order_detail_tbl ORDER BY order_id DESC LIMIT 1";
$query = mysqli_query($conn,$sql);

if (!empty($data)) {
    switch ($type_sell){
        case 2:
            
    };

    $response = array('status' => 'Data inserted successfully');
    echo json_encode($response);
} else {
    // Return an error message if no data is available
    $response = array('status' => 'error', 'message' => 'No data received');
    echo json_encode($response);
}

$conn->close();

// No need to echo $response here
?>

<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
$data = json_decode(file_get_contents('php://input'), true);
include_once("db_connect.php");


$name_market = $data['name_market'];
$cpn_numtel = $data['cpn_numtel'];
$cpn_address = $data['cpn_address'];

if (!empty($data)) {
    
    $sql = "INSERT INTO company_tbl(cpn_name,cpn_numtel,cpn_address) VALUES ('$name_market','$cpn_numtel','$cpn_address')";
    $query = mysqli_query($conn,$sql);

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

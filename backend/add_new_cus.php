<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
$data = json_decode(file_get_contents('php://input'), true);
include_once("db_connect.php");

$name_cus_new = $data['name_cus_new'];
$address_cus_new = $data['address_cus_new'];
$phone_cus_new = $data['phone_cus_new'];

if (!empty($data)) {
    $sql = "INSERT INTO customer_name_tbl(cus_name, cus_numtel, cus_credit) VALUES ('$name_cus_new', '$phone_cus_new', 50000)";
    $query = mysqli_query($conn, $sql);


    $sql ="SELECT * FROM customer_name_tbl WHERE cus_name = '$name_cus_new '";
    $query = mysqli_query($conn, $sql);
    if(mysqli_num_rows($query) > 0){
        $row = mysqli_fetch_array($query);
        $cus_id_tbl = $row['cus_name_id'];

        $sql = "INSERT INTO customer_tbl(cus_name_id,cus_adddress) VALUES
        ('$cus_id_tbl','$address_cus_new')";
        $query = mysqli_query($conn, $sql);
    }

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

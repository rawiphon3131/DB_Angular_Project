<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

include_once("db_connect.php");

$sql = "SELECT a.prd_id,prd_name_id, prd_name,b.size_id,size_name, a.user_id, user_fname, user_lname, prdin_mk, prdin_values, prdin_date
        FROM pickin_tbl AS a
        INNER JOIN product_tbl AS b ON a.prd_id = b.prd_id
        INNER JOIN user_tbl AS c ON a.user_id = c.user_id
        INNER JOIN size_tbl as d
        ON b.size_id = d.size_id";

$result = $conn->query($sql);

// Fetch the data and store it in an array
$data = array();
if ($result->num_rows > 0) {
    while ($row = mysqli_fetch_array($result)) {
        $data[] = array(
            'prd_id' => $row['prd_id'],
            'prd_name' => $row['prd_name'].' '.$row['size_name'],
            'userPi' => $row['user_fname'] . ' ' . $row['user_lname'],
            'prdin_mk' => $row['prdin_mk'],
            'prdin_values' => $row['prdin_values'],
            'prdin_date' => $row['prdin_date'],
            'prd_name_id' => $row['prd_name_id'],
        );
    }
}

$conn->close();

// Send the data as a JSON response
header('Content-Type: application/json');
echo json_encode($data);
?>

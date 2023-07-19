<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

include_once("db_connect.php");

$sql = "SELECT a.prdin_id,a.user_id,user_fname,user_lname,prdin_mk,prdin_date,c.prdp_id,d.prd_id,prd_name,prd_name_id,prdin_values,e.size_id,size_name
FROM pickin_tbl as a
INNER JOIN user_tbl as b
ON a.user_id = b.user_id
INNER JOIN pickin_detail_tbl as c
ON a.prdin_id = c.prdin_id
INNER JOIN product_price_tbl as d
ON c.prdp_id = d.prdp_id
INNER JOIN product_tbl as e
ON d.prd_id = e.prd_id
INNER JOIN size_tbl as f
ON e.size_id = f.size_id";

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

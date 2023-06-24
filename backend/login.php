<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

include_once("db_connect.php");

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

if (isset($postdata) && !empty($postdata)) {
    $mysqli = getMysqliConnection(); // Function to establish database connection and return mysqli object
    $password = mysqli_real_escape_string($mysqli, trim($request->password));
    $username = mysqli_real_escape_string($mysqli, trim($request->username));
    $sql = "SELECT * FROM user_tbl WHERE card_id='$username' AND user_password='$password'";

    if ($result = mysqli_query($mysqli, $sql)) {
        $row = mysqli_fetch_assoc($result);
        if ($row) {
            $user_fname = $row['user_fname'];
            $user_lname = $row['user_lname'];
            $user_id = $row['user_id'];
    
    echo json_encode(array("message" => "Login successful", "user_fname" => $user_fname, "user_lname" => $user_lname ,"user_id" =>$user_id));
        } else {
            // Login failed
            http_response_code(401); // Unauthorized status code
            echo json_encode(array("message" => "Invalid credentials"));
        }
    } else {
        http_response_code(500); // Internal Server Error status code
        echo json_encode(array("message" => "Error executing query"));
    }

    $mysqli->close(); // Close the database connection
}

function getMysqliConnection() {
    $db_username = 'root';
    $db_password = '';
    $db_name = 'project';
    $db_host = 'localhost';
    $mysqli = new mysqli($db_host, $db_username, $db_password, $db_name);

    if ($mysqli->connect_error) {
        die('Error: (' . $mysqli->connect_errno . ') ' . $mysqli->connect_error);
    }

    return $mysqli;
}

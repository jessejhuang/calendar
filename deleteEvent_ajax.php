<?php
require "phpConnect.php";
ini_set("session.cookie_httponly", 1); 
 header("Content-Type: application/json");
session_start();

checkUserConsistency();

$user = htmlentities($_SESSION['username']);
$title = htmlentities($_POST['title']);
// $description = htmlentities($_POST['description']);
$dateDay = htmlentities($_POST['dateDay']);
$dateMonth =htmlentities($_POST['dateMonth']);
$dateYear = htmlentities($_POST['dateYear']);
// $startTime = htmlentities($_POST['startTime']);
// $eventType = htmlentities($_POST['eventType']);

$stmt = $mysqli->prepare("DELETE FROM Events WHERE user = ? AND title = ? AND dateDay = ? AND dateMonth = ? AND dateYear = ?");

$stmt->bind_param('sssiiiss', $user, $title, $description, $dateDay, $dateMonth, $dateYear, $startTime, $eventType);

if(!$stmt){
	printf("Query Prep Failed: %s\n", $mysqli->error);
	echo json_encode(array(
		"success" => false,
		"message" => $mysqli->error
		));
	exit;
}

$stmt->execute();

if(!$stmt) {
	echo json_encode(array(
		"success" => false,
		"message" => "Executing the Query has Failed"
		));
	exit;
}
$stmt->close();

echo json_encode(array(
	"success" => true,
	"message" => "Deleting the Event was Successful"
	));
exit;

?>
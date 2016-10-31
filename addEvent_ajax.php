<?php
require "phpConnect.php";
ini_set("session.cookie_httponly", 1); 
session_start()

checkUserConsistency();

$user = htmlentities($_SESSION['username']);
$title = htmlentities($_POST['title']);
$description = htmlentities($_POST['description']);
$dateDay = htmlentities($_POST['dateDay']);
$dateMonth =htmlentities($_POST['dateMonth']);
$dateYear = htmlentities($_POST['dateYear']);
$startTime = htmlentities($_POST['startTime']);
$eventType = htmlentities($_POST['eventType']);

$stmt = $mysqli->prepare("INSERT INTO 'Events' ('user', 'title', 'description', 'dateDay', 'dateMonth', 'dateYear', 'startTime', 'eventType') VALUES (?, ?, ?, ?, ?, ?, ?, ?)");

if(!$stmt){
	printf("Query Prep Failed: %s\n", $mysqli->error);
	echo json_encode(array(
		"success" => false,
		"message" => $mysqli->error
		));
}

$stmt->bind_param('sssiiits', $user, $title, $description, $dateDay, $dateMonth, $dateYear, $startTime, $eventType);

$stmt->execute();

if(!$stmt) {
	echo json_encode(array(
		"success" => false,
		"message" => "Executing the Query has Failed"
		));
	exit;
}
$stmt->close();


$date = $dateMonth "/" $dateDay "/" $dateYear;

echo json_encode(array(
	"success" => true,
	"message" => "Adding the Event was Successful"
	));
exit;
}

?>
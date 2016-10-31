<?php

include "phpConnect.php";
ini_set("session.cookie_httponly", 1); 
session_start();
checkUserConsistency();

$username = $_SESSION['username'];
$stmt = $mysqli->prepare("SELECT title, description, dateDay, dateMonth, dateYear, startTime, eventType FROM Events  WHERE user = \"". $username ."\"");

if(!$stmt){
	printf("Query Prep Failed: %s\n", $mysqli->error);
	echo json_encode(array(
		"success" => false,
		"message" => $mysqli->error
		));
	exit;
}

$stmt->bind_result($title, $description, $dateDay, $dateMonth, $dateYear, $startTime, $eventType);

$stmt->execute();

if(!$stmt) {
	echo json_encode(array(
		"success" => false,
		"message" => "Executing the Query has Failed"
		));
	exit;
}
$stmt->close();

$date = $dateMonth. "/" .$dateDay. "/". $dateYear;

echo json_encode(array(
	"success" => true,
	"title"=> $title,
	"description" => $description,
	"eventType" => $eventType,
	"date" => $date
	));
exit;
?>
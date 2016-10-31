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
$stmt->execute();
$stmt->bind_result($title, $description, $dateDay, $dateMonth, $dateYear, $startTime, $eventType);

//Store values in 2D array
$results = array();
while($stmt-> fetch()){
	$date = $dateMonth. "/" .$dateDay. "/". $dateYear;
						//0		1			2		3			4
	$results[] = array($title,$description,$date,$startTime,$eventType);
}

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
	"results"=> $results
	));
exit;
?>
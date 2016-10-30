<?php
require "phpConnect.php";

checkUserConsistency()


$title = htmlentities($_POST['title'])
$dateDay = htmlentities($_POST['dateDay'])
$dateMonth =htmlentities($_POST['dateMonth'])
$dateYear = htmlentities($_POST['dateYear'])
$startTime = htmlentities($_POST['startTime'])
$endTime = htmlentities($_POST['endTime'])
$type = htmlentities($_POST['type'])

$stmt = $mysqli->prepare("insert into Events (title, day, month, year, startTime, endTime, type) values (?, ?, ?, ?, ?, ?, ?)");

if(!$stmt){
	printf("Query Prep Failed: %s\n", $mysqli->error);
	exit;
}

$stmt->bind_param('sss', $title, $day, $month, $year, $startTime, $endTime, $type);
 
 $stmt->execute();

 if(!$stmt) {
 	echo json_encode(array(
 		"success" => true
 		
 		));
 	exit
 }
 else {
 	echo json_encode(array(
 		"success" => false,
 		"message" => "An error occurred during the execution of the query"
 		));
 }
 
$stmt->close();
 
?>
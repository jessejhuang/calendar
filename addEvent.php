<?php
require "phpConnect.php";

checkUserConsistency()


$title = $_POST['title'];
$dateDay = $_POST['dateDay'];
$dateMonth =htmlentities($_POST['dateMonth'])
$dateYear = htmlentities($_POST['dateYear'])
$startTime = htmlentities($_POST['startTime'])
$endTime = htmlentities($_POST['endTime'])
$type = htmlentities($_POST['type'])

  $query = INSERT INTO `Events`( `user`, `title`, `day`, `month`, 'year', 'startTime', 'endTime', `type` ) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?)";
     $stmt = $mysqli->prepare($query);
 
    if(!$stmt){
       echo json_encode(array(
         "success"=> false,
         "message"=> $mysqli->error
       ));
     }
 
$stmt->bind_param('user', 'title', 'day', 'month', 'year', 'startTime', 'endTime', 'type') 
 
$stmt->execute();
 
$stmt->close();
 

?> 
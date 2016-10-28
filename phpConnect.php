<?php

$mysqli = new mysqli('localhost', 'phpUser','phpPass','Calendar');

if($mysqli->connect_errno){
	printf("Connection Failed :%s\n",$mysqli->connect_error);
	exit;
}

function filter ($str){
	if( !preg_match('/^[\w_\-]+$/', $str) ){
		$str = htmlentities($str);
		printf( "Invalid string %s ",$str);
			exit;
			}
}

function checkCSRF(){
	if((string)$_SESSION['token'] !== $_SESSION["form-token"]){
	die("Request forgery detected");
	}
}

?>


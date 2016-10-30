<?php

$mysqli = new mysqli('localhost', 'phpUser','phpPass','Calendar');

if($mysqli->connect_errno){
	printf("Connection Failed :%s\n",$mysqli->connect_error);
	exit;
}

function filter ($str){
	$str = htmlentities($str);
	if( !preg_match('/^[\w_\-]+$/', $str) ){
		
		printf( "Invalid string %s ",$str);
			exit;
			}
}

function checkCSRF(){
	if((string)$_SESSION['token'] !== $_SESSION["form-token"]){
	die("Request forgery detected");
	}
}

function checkUserConsistency(){
	$previous_ua = @$_SESSION['useragent'];
	$current_ua = $_SERVER['HTTP_USER_AGENT'];
	if(isset($_SESSION['useragent']) && $previous_ua !== $current_ua){
		die("Session hijack detected");
	}else{
		$_SESSION['useragent'] = $current_ua;
	}
}

?>


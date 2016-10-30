<?php

if(isset($_POST['signal']) ){
	
	echo json_encode(array(
	"success" => true
	));
	
	ini_set("session.cookie_httponly", 1);
	session_start();
	//checkUserConsistency();
	
	session_unset();
	session_destroy();
	exit;
}



?>
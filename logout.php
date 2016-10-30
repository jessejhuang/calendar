<?php

if(isset($_POST['signal']) ){
	
	echo json_encode(array(
	"success" => true
	));
	session_start();
	session_unset();
	session_destroy();
	exit;
}



?>
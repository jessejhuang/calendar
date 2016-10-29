<?php

if(!empty($_SERVER['HTTP_X_REQUESTED_WITH']) ){
	session_start();
	session_unset();
	session_destroy();
	echo json_encode(array(
	"success" => true
	));
	exit;
}



?>
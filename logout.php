<?php


echo json_encode(array(
	"success" => true
));
session_start();
session_unset();
session_destroy();
exit;

?>
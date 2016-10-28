<?php
// login_ajax.php
 
header("Content-Type: application/json"); // Since we are sending a JSON response here (not an HTML document), set the MIME Type to application/json

include "phpConnect.php";

$username = $_POST['username'];
$password = $_POST['password'];
 
$pass = crypt($password,"CRYPT_SHA_256");
$search = $mysqli->prepare("SELECT username,password FROM Users
					WHERE username = \"" . $username."\" && password = \"" . $pass . "\"");
		if(!$search){
			printf("Query Prep Failed %s\n", $mysqli-> error);
			exit;
		}
		$search -> execute();
		$search -> bind_result($user_match,$pass_match);
		$search -> fetch();
		$search -> close();
// Check to see if the username
if( $user_match != null ){
	session_start();
	$_SESSION['username'] = $username;
	$_SESSION['token'] = substr(md5(rand()), 0, 10);
 
	echo json_encode(array(
		"success" => true,
		"username" => $username
	));
	exit;
}else{
	echo json_encode(array(
		"success" => false,
		"message" => "Incorrect Username or Password"
	));
	exit;
}
?>
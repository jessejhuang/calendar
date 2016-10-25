<!DOCTYPE html>
<html>
	<head>
		<title>Login</title>
		
		
	</head>
	<body>
		<div> 
			New to this calendar? Register for an account here:
			<form action= "register.php" >
				<input type= "submit" value= "Register"/>
			</form>
		</div>
		<div> Login:
			<form action= "<?php echo htmlentities($_SERVER['PHP_SELF']); ?>" method= "POST">
				<label> Username: </label>
				<input type= "text" name = "user"/>
				
				<label> Password:</label>
				<input type= "text" name = "pass"/>
				
				<input type = "submit" value= "Login"/>
			</form>
		</div>
	</body>
	<?php
	require "phpConnect.php";
	//Redirecting to login page causes session to be destroyed
	session_start();
	session_unset();
	session_destroy();
	
	session_start();
	
	if( isset($_POST["user"]) && isset($_POST["pass"]) ){
		$user = (string)$_POST["user"];
		$pass = (string)$_POST["pass"];
		
		filter($user);
		filter($pass);
		
		$pass = crypt($pass,"CRYPT_SHA_256");
		$search = $mysqli->prepare("SELECT username,password FROM Users
					WHERE username = \"" . $user."\" && password = \"" . $pass . "\"");
		if(!$search){
			printf("Query Prep Failed %s\n", $mysqli-> error);
			exit;
		}
		$search -> execute();
		$search -> bind_result($user_match,$pass_match);
		$search -> fetch();
		echo $user_match . "PASSWORD: ".$pass_match;
		$search -> close();
		if($user_match == null){
			echo "invalid username or password";
		}
		else{
			$_SESSION["username"] = $user_match;
			$_SESSION['token'] = substr(md5(rand()), 0, 10);
			header("Location: CalendarRender.html");		
		}
	}
	
	?>
</html>
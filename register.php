<!DOCTYPE html>
<html>
	<head>
		<title> Create an Account</title>
		
	</head>
	<body>
		<form action = # method = "POST">
		<label> Choose a Username: 
		<input type = "text" name = "proposed"/> </label>
		<br>
		
		<label> Email address:
		<input type= "text" name= "email"/> </label>
		<br>
		<label>
		Choose a password: 
		<input type = "text" name = "password"/> </label>
		<br>
		<label>
		Confirm:
		<input type = "text" name = "confirm"/> </label>
		<br>
	
		<input type = "submit" value= "Create" name = "Create"/>
		
		</form>
		<div> 
		
		
		<?php
		require "phpConnect.php";
		
		if(isset($_POST["proposed"]) and isset($_POST["password"]) and
		isset($_POST["confirm"]) and isset($_POST["email"]) ){
			
			$pass = (string)$_POST["password"];
			$conf = (string)$_POST["confirm"];
			$new_user = (string)$_POST["proposed"];
			$email = (string)$_POST["email"];
			
			printf("All fields recieved");
			filter_var($email);
			filter($pass);
			filter($conf);
			filter($new_user);
			if($pass !== $conf){
				printf("Your passwords do not match");
			}
			else{
				$crypt = crypt($pass,"CRYPT_SHA_256");
				//Check username if proposed password has been taken
				$add_user = $mysqli->prepare("INSERT INTO Users (username,password,email_address)
									VALUES (?,?,?)");
				if(!$add_user){
					printf("Query prep failed: %s\n",$mysqli->error);
					exit;
				}
				$add_user -> bind_param('sss',$new_user,$crypt,$email);
				$add_user -> execute();
				$add_user-> close();
				header("Location: login.php");
			}
		}
		else{
		echo "<p>Please fill in all the required fields above</p>";	
		}
	?>
	</div>
		<form action = "login.php" >
		<input type= "submit" value= "Back" />
		</form>
	</body>
	
</html>

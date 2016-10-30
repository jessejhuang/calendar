<?php
	require "phpConnect.php";
	
		$pass = (string)$_POST["password"];
		$new_user = (string)$_POST["new_user"];
		$email = (string)$_POST["email"];
		
		$email = filter_var($email, FILTER_SANITIZE_EMAIL);
		$email = filter_var($email, FILTER_VALIDATE_EMAIL);
		//echo "<script type='text/javascript'>alert('$email');</script>";
		filter($pass);
		filter($new_user);

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
		
		//Now see if registered info is same as new info inserted into database
		$search = $mysqli->prepare("SELECT username,password FROM Users
					WHERE username = \"" . $new_user."\" && password = \"" . $crypt . "\"");
		if(!$search){
			printf("Query Prep Failed %s\n", $mysqli-> error);
			exit;
		}
		$search -> execute();
		$search -> bind_result($user_match,$pass_match);
		$search -> fetch();
		$search -> close();
		
		if($user_match != null){// Successful insertion
			
			ini_set("session.cookie_httponly", 1);
			session_start();
			checkUserConsistency();
			
			$_SESSION['username'] = $new_user;
			$_SESSION['token'] = substr(md5(rand()), 0, 10);
			echo json_encode(array(
				"success" => true,
				"username" => $new_user
			));
			exit;
		}else{
			echo json_encode(array(
				"success" => false,
				"message" => "This Username has already been taken."
			));
			exit;
		}
	

?>


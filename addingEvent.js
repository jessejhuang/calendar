
function eventForm(){
	if(user ===""){
		$("h4").html("");
	}
	else{
		$("h4").html("Add an Event:"+
					"<input type = \"text\" id=\"title\" placeholder= \"Title\">"+
					"<br><textarea rows=\"4\" cols=\"30\" id = \"description\" placeholder = \"Description\"></textarea>"+
					 "<br>Date:"+
					"<input type = \"text\" id=\"eventMonth\" placeholder=\"mm\">"+
					"<input type = \"text\" id=\"eventDay\" placeholder=\"dd\">"+
					"<input type = \"text\" id=\"eventYear\" placeholder=\"yyyy\">"+
					"<br>Time:"+
					"<input type=\"text\" id=\"startTime\" placeholder = \"hour:minutes\">"+
					"<br><label for=\"home\">Home</label>"+
					"<input type=\"radio\" name=\"type\" id=\"home\" value=\"home\"><br>"+
					"<label for=\"work\">Work</label>"+
					"<input type=\"radio\" name=\"type\" id=\"work\" value=\"work\"><br>"+
					"<label for=\"other\">Other</label>"+
					"<input type=\"radio\" name=\"type\" id=\"other\" value=\"other\"><br><br>"+
					"<button type=\"button\" id=\"buttonAddEvent\">Add Event</button>"
					 );
		//document.getElementById("buttonAddEvent").addEventListener("click", eventAjax, false);
	}
}
/*
function eventAjax(event){
	var title = document.getElementById("prop_user").value; // Get the username from the form
	var  = document.getElementById("prop_pass").value; // Get the password from the form
	var email = document.getElementById("prop_email").value; 
	// Make a URL-encoded string for passing POST data:
	var dataString = "new_user=" + encodeURIComponent(username) + "&password=" + encodeURIComponent(password)+ "&email=" + encodeURIComponent(email);
 
	var xmlHttp = new XMLHttpRequest(); // Initialize our XMLHttpRequest instance
	xmlHttp.open("POST", "register.php", true); // Starting a POST request (NEVER send passwords as GET variables!!!)
	xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // It's easy to forget this line for POST requests
	xmlHttp.addEventListener("load", function(event){
		var jsonData = JSON.parse(event.target.responseText); // parse the JSON into a JavaScript object
		if(jsonData.success){  // in PHP, this was the "success" key in the associative array; in JavaScript, it's the .success property of jsonData
			//alert("You've been entered into the database!");
			user = jsonData.username;
			$("#logging-in").html("<b>Welcome, "+ user + "</b>");
			$("#register").html("");
			eventForm();
		}else{
			alert(jsonData.message);
		}
	}, false); // Bind the callback to the load event
	xmlHttp.send(dataString); // Send the data
}
*/
// ajax_login.js

function loginAjax(event){

	var username = document.getElementById("username").value; // Get the username from the form
	var password = document.getElementById("password").value; // Get the password from the form
 
	// Make a URL-encoded string for passing POST data:
	var dataString = "username=" + encodeURIComponent(username) + "&password=" + encodeURIComponent(password);
 
	var xmlHttp = new XMLHttpRequest(); // Initialize our XMLHttpRequest instance
	xmlHttp.open("POST", "login_ajax.php", true); // Starting a POST request (NEVER send passwords as GET variables!!!)
	xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // It's easy to forget this line for POST requests
	xmlHttp.addEventListener("load", function(event){
		var jsonData = JSON.parse(event.target.responseText); // parse the JSON into a JavaScript object
		if(jsonData.success){  // in PHP, this was the "success" key in the associative array; in JavaScript, it's the .success property of jsonData
			alert("You've been Logged In!");
			user = jsonData.username; //Initialized at top of CalendarMath
			$("#logging-in").html("<b>Welcome, "+ user + "</b>");
			$("#register").html("");
			eventForm();
			eventDeleteForm();
			getEventsAjax();
		}else{
			alert("You were not logged in.  "+jsonData.message);
		}
	}, false); // Bind the callback to the load event
	xmlHttp.send(dataString); // Send the data
}

function logoutAjax(event){
	var xmlHttp = new XMLHttpRequest();
	//alert("foobarbazz");
	xmlHttp.open("POST", "logout.php",true);
	xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xmlHttp.addEventListener("load", function(event){
		var jsonData = JSON.parse(event.target.responseText); // parse the JSON into a JavaScript object
		if(jsonData.success){  // in PHP, this was the "success" key in the associative array; in JavaScript, it's the .success property of jsonData
			alert("You've been successfully logged out.");
			$("#logging-in").html(
									"Login:"+ 
									"<input type=\"text\" id=\"username\" placeholder=\"Username\" />"+
									"<input type=\"password\" id=\"password\" placeholder=\"Password\" />"+
									"<button id=\"login_btn\">Log In</button>"  
									);
			document.getElementById("login_btn").addEventListener("click", loginAjax, false); 
									
			$("#register").html(	"<br> New to this Calendar?<br> Register:"+
									"<input type = \"text\" id= \"prop_user\" placeholder= \"Username\"/>"+
									"<input type= \"text\" id= \"prop_pass\" placeholder= \"Password\"/>"+
									"<input type= \"text\" id= \"prop_email\" placeholder= \"Email Address\"/>"+
									"<button id= \"register_btn\">Register</button>"
									);
			document.getElementById("register_btn").addEventListener("click", registerAjax, false);
			user = "";
			eventForm();
			
		}else{
			alert("Logout failed"+jsonData.message);
		}
	}, false); // Bind the callback to the load event
	var dataString = "signal=foo";
	xmlHttp.send(dataString); // Send the data
}

$( document ).ready(function() {
	document.getElementById("login_btn").addEventListener("click", loginAjax, false); // Bind the AJAX call to button click
	document.getElementById("logout").addEventListener("click",logoutAjax,false);
});

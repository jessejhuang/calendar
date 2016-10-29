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
			$("#logging-in").html("<b>Welcome, "+ jsonData.username + "</b>");
			$("#register").html("");
		}else{
			alert("You were not logged in.  "+jsonData.message);
		}
	}, false); // Bind the callback to the load event
	xmlHttp.send(dataString); // Send the data
}

function logoutAjax(event){
	var xmlHttp = new XMLHttpRequest();
	alert("foobarbazz");
	xmlHttp.open("POST", "login_ajax.php",true);
	xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xmlHttp.addEventListener("load", function(event){
		var jsonData = JSON.parse(event.target.responseText); // parse the JSON into a JavaScript object
		if(jsonData.success){  // in PHP, this was the "success" key in the associative array; in JavaScript, it's the .success property of jsonData
			alert("Foo");
			makeCalendar();
			
		}else{
			alert("Logout failed"+jsonData.message);
		}
	}, false); // Bind the callback to the load event
	xmlHttp.send(null); // Send the data
}

$( document ).ready(function() {
	document.getElementById("login_btn").addEventListener("click", loginAjax, false); // Bind the AJAX call to button click
	document.getElementById("logout").addEventListener("click",logoutAjax,false);
});

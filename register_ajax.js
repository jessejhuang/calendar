

function registerAjax(event){

	var username = document.getElementById("prop_user").value; // Get the username from the form
	var password = document.getElementById("prop_pass").value; // Get the password from the form
	var email = document.getElementById("prop_email").value; 
	// Make a URL-encoded string for passing POST data:
	var dataString = "new_user=" + encodeURIComponent(username) + "&password=" + encodeURIComponent(password)+ "&email=" + encodeURIComponent(email);
 
	var xmlHttp = new XMLHttpRequest(); // Initialize our XMLHttpRequest instance
	xmlHttp.open("POST", "register.php", true); // Starting a POST request (NEVER send passwords as GET variables!!!)
	xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // It's easy to forget this line for POST requests
	xmlHttp.addEventListener("load", function(event){
		var jsonData = JSON.parse(event.target.responseText); // parse the JSON into a JavaScript object
		if(jsonData.success){  // in PHP, this was the "success" key in the associative array; in JavaScript, it's the .success property of jsonData
			user = jsonData.username;
			token = jsonData.token;
			$("#logging-in").html("<b>Welcome, "+ user + "</b>");
			$("#register").html("");
			eventForm();
			eventDeleteForm();
		}else{
			alert(jsonData.message);
		}
	}, false); // Bind the callback to the load event
	xmlHttp.send(dataString); // Send the data
}
$( document ).ready(function() {
	document.getElementById("register_btn").addEventListener("click", registerAjax, false); // Bind the AJAX call to button click
});
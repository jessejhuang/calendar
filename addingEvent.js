
function eventForm(){
	if(user ===""){
		$("h4").html("");
	}
	else{
		$("h4").html("Add an Event:<br>"+
					"<input type = \"text\" id=\"title\" placeholder= \"Title\">"+
					"<br><textarea rows=\"4\" cols=\"30\" id = \"description\" placeholder = \"Description\"></textarea>"+
					 "<br>Date:"+
					"<input type = \"text\" id=\"eventMonth\" placeholder=\"mm\">"+
					"<input type = \"text\" id=\"eventDay\" placeholder=\"dd\">"+
					"<input type = \"text\" id=\"eventYear\" placeholder=\"yyyy\">"+
					"<br>Time:"+
					"<input type=\"text\" id=\"startTime\" placeholder = \"hh:mm\">"+
					"<br><label for=\"home\">Home</label>"+
					"<input type=\"radio\" name=\"type\" id=\"home\" value=\"home\"><br>"+
					"<label for=\"work\">Work</label>"+
					"<input type=\"radio\" name=\"type\" id=\"work\" value=\"work\"><br>"+
					"<label for=\"other\">Other</label>"+
					"<input type=\"radio\" name=\"type\" id=\"other\" value=\"other\"><br><br>"+
					"<button type=\"button\" id=\"buttonAddEvent\">Add Event</button>"
					 );
		document.getElementById("buttonAddEvent").addEventListener("click", eventAjax, false);
	}
}

function eventAjax(event){
	var title = document.getElementById("title").value; 
	var description = document.getElementById("description").value;
	var dateMonth = document.getElementById("eventMonth").value;
	var dateDay = document.getElementById("eventDay").value;
	var dateYear = document.getElementById("eventYear").value;
	var startTime = document.getElementById("startTime").value;
	var eventType;
	if(document.getElementById("home").checked){
		eventType = "home";
	}
	else if(document.getElementById("work").checked){
		eventType = "work";
	}
	else if(document.getElementById("work").checked){
		eventType = "work";
	}
	// Make a URL-encoded string for passing POST data:
	var dataString = "title=" + encodeURIComponent(title) + "&description=" + encodeURIComponent(description);
	dataString += "&dateMonth="+ encodeURIComponent(dateMonth) + "&dateDay="+ encodeURIComponent(dateDay) + "&dateYear="+ encodeURIComponent(dateYear);
	dataString += "&startTime="+ encodeURIComponent(startTime) + "&eventType="+ encodeURIComponent(eventType);
	var xmlHttp = new XMLHttpRequest(); // Initialize our XMLHttpRequest instance
	xmlHttp.open("POST", "addEvent_ajax.php", true); // Starting a POST request (NEVER send passwords as GET variables!!!)
	xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // It's easy to forget this line for POST requests
	xmlHttp.addEventListener("load", function(event){
		var jsonData = JSON.parse(event.target.responseText); // parse the JSON into a JavaScript object
		if(jsonData.success){  // in PHP, this was the "success" key in the associative array; in JavaScript, it's the .success property of jsonData
			alert(jsonData.message);
			//user = jsonData.username;
			//$("#logging-in").html("<b>Welcome, "+ user + "</b>");
			//$("#register").html("");
			//eventForm();
		}else{
			alert(jsonData.message);
		}
	}, false); // Bind the callback to the load event
	xmlHttp.send(dataString); // Send the data
}

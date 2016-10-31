function eventDeleteForm() {
	if (user ==="") {
		$("h5").html("");
	}
	else{
		$("h5").html("Delete an Event:<br>"+
			 "<br>Event Title:"+
			"<input type = \"text\" id=\"deleteTitle\" placeholder=\"Event Title\">"+
			"<br>Event Date:"+
			"<input type=\"text\" id=\"deleteDate\" placeholder = \"MM/DD/YYYY\">"+
			"<button type=\"button\" id=\"buttonDeleteEvent\">Delete Event</button>"
			);
		document.getElementById("buttonDeleteEvent").addEventListener("click", eventDeleteAjax, false);
	}
}
function eventDeleteAjax(event){
	var title = document.getElementById("deleteTitle").value;
	var date = document.getElementById("deleteDate").value;
	var findDateArray = date.split("/");
	if(findDateArray.length === 3) {
		var dateMonth = findDateArray[0];
		var dateDay = findDateArray[1];
		var dateYear = findDateArray[2];
	}
	else {
		document.getElementById("deleteDate").value="";
		alert(Please have the date formatted as DD/MM/YYYY);
	}

	var dataString = "title="+encodeURIComponent(title)+"&dateDay="+encodeURIComponent(dateDay)+"&dateMonth="+encodeURIComponent(dateMonth)+"&dateYear="+encodeURIComponent(dateYear);
	var xmlHttp = new XMLHttpRequest(); 
	xmlHttp.open("POST", "deleteEvent_ajax.php", true); 
	xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); 
	xmlHttp.addEventListener("load", function(event){
		var jsonData = JSON.parse(event.target.responseText); // parse the JSON into a JavaScript object
		if(jsonData.success){  // in PHP, this was the "success" key in the associative array; in JavaScript, it's the .success property of jsonData
		alert(jsonData.message);

	}else{
		alert(jsonData.message);
	}
	}, false); // Bind the callback to the load event
	xmlHttp.send(dataString); // Send the data
}


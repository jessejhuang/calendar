var selectedDate;

$( document ).ready(function() {
	if(selectedDate === undefined){
	}
	
});

//Source: http://stackoverflow.com/questions/38643557/select-and-unselect-td-inside-an-html-table
function highlightCells(){
$("#myTable td").click(function()
    {
     $(this).closest('table').find('td').not(this).removeClass('selected');
	 $(this).toggleClass('selected');
     selectedDate = $(this);
	 //alert(user);
    // alert(selectedDate.attr('id'));
	// $("h4").html("<button id = \"createEvent\">Create Event</button>");
    });
}

function getEventsAjax(){
	if(user !== ""){
		var xmlHttp = new XMLHttpRequest(); // Initialize our XMLHttpRequest instance
			xmlHttp.open("POST", "getEvents.php", true); // Starting a POST request (NEVER send passwords as GET variables!!!)
			xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // It's easy to forget this line for POST requests
			xmlHttp.addEventListener("load", function(event){
				var jsonData = JSON.parse(event.target.responseText); // parse the JSON into a JavaScript object
				if(jsonData.success){  // in PHP, this was the "success" key in the associative array; in JavaScript, it's the .success property of jsonData
					alert("Event info gotten!");
					console.log(jsonData);
					//user = jsonData.username;
					//$("#logging-in").html("<b>Welcome, "+ user + "</b>");
					//$("#register").html("");
					//eventForm();
				}else{
					alert(jsonData.message);
				}
			}, false);
			xmlHttp.send(null);
	}
}
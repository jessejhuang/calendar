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
					displayEventsOnCalendar(jsonData.results);
				}else{
					alert(jsonData.message);
				}
			}, false);
			xmlHttp.send(null);
	}
}
function displayEventsOnCalendar(results){
	//Look at time (display to nearest 30 minute interval, rounding down), or look at date, whichever one matches
	var length = results.length;
	for(var i = 0; i < length; i++){
		//Got to put in calendar now
		//alert(results[i][3]);
		var hours = results[i][3].substring(0,2) ;
		var minutes = results[i][3].substring(3,5);
		var displayMonth = results[i][2].substring(0,2); 
		var displayDay = results[i][2].substring(3,5) ;
		var displayYear = results[i][2].substring(6,10) ;
		var eventDate = new Date(displayYear,displayMonth,displayDay,hours,minutes);
		var monthID = "#" + dateToString(eventDate);
		var weekID = "#" + dateAndTimeToString(halfHourFloor(eventDate));
		$(monthID).html(results[i][0]);
		$(weekID).html(results[i][0]);
		
		
	}
}
//rounds a date to nearest half hour
function halfHourFloor(toBeRounded){
	var ratio = toBeRounded.getMinutes()/ 30.0;
	if(ratio < 1){
		return new Date(toBeRounded.getFullYear, toBeRounded.getMonth(),tobeRounded.getDate(),toBeRounded.getHours(),0);
	//Inspiration from http://stackoverflow.com/questions/37302373/round-ionictimepicker-to-nearest-30-minute-interval#37304619
	}
	else{
		return new Date(toBeRounded.getFullYear, toBeRounded.getMonth(),toBeRounded.getDate(),toBeRounded.getHours(),30);
	}
}
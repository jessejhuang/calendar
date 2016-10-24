$( document ).ready(function() {
	$("h1").append(monthToString(mm) + " " + year);
	$("#next").click(function(){
		nextMonth();
	});
	$("#prev").click(function(){
		prevMonth();
	});
	addRow();
});


function nextMonth(){
	if(mm === 11){
		today = new Date(parseInt(year) +1,0,1);
	}
	else{
		today = new Date(year, parseInt(mm) +1,1);
	}
	dd = today.getDate();
	mm = today.getMonth(); 
	year = today.getFullYear();
	$("h1").html(monthToString(mm) + " " + year);
}
function prevMonth(){
	if(mm === 0){
		today = new Date(parseInt(year) -1,11,1);
	}
	else{
		today = new Date(year, parseInt(mm) -1,1);
	}
	dd = today.getDate();
	mm = today.getMonth(); 
	year = today.getFullYear();
	$("h1").html(monthToString(mm) + " " + year);
}


function addRow(){
	$("tr").last().after("<tr>");
	for(i = 0; i < 7; i++){
		$("tr").last().append("<td></td>");
	}
	$("td").last().after("</tr>");
	
}

// Code to get value of today from: http://stackoverflow.com/questions/1531093/how-to-get-current-date-in-javascript
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth(); //January is 0!
var year = today.getFullYear();

//var tomorrow = today.deltaDays(1);
//alert(today);

//alert(tomorrow);
	
function monthToString(mm){
	
	switch(parseInt(mm)+1){
		case 1:
			return "January";
		case 2:
			return "February";
		case 3:
			return "March";
		case 4:
			return "April";
		case 5:
			return "May";
		case 6:
			return "June";
		case 7:
			return "July";
		case 8:
			return "August";
		case 9:
			return "September";
		case 10:
			return "October";
		case 11:
			return "November";
		case 12:
			return "December";
		default:
			return "Error month??";
	}
}
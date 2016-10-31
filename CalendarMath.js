var today = new Date();
var dd = today.getDate();
var mm = today.getMonth(); //January is 0!
var year = today.getFullYear();
var user = ""; //Initially no one is logged in

var $ = jQuery;
$( document ).ready(function() {
	loadMonthView();
	
	$("#showMonth").click(function(){
		$("#placeholder").remove();
		loadMonthView();
	});
	$("#showWeek").click(function(){
		$("#placeholder").remove();
		loadWeekView();
	});
	//loadWeekView();
	
});
function loadMonthView(){
	makeCalendar();
	highlightCells();
	if(user!== ""){
		getEventsAjax();
		}
		
	$("#next").html("Next Month");
	$("#prev").html("Previous Month");
	$("#next").off();
	$("#prev").off();
	$("#next").on("click",function(){
		nextMonth();
		makeCalendar();
		highlightCells();
		if(user!== ""){
			getEventsAjax();
		}
	});
	$("#prev").on("click",function(){
		prevMonth();
		makeCalendar();
		highlightCells();
		if(user!== ""){
			getEventsAjax();
		}
	});
}
function loadWeekView(){
	weekView(today);
	highlightCells();
	if(user!== ""){
			getEventsAjax();
		}
		
	$("#next").html("Next Week");
	$("#prev").html("Previous Week");
	$("#next").off();
	$("#prev").off();
	$("#next").on("click",function(){
		nextWeek();
		weekView(today);
		highlightCells();
		if(user!== ""){
			getEventsAjax();
		}
	});
	$("#prev").on("click",function(){
		prevWeek();
		weekView(today);
		highlightCells();
		if(user!== ""){
			getEventsAjax();
		}
	});
}

function makeCalendar(){
	$("h1").html(monthToString(mm) + " " + year);
	var table = document.getElementById("myTable");
	
	//Clears each month 
	for(var i = table.rows.length-1; i > 0; i--){
		table.deleteRow(i);
	}
	
	var currentMonth = new Month(year,mm);
	var currentWeek = new Week(currentMonth.getDateObject(1) );
	
	addRow(currentWeek);
	while(!currentWeek.contains(currentMonth.nextMonth().getDateObject(0) )) {
		currentWeek = currentWeek.nextWeek();
		addRow(currentWeek);
	}
	
}
function weekView(currentDate){
	
	var weekShown = new Week(currentDate);
	var weekDates = weekShown.getDates();
	$("h1").html( dateToString(weekDates[0]) + "-" + dateToString(weekDates[6]) );
	var table = document.getElementById("myTable");
	for(var i = table.rows.length-1; i > 0; i--){
		table.deleteRow(i);
	}
	$("tr").first().prepend("<th id = \"placeholder\"></th>");
	addRow(weekShown);
	$("tr").last().prepend("<td>Time</td>");
	addTimes(currentDate);
	
}
function addTimes(date){
	date.setHours(0,0);
	var weekTimes = new Week(date);
	var weekTimeDates = weekTimes.getDates();
	for(var i = 0; i < 48; i ++){
		var min = date.getMinutes();
		if(min < 10){
			min = "0"+ min;
		}
		$("tr").last().after("<tr>");
		$("tr").last().append("<td>"+ date.getHours()+":"+min+ "</td>" );

		for(var j = 0; j < 7; j++){
			weekTimeDates[j].setHours(date.getHours(),date.getMinutes() );
			$("tr").last().append("<td id= \""+ dateAndTimeToString(weekTimeDates[j]) +"\"></td>");
		}
		$("tr").last().after("</tr>");
		date.setHours(date.getHours(), (parseInt(date.getMinutes()) + 30)  );
	}
	
}

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
	//$("h1").html(monthToString(mm) + " " + year);
}
function nextWeek(){
	today = today.deltaDays(7);
	$("#placeholder").remove();
}
function prevWeek(){
	today = today.deltaDays(-7);
	$("#placeholder").remove();
}


function addRow(week){
	var dates = week.getDates();

	$("tr").last().after("<tr>");
	for(var i = 0; i < 7; i++){
	
		if(dates[i].getMonth() == mm ){
				$("tr").last().append("<td id = \"" + dateToString(dates[i])+"\"><b>" + dates[i].getDate() + "</b></td>");
		}
		else{
			$("tr").last().append("<td id = \"" + dateToString(dates[i])+"\">" + dates[i].getDate() + "</td>");
		}
	}
	$("td").last().after("</tr>");
	
}

function dateToString(date){
	var ans = (parseInt(date.getMonth()) + 1) + "/" + date.getDate()  + "/"+ date.getFullYear();
	return ans;
}

//Used to assign cell IDs, should be useful for putting events into calendar according to time
function dateAndTimeToString(date){
	var ans = date.getHours()+":"+date.getMinutes()+ " " + (parseInt(date.getMonth()) + 1) + "/" + date.getDate()  + "/"+ date.getFullYear();
	return ans;
}
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
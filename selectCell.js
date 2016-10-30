var selectedDate;

$( document ).ready(function() {
	if(selectedDate === undefined){
		//alert("Foo");
	}
	
});

//Source: http://stackoverflow.com/questions/38643557/select-and-unselect-td-inside-an-html-table
function highlightCells(){
$("#myTable td").click(function()
    {
     $(this).closest('table').find('td').not(this).removeClass('selected');
	 $(this).toggleClass('selected');
     selectedDate = $(this);
	 alert(user);
    // alert(selectedDate.attr('id'));
	// $("h4").html("<button id = \"createEvent\">Create Event</button>");
    });
}




var sidebarButton = $("#sidebar-close");
var sidebar = $('#sidebar');
var sidebarClosed = false;

/* sidebar slide aniamtion */
sidebarButton.on("click", function(){

	if (!sidebarClosed){
		sidebar.animate({marginLeft: "-155px"});
		$('#sidebar-close > span').removeClass('glyphicon-arrow-left');
		$('#sidebar-close > span').addClass('glyphicon-arrow-right');
	}else{
		sidebar.animate({marginLeft: "0px"});
		$('#sidebar-close > span').removeClass('glyphicon-arrow-right');
		$('#sidebar-close > span').addClass('glyphicon-arrow-left');
	}

	sidebarClosed = !sidebarClosed;

});
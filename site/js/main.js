var video = $("#droneVideo");
var videoLink = $("#videoLink");
var sidebarContent = $("#sidebar-content");
var sidebarButton = $("#sidebar-close");
var sidebar = $('#sidebar');
var sidebarClosed = false;
/* sidebar slide aniamtion */
var videoOff = true;
video.css('display', 'none');

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

videoLink.on("click", function(){
	videoOff = !videoOff;

	if (!videoOff){
		videoLink.text("Disable LiveStream");
		videoLink.css('color', 'red');
		video.css('display', 'block');
	}else{
		videoLink.text("Enable LiveStream");
		videoLink.css('color', 'green');		
		video.css('display', 'none');
	}
})






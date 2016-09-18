
var geojson;
var info;
var mymap;

var layers = [];

$(document).ready(function() {
	mymap = L.map("mainmap").setView([40.60913078424154, -105.00652760267258], 17);
	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    	attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    	maxZoom: 18,
    	id: 'jimmy04500.1e05b0pg',
    	accessToken: 'pk.eyJ1IjoiamltbXkwNDUwMCIsImEiOiJjaXQ3cHZtdjgwYWw3MnpwMTJpMDNicjg3In0.NgEkO4oP3taX7_hwYgKwLQ'
	}).addTo(mymap);


	geojson = L.geoJson(farmData, {
		style: style,
		onEachFeature: onEachFeature,
	}).addTo(mymap);
	

	info = L.control();

	info.onAdd = function (map) {
		this._div = L.DomUtil.create('div', 'info');
		this.update();
		return this._div;
	};
	
	info.update = function (props) {
		this._div.innerHTML = '<h4>Hover over a plot for details</h4>';
	};

	info.addTo(mymap);
	/* test for video highlighting 
	/*geojson.eachLayer(function(layer){
		setInterval(function(){
			highlightPlot2(layer);
		}, 5000); 
	}); */

});

/*function highlightPlot2(lay) {
	var layer = lay;
	layer.setStyle({
		weight: 5,
		color: "#666",
		dashArray: "",
		fillOpacity: 0.7,
	});
	layer.bringToFront();
	info.update(layer.feature.properties);
}

function resetHighlight2(lay) {
	geojson.resetStyle(e.target);
	info.update();
}*/

function getColor(moisture, temperature) {
	var totalPercentage = moisture + temperature;

	// gradient
    var hue=((1 - (moisture / 100)) * 120).toString(10);
    return ["hsl(",hue,",100%,50%)"].join("");
}

function style(feature) {
	return {
		fillColor: getColor(feature.properties.moisture, feature.properties.temperature),
		fillOpacity: 0.7,
		dashArray: "3",
	};
}

function highlightLayer(layer) {
	layer.setStyle({
		weight: 5,
		color: "#666",
		dashArray: "",
		fillOpacity: 0.7,
	});
	layer.bringToFront();
	layer.openPopup();
}
function resetLayer(layer) {
	geojson.resetStyle(layer);
	layer.closePopup();
}

function highlightPlot(e) {
	var layer = e.target;
	layer.setStyle({
		weight: 5,
		color: "#666",
		dashArray: "",
		fillOpacity: 0.7,
	});
	layer.bringToFront();
	layer.openPopup();
	info.update(layer.feature.properties);
}
function resetHighlight(e) {
	geojson.resetStyle(e.target);
	e.target.closePopup();
	info.update();
}

function onEachFeature(feature, layer) {
	layer.bindPopup(
		'<h6><b>Soil Moisture Level</b></h6>' + feature.properties.moisture + '%' + '<h6><b>Soil Temperature</b></h6>' + feature.properties.temperature + '\xB0 C', 
		{ offset: new L.Point(0,-27)}
	);
    layer.on({
        mouseover: highlightPlot,
        mouseout: resetHighlight,
    });
  	layer.on('click', function (e) { // useful for sidebar content
        sidebarContent.html('<h5><b>Soil Moisture Level (%)</b></h5>' + e.target.feature.properties.moisture + ' %<br><h5><b>Soil Temperature (\xB0C)</b></h5>' + e.target.feature.properties.temperature + '\xB0C<br><br><button type="button" class="btn btn-primary" id="graphbutton">Show Graph</button>');
    	if (sidebarClosed) {
			sidebarButton.trigger("click");
		}
	});
	
	layers.push(layer);
}










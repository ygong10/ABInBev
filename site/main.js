
var geojson;
var info;

$(document).ready(function() {
	var mymap = L.map("mainmap").setView([40.60913078424154, -105.00652760267258], 17);
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
		this._div.innerHTML = '<h4>Soil Moisture Level</h4>' +  (props ?
			props.moisture + ' %'
			: 'Hover over a plot');
	};

	info.addTo(mymap);
});


function getColor(d) {
	return 	d > 70 ? "#fee8c8":
//			d > 70 ? :
			d > 60 ? "#fdbb84":
//			d > 50 ? :
//			d > 40 ? #e34a33:
				"#e34a33";
}

function style(feature) {
	return {
		fillColor: getColor(feature.properties.moisture),
		fillOpacity: 0.7,
		dashArray: "3",
	};
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
	
	info.update(layer.feature.properties);
}
function resetHighlight(e) {
	geojson.resetStyle(e.target);
	info.update();
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightPlot,
        mouseout: resetHighlight,
    });
}




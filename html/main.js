$(document).ready(function() {
	var mymap = L.map("mainmap").setView([40.60913078424154, -105.00652760267258], 13);
	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    	attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    	maxZoom: 18,
    	id: 'jimmy04500.1e05b0pg',
    	accessToken: 'pk.eyJ1IjoiamltbXkwNDUwMCIsImEiOiJjaXQ3cHZtdjgwYWw3MnpwMTJpMDNicjg3In0.NgEkO4oP3taX7_hwYgKwLQ'
	}).addTo(mymap);
	L.geoJson(farmData).addTo(mymap);
});








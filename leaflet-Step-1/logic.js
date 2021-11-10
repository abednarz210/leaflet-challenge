// Store our API endpoint as queryUrl.
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Perform a GET request to the query URL/
d3.json(queryUrl).then(function (data) {
  // Once we get a response, send the data.features object to the createFeatures function.
  createFeatures(data.features);
});

function createFeatures(earthquakeData) {


// Define a function and feature a popup
  function onEachFeature(feature, layer) {
    layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Earthquake Depth: " + feature.geometry.coordinates[2] +  "<br>Location: " + feature.properties.place);
  }
  function myLayerStyle(occurance){
    return{
    color: 'red', 
    radius: 7
    }}

    
  var earthquakes = L.geoJson(earthquakeData, {
    
   style: myLayerStyle, 
    // create a vector circle centered on each point feature's latitude and longitude
    pointToLayer: function(feature, latlng) {
      return L.circleMarker(latlng)
    },
    
    onEachFeature: onEachFeature
  });


  //layer to function for map
  createMap(earthquakes);
}

function createMap(earthquakes){ 
 
//map layers 
var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
})


var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});

  // Create a baseMaps object.
  var baseMaps = {
    "Street Map": street,
    "Topographic Map": topo
  };

  // Create an overlay object to hold our overlay.
  var overlayMaps = {
    Earthquakes: earthquakes
  };

  var myMap = L.map("map", {
    center: [
      37.09, -85.71],
    zoom: 5, 
    layers: [street, earthquakes]
    }
  );}

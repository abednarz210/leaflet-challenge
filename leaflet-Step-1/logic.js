// Store our API endpoint 
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
// Perform a GET request to the query URL/
d3.json(queryUrl).then(function (data) {
  // Once we get a response, send the data.features object to the createFeatures function.
  createFeatures(data.features);
});

function createFeatures(earthquakeData) {
  // Define a function that we want to run once for each feature in the features array.
  // Give each feature a popup that describes the magnitude and coordinates of the earthquake.
  function onEachFeature(feature, layer) {
    layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>`);
  }
   // Create a GeoJSON layer that contains the features array on the earthquakeData object.
  // Run the onEachFeature function once for each piece of data in the array.
  var earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature
  });

  // Send our earthquakes layer to the createMap functio
  createMap(earthquakes);
}

function createMap(earthquakes) {
  // Create the base layers.
  var street = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',{
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });

   // Create the base layers.
   var tectonics = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',{
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'

  });

  var baseMaps = {
    "Street Map": street,
    "Tectonics" : tectonics
  };

    // Create an overlay object to hold our overlay.
  var overlayMaps = {
      Earthquakes: earthquakes
  };
  
// Create our map, giving it the streetmap and earthquakes layers to display on load.
  var myMap = L.map("map", {
      center: [
        47.09, -85.71
      ],
      zoom: 4,
      layers: [street, earthquakes]
  });
    // Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
  }).addTo(myMap);
}
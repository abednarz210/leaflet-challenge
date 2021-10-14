    // Create the tile layer that will be the background of our map.
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/light-v11",
  accessToken: API_KEY
  }).addTo(myMap);

      // Create our map, giving it the streetmap and earthquakes layers to display on load.
  var myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [street, earthquakes]
  });

// Store our API endpoint as queryUrl.
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
// Perform a GET request to the query URL/

d3.json(queryUrl).then(function (data) {
  // Once we get a response, send the data.features object to the createFeatures function.



  function createMap(earthquakeData) {



  
    // Create a baseMaps object to hold the map
    var baseMaps = {
      "Light Map": lightMap, 
      "Dark Map": darkMap,
      
    };
  
    // Create tectonic layer.
    var overlayMaps = {
      "EarthquakeZone": EarthquakeZone
    };
  
    // Create the map object with options.
    var map = L.map("map", {
      center: [40.73, -74.0059],
      zoom: 12,
      layers: [streetmap, bikeStations]
    });
  
    // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(map);
  }
  
  function createMarkers(response) {
  
    // Pull the "stations" property from response.data.
    var feature = response.features;
  
    // Initialize an array to hold bike markers.
    var featureMarker = [];
  
    // Loop through the stations array.
    for (var index = 0; index < feature.length; index++) {
      var earth = feature[index];
  
      // For each station, create a marker, and bind a popup with the station's name.
      // Create a red circle over Dallas.



    var bikeMarker = L.circleMarker([32.7767, -96.7979], {
        color: "red",
        fillColor: "red",
        fillOpacity: 0.75,
        radius: 10000
    })
        .bindPopup("<h3>" + station.name + "<h3><h3>Capacity: " + station.capacity + "</h3>");
   
      // Add the marker to the bikeMarkers array.
      bikeMarkers.push(bikeMarker);
    }
  
    // Create a layer group that's made from the bike markers array, and pass it to the createMap function.
    createMap(L.layerGroup(bikeMarkers));
  }
  
  
  // Perform an API call to the Citi Bike API to get the station information. Call createMarkers when it completes.
  d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(createMarkers);
  


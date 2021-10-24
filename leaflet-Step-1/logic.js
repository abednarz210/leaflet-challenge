// Store our API endpoint 
<<<<<<< HEAD
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
=======
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

>>>>>>> a35c033f246aab16aef5d4a9b5fe191ba152dec7
// Perform a GET request to the query URL/
d3.json(queryUrl).then(function (data) {
  // Once we get a response, send the data.features object to the createFeatures function.
  createFeatures(data.features);
});
<<<<<<< HEAD

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
  var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });

  var tectonics= L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
=======

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
    accessToken: API_KEY
>>>>>>> a35c033f246aab16aef5d4a9b5fe191ba152dec7
  });

   // Create the base layers.
   var tectonics = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',{
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    accessToken: API_KEY
  });

  var baseMaps = {
    "Street Map": street,
    "Tectonics" : tectonics
  };

    // Create an overlay object to hold our overlay.
  var overlayMaps = {
      Earthquakes: earthquakes
    };
  
<<<<<<< HEAD
// Create our map, giving it the streetmap and earthquakes layers to display on load.
  var myMap = L.map("map", {
      center: [
        37.09, -95.71
      ],
    
      layers: [street, earthquakes]
  });
    // Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
  }).addTo(myMap);
}


// //Dynamic Legend map 

// function getColor(mag) {
//   return mag > 5? ‘#7a0177’ :
//   mag  > 200000? ‘#BD0026’ :
//   mag > 80000? ‘#E31A1C’ :
//   mag > 10000? ‘#FC4E2A’ :
//   mag > 5000 ? ‘#FD8D3C’ :
//   mag > 500 ? ‘#FEB24C’ :
//   d > 0 ? ‘#FED976’ :
//   ‘#FFEDA0’;
//   }

// var legend = L.control({position: 'bottomright}) 

// var div = L.DomUtil.create(‘div’, ‘info legend’),
// grades = [0,500,5000,10000,80000,200000,5000000];

// for (var i = 0; i < grades.length; i++) {
//   div.innerHTML += ‘<i style=”background:’ + getColor(grades[i] + 1) + ‘”></i> ‘ + grades[i] + (grades[i + 1] ? ‘&ndash;’ + grades[i + 1] + ‘<br>’ : ‘+’);
//   }
//   return div;
//   };
  
  


// legend.onAdd = function (map) { } 

   //legend source: igismap  https://www.igismap.com/legend-in-leafletjs-map-with-topojson/
=======
// // Create our map, giving it the streetmap and earthquakes layers to display on load.
//   var myMap = L.map("map", {
//       center: [
//         47.09, -85.71
//       ],
//       zoom: 4,
//       layers: [street, earthquakes]
//   });
//     // Add the layer control to the map.
//   L.control.layers(baseMaps, overlayMaps, {
//       collapsed: false
//   }).addTo(myMap);
  


//Dynamic Legend map 

function getColor(mag) {
  return mag > 5? ‘#7a0177’ :
  mag  > 200000? ‘#BD0026’ :
  mag > 80000? ‘#E31A1C’ :
  mag > 10000? ‘#FC4E2A’ :
  mag > 5000 ? ‘#FD8D3C’ :
  mag > 500 ? ‘#FEB24C’ :
  d > 0 ? ‘#FED976’ :
  ‘#FFEDA0’;
  }

var legend = L.control({position: 'bottomright}) 

var div = L.DomUtil.create(‘div’, ‘info legend’),
grades = [0,500,5000,10000,80000,200000,5000000];

for (var i = 0; i < grades.length; i++) {
  div.innerHTML += ‘<i style=”background:’ + getColor(grades[i] + 1) + ‘”></i> ‘ + grades[i] + (grades[i + 1] ? ‘&ndash;’ + grades[i + 1] + ‘<br>’ : ‘+’);
  }
  return div;
  };
  
  


legend.onAdd = function (map) { } 


  //legend source: igismap  https://www.igismap.com/legend-in-leafletjs-map-with-topojson/</br>
>>>>>>> a35c033f246aab16aef5d4a9b5fe191ba152dec7

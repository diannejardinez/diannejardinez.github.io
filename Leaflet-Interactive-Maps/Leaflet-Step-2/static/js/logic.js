
// Adding tile layers
var satellitemap = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox/satellite-streets-v11",
  accessToken: API_KEY
});

var grayscalemap = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox/light-v10",
  accessToken: API_KEY
});

var outdoormap = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox/outdoors-v11",
  accessToken: API_KEY
});

// Initialize LayerGroups
var faultlines = new L.LayerGroup();
var earthquakes = new L.LayerGroup();

// Creating map object
// Mountain View, CA coordinates
var map = L.map("map", {
  center: [37.3861, -122.0839],
  zoom: 4,
  layers: [satellitemap, faultlines, earthquakes]
});

// Add 'satellitemap' tile layer to the map
satellitemap.addTo(map);

// Define a baseMaps object
var baseMaps = {
  "Satellite": satellitemap,
  "Grayscale": grayscalemap,
  "Outdoors": outdoormap
};

// Create overlay object
var overlayMaps = {
  "Fault Lines": faultlines,
  "Earthquakes": earthquakes
};

// Pass map layers into layer control and show layer control
L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(map);

// Store Earthquake API endpoint inside link
// All Earthquakes in the past week. Retrieved data on 06-17-2020 
var link =  "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// Grab Earthquake link data with d3
d3.json(link, function(data) {
  // console.log(data.features)

  // Function that will determine the color of an earthquake circle marker based on the magnitude size
  // Link source: https://www.digitalocean.com/community/tutorials/how-to-use-the-switch-statement-in-javascript
  function chooseColor(magnitude) {
    switch (true) { 
    case magnitude < 1:
      return "#fed976";
    case magnitude < 2:
      return "#feb24c";
    case magnitude < 3:
      return "#fd8d3c";
    case magnitude < 4:
      return "#fc4e2a";
    case magnitude < 5:
      return "#e31a1c";
    default:
      return "#b10026";
    }
  }

  // Creating a geoJSON layer with the retrieved data
  L.geoJson(data, {
    // pointToLayer function for circle markers and geojson
    // Source link: https://leafletjs.com/examples/geojson/
    pointToLayer: function(feature, latlng) {
      return L.circleMarker(latlng);
    },
    style: function(feature) {
      return {
        color: "#000000",
        fillColor: chooseColor(feature.properties.mag),
        fillOpacity: 0.8,
        weight: 0.5,
        stroke: true,
        radius: (feature.properties.mag) * 7
      };
    },
    onEachFeature: function(feature, layer) {
      layer.bindPopup
      (`<strong>Location: </strong>${feature.properties.place}<hr><strong>Time: </strong>${new Date(feature.properties.time)}<br><strong>Magnitude: </strong>${feature.properties.mag}`);
    }
  }).addTo(earthquakes); 
  
  // Set up the legend
  // Link source: https://leafletjs.com/examples/choropleth/
  var legend = L.control({ position: "bottomright" });
  legend.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend");
    var magnitudeLabels = [0,1,2,3,4,5];

    var legendInfo = "<strong><center>Magnitude<br>Level</center></strong>" + "<div class=\"labels\">" + "</div>";
    
    div.innerHTML = legendInfo;

    for (var i = 0; i < magnitudeLabels.length; i++) {
        div.innerHTML += 
            '<i style="background:'+ chooseColor(magnitudeLabels[i] + 1) + '"></i> ' +
            magnitudeLabels[i] + (magnitudeLabels[i + 1] ? ' &ndash; ' + magnitudeLabels[i + 1] + '<br>' : ' +');
    }
    return div;
  };
  legend.addTo(map);
});

// Store tectonic plates API endpoint inside link
var platesLink =  "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json"

// Grab tectonic plates link data with d3
d3.json(platesLink, function(data) {
  // console.log(data)

  // Creating a geoJSON layer with the retrieved data
  L.geoJson(data, {
    style: function(feature) {
      return {
        color: "#FFA500",
        weight: 2,
      };
    }
  }).addTo(faultlines); 
});


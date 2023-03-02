// Set up your Mapbox map
mapboxgl.accessToken = 'pk.eyJ1IjoiaW9yb21pZWgiLCJhIjoiY2xlcmRweTRyMDNuaDN2bzBiMGw4ZWo2byJ9.x1cKGLXR128QXXQlQa3O6A';
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [-74.5, 40],
  zoom: 9
});

// Define your point data
var pointData = [
  { "type": "Feature", "geometry": { "type": "Point", "coordinates": [-74.5, 40] } },
  { "type": "Feature", "geometry": { "type": "Point", "coordinates": [-74.6, 40.1] } },
  { "type": "Feature", "geometry": { "type": "Point", "coordinates": [-74.4, 40.2] } }
];

// Define your point layer
map.on('load', function () {
  map.addLayer({
    'id': 'points',
    'type': 'circle',
    'source': {
      'type': 'geojson',
      'data': {
        'type': 'FeatureCollection',
        'features': pointData
      }
    },
    'paint': {
      'circle-radius': 6,
      'circle-color': '#B42222'
    }
  });
});

// Animate the point layer
setInterval(function () {
  // Remove the existing layer
  map.removeLayer('points');
  // Create a new point layer with updated data
  var newPointData = [
    { "type": "Feature", "geometry": { "type": "Point", "coordinates": [-74.6, 40] } },
    { "type": "Feature", "geometry": { "type": "Point", "coordinates": [-74.4, 40.1] } },
    { "type": "Feature", "geometry": { "type": "Point", "coordinates": [-74.5, 40.2] } }
  ];
  map.addLayer({
    'id': 'points',
    'type': 'circle',
    'source': {
      'type': 'geojson',
      'data': {
        'type': 'FeatureCollection',
        'features': newPointData
      }
    },
    'paint': {
      'circle-radius': 6,
      'circle-color': '#B42222'
    }
  });
}, 3000); // Update the points every 3 seconds

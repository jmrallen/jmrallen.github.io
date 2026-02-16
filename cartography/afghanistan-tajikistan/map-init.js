/* map-init.js — Afghanistan-Tajikistan conflict timeline map
   Extracted from projects/afghanistan-tajikistan-timeline.html */

mapboxgl.accessToken = 'pk.eyJ1IjoiaW9yb21pZWgiLCJhIjoiY2xlcmRweTRyMDNuaDN2bzBiMGw4ZWo2byJ9.x1cKGLXR128QXXQlQa3O6A';

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/ioromieh/clrfdknn3004501red3dl3wp2',
  zoom: 5,
  center: [66.81, 34.43]
});

map.on('load', function () {
  // Add conflict data layer
  map.addLayer({
    id: 'conflict_data',
    type: 'circle',
    source: {
      type: 'geojson',
      data: 'https://raw.githubusercontent.com/ioromieh/ioromieh.github.io/90958bbfea1d2fe931cadf294acf015c359b53d4/UCDP_filtered2.geojson'
    },
    paint: {
      'circle-radius': 3,
      'circle-color': [
        'interpolate', ['linear'],
        ['to-number', ['get', 'best_est']],
        0, '#f1f075',
        25, '#e55e5e'
      ],
      'circle-opacity': 1
    },
    filter: ['==', ['number', ['get', 'year']], 1989]
  }, 'continent-label');

  // Set up hex grid
  var bbox = [59.46052141185277, 28.578377031819187, 75.84005654475624, 43.53118996496718];
  var cellSide = 25;
  var options = { units: 'kilometers' };
  var hexgrid = turf.hexGrid(bbox, cellSide, options);

  var url = 'https://raw.githubusercontent.com/ioromieh/ioromieh.github.io/90958bbfea1d2fe931cadf294acf015c359b53d4/UCDP_filtered2.geojson';
  var targetYear = 1989;
  var fillExtrusionOpacity = 0;

  // Adjust hexbin opacity based on pitch
  map.on('render', function () {
    var pitch = map.getPitch();
    fillExtrusionOpacity = pitch <= 0 ? 0 : 0.5;
    if (map.getLayer('hexgrid')) {
      map.setPaintProperty('hexgrid', 'fill-extrusion-opacity', fillExtrusionOpacity);
    }
  });

  // Slider: update hexbins
  document.getElementById('slider').addEventListener('input', function (event) {
    targetYear = parseInt(event.target.value);

    fetch(url)
      .then(function (response) { return response.json(); })
      .then(function (data) {
        var filteredData = data.features.filter(function (f) { return f.properties.year === targetYear; });
        var turfPoints = turf.featureCollection(filteredData);
        var collected = turf.collect(hexgrid, turfPoints, 'best_est', 'totalsum');
        var collectedCopy = JSON.parse(JSON.stringify(collected));

        var hexgridWithCount = turf.featureCollection(collectedCopy.features.map(function (feature) {
          if (feature.properties.totalsum) {
            feature.properties.pt_count = feature.properties.totalsum.length;
          } else {
            feature.properties.pt_count = 0;
          }
          delete feature.properties.totalsum;
          return feature;
        }));

        if (map.getLayer('hexgrid') !== undefined) {
          map.removeLayer('hexgrid');
          map.removeSource('hexgrid');
        }

        map.addSource('hexgrid', {
          type: 'geojson',
          data: hexgridWithCount
        });

        var colorRamp = [[0, '#f1f075'], [1, '#f0d44e'], [2, '#eebf41'], [3, '#ebaa34'], [4, '#e99628'], [5, '#e6831e'], [6, '#e27015'], [7, '#de5d0d'], [8, '#db4a06'], [25, '#e55e5e']];

        map.addLayer({
          id: 'hexgrid',
          type: 'fill-extrusion',
          source: 'hexgrid',
          paint: {
            'fill-extrusion-color': {
              property: 'pt_count',
              stops: colorRamp
            },
            'fill-extrusion-height': ['*', ['get', 'pt_count'], 2000],
            'fill-extrusion-height-transition': { duration: 2000 },
            'fill-extrusion-color-transition': { duration: 2000 },
            'fill-extrusion-opacity': 0
          },
          filter: ['!=', 'pt_count', 0],
          maxzoom: 12
        });
      });
  });

  // Trigger initial load
  var initEvent = new Event('input');
  document.getElementById('slider').dispatchEvent(initEvent);

  // Slider: update conflict points and year label
  document.getElementById('slider').addEventListener('input', function (event) {
    var year = parseInt(event.target.value);
    document.getElementById('active-year').innerText = year;
    if (map.getLayer('conflict_data')) {
      map.setFilter('conflict_data', ['==', ['number', ['get', 'year']], year]);
    }
  });

  // Click popup
  map.on('click', function (event) {
    var features = map.queryRenderedFeatures(event.point, {
      layers: ['conflict_data']
    });
    if (!features.length) return;
    var feature = features[0];
    new mapboxgl.Popup({ offset: [0, -15] })
      .setLngLat(feature.geometry.coordinates)
      .setHTML('<h3>Year: ' + feature.properties.year + '</h3><p>Casualties: ' + feature.properties.best_est + '</p>')
      .addTo(map);
  });

  // Cursor changes
  map.on('mouseenter', 'conflict_data', function () {
    map.getCanvas().style.cursor = 'pointer';
  });
  map.on('mouseleave', 'conflict_data', function () {
    map.getCanvas().style.cursor = '';
  });
});

// Pitch toggle button
var pitchBtn = document.getElementById('pitch-btn');
if (pitchBtn) {
  pitchBtn.addEventListener('click', function () {
    var currentPitch = map.getPitch();
    var newPitch = currentPitch === 0 ? 60 : 0;
    map.easeTo({ pitch: newPitch, duration: 1000 });
  });
}

// Navigation control
map.addControl(new mapboxgl.NavigationControl());

// Fullscreen toggle
var fsBtn = document.getElementById('map-fullscreen-btn');
var mapContainer = document.querySelector('.map-container');
if (fsBtn && mapContainer) {
  fsBtn.addEventListener('click', function () {
    mapContainer.classList.toggle('fullscreen');
    map.resize();
    fsBtn.innerHTML = mapContainer.classList.contains('fullscreen')
      ? '<i class="fas fa-compress"></i>'
      : '<i class="fas fa-expand"></i>';
  });
  // Escape key exits fullscreen
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mapContainer.classList.contains('fullscreen')) {
      mapContainer.classList.remove('fullscreen');
      map.resize();
      fsBtn.innerHTML = '<i class="fas fa-expand"></i>';
    }
  });
}

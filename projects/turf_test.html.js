<!DOCTYPE html>
<html>
<head>
  <link rel="shortcut icon" type="image/x-icon" href="https://raw.githubusercontent.com/ioromieh/ioromieh.github.io/main/favico.ico">
</head>
<meta charset='utf-8' />
<title>Violent events in Afghanistan & Tajikistan: 1989-2021</title>
<meta name='viewport' content='width=device-width, initial-scale=1' />
<script src='https://api.mapbox.com/mapbox-gl-js/v2.13.0/mapbox-gl.js'></script>
<script src='https://api.mapbox.com/mapbox.js/plugins/turf/v3.0.11/turf.min.js'></script>
<link href='https://api.mapbox.com/mapbox-gl-js/v2.13.0/mapbox-gl.css' rel='stylesheet' />
<div id='map'></div>
<body>

<div id='console'>
  <h1>Violent events in Afghanistan & Tajikistan: 1989-2021</h1>
  <p>Data: <a href='https://ucdp.uu.se/'>Uppsala Conflict Data Program</a> Department of Peace and Conflict Research</p>
  <div class='session'>
    <h2>Casualties</h2>
    <div class='row colors'>
    </div>
    <div class='row labels'>
      <div class='label'>0</div>
      <div class='label'></div>
      <div class='label'></div>
      <div class='label'></div>
      <div class='label'></div>
      <div class='label'>25+</div>
    </div>
  </div>
  <div class='session' id='sliderbar'>
    <h2>Year: <label id='active-year'>1989</label></h2>
    <input id='slider' class='row' type='range' min='1989' max='2021' step='1' value='1989' />
  </div>
  <button id="pitch-btn">Change Pitch</button>
</div>

<style>
body {
    margin: 0;
    padding: 0;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }
  
  #map {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
  }
  
  h1 {
    font-size: 20px;
    line-height: 30px;
  }
  
  h2 {
    font-size: 14px;
    line-height: 20px;
    margin-bottom: 10px;
  }
  
  a {
    text-decoration: none;
    color: #2dc4b2;
  }
  
  #console {
    position: absolute;
    width: 240px;
    margin: 10px;
    padding: 10px 20px;
    background-color: white;
  }
  .session {
  margin-bottom: 20px;
}
.row {
  height: 12px;
  width: 100%;
}
.colors {
  background: linear-gradient(to right, #f1f075, #e55e5e);
  margin-bottom: 5px;
}
.label {
  width: 15%;
  display: inline-block;
  text-align: center;
}
#pitch-btn {
  background-color: #3498db;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.3s ease-in-out;
}

#pitch-btn:hover {
  background-color: #2980b9;
}
</style>

<script>
	//Set up Mapbox
    mapboxgl.accessToken = 'pk.eyJ1IjoiaW9yb21pZWgiLCJhIjoiY2xlcmRweTRyMDNuaDN2bzBiMGw4ZWo2byJ9.x1cKGLXR128QXXQlQa3O6A';
    const map = new mapboxgl.Map({
        container: 'map',
        // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
        style: 'mapbox://styles/ioromieh/clf03thw7000m01qlxqp8rndv',
        zoom: 5,
        center: [66.81, 34.43]
    });

    //Add data
    map.on('load', () => {
      map.addLayer({
          id: 'conflict_data',
          type: 'circle',
          source: {
          type: 'geojson',
          data: 'https://raw.githubusercontent.com/ioromieh/ioromieh.github.io/90958bbfea1d2fe931cadf294acf015c359b53d4/UCDP_filtered2.geojson' // replace this with the url of your own geojson
          },
          paint: {
          'circle-radius': 2.5,
          'circle-color': [
              'interpolate', ['linear'], 
              ['to-number', ['get', 'best_est']], // Convert string to number
              0, '#f1f075',
              25, '#e55e5e'],
          'circle-opacity': 1
          },
          filter: ['==', ['number', ['get', 'year']], 1989]
      },
      'land-structure-line' // Add layer below labels
      );
       //Set up hex grid
        //var conflict_data = map.querySourceFeatures('conflict_data').data;
        //var pointBbox = turf.bbox(conflict_data);
        //var bboxPolygon = turf.bboxPolygon(bbox);

        var bbox = [-96,31,-84,40];
        var cellSide = 50;
        var options = {units: 'miles'};
        var hexgrid = turf.hexGrid(bbox, cellSide, options);
      
        var layer = {
    "id": "hexgrid",
    "type": "fill",
    "source": {
        "type": "geojson",
        "data": turf.helpers.featureCollection(hexgrid)
    },
    "paint": {
        "fill-color": "#ff0000",
        "fill-opacity": 0.5
    }
    };

    map.addLayer(layer);




      //Add slider to page
      document.getElementById('slider').addEventListener('input', (event) => { //Add listener to get value from slider
        const year = parseInt(event.target.value);
        // Update the map
        map.setFilter('conflict_data', ['==', ['number', ['get', 'year']], year]);
        // Update text in the UI
        document.getElementById('active-year').innerText = year;

      });

      //Create play 
            map.on('click', (event) => {
        // If the user clicked on one of your markers, get its information.
        const features = map.queryRenderedFeatures(event.point, {
          layers: ['conflict_data'] // replace with your layer name
        });
        if (!features.length) {
          return;
        }
        var feature = features[0];

        // Create a popup, specify its options and properties, and add it to the map.
        const popup = new mapboxgl.Popup({ offset: [0, -15] })
        .setLngLat(feature.geometry.coordinates)
        .setHTML(
      `   <h3>Year: ${feature.properties.year}</h3><p>Casualties: ${feature.properties.best_est}</p>`
        )
        .addTo(map);
      });
      // Change the cursor to a pointer when the mouse is over the places layer.
      map.on('mouseenter', 'conflict_data', () => {
        map.getCanvas().style.cursor = 'pointer';
      });
      // Change it back to a pointer when it leaves.
      map.on('mouseleave', 'conflict_data', () => {
        map.getCanvas().style.cursor = '';
      });
    });
    //Add pitch button
    var pitchBtn = document.getElementById('pitch-btn');

    pitchBtn.addEventListener('click', function() {
      var currentPitch = map.getPitch();
      // Toggle between two pitch values
      var newPitch = currentPitch === 0 ? 60 : 0;
      map.easeTo({
        pitch: newPitch,
        duration: 1000 // animation duration in ms
      });
    });

      //Add navigation control
    map.addControl(new mapboxgl.NavigationControl());
</script>

</body>
</html>

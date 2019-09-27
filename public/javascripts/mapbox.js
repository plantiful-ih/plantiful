// require('dotenv').config();

// The basics for the map
mapboxgl.accessToken = 'pk.eyJ1IjoidGFzaGJjbiIsImEiOiJjazEyZ2V5ajYwMmZoM2FxeWw0dWlsdzc5In0.HTBQfyb6ItNiZbNcjF6RMw';
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v10',
  center: [2.190343, 41.397972],
  zoom: 14.5,
});

map.addControl(new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
  mapboxgl,
}));

map.addControl(new mapboxgl.NavigationControl());

map.addControl(new mapboxgl.GeolocateControl({
  positionOptions: {
    enableHighAccuracy: true,
  },
  trackUserLocation: true,
}));

map.on('load', () => {
  map.loadImage('../images/plantiful_logo.png', (error, image) => {
    if (error) throw error;
    map.addImage('logo', image);
    map.addLayer({
      id: 'symbols',
      type: 'symbol',
      source: {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',

          features: [
            {
              type: 'Feature',
              properties: {
                description: '<strong>Navarro Florista</strong><p>Carrer de Sancho de Ávila, 7, 08018 Barcelona - 933 00 26 29</p>',
              },
              geometry: {
                type: 'Point',
                coordinates: [
                  2.187549,
                  41.397051,
                ],
              },
            },
            {
              type: 'Feature',
              properties: {
                description: '<strong>Floristeria Marina Art Floral</strong><p>Carrer de la Marina, 112, 08018 Barcelona - 935 25 65 82</p>',
              },
              geometry: {
                type: 'Point',
                coordinates: [
                  2.187531,
                  41.394910,
                ],
              },
            },
            {
              type: 'Feature',
              properties: {
                description: '<strong>Floristeria La Plata</strong><p>Carrer de Ramon Turró, 160, 08005 Barcelona - 600 59 28 72</p>',
              },
              geometry: {
                type: 'Point',
                coordinates: [
                  2.199755,
                  41.397506,
                ],
              },
            },
            {
              type: 'Feature',
              properties: {
                description: '<strong>Floristeria Margarita</strong><p>Plaça de Sant Bernat Calbó, 6-7, 08005 Barcelona - 932 25 39 15</p>',
              },
              geometry: {
                type: 'Point',
                coordinates: [
                  2.205030,
                  41.399812,
                ],
              },
            },
            {
              type: 'Feature',
              properties: {
                description: '<strong>Floristeria Ezquerra</strong><p>Carrer de Llull, 202, 08005 Barcelona - no phone number added</p>',
              },
              geometry: {
                type: 'Point',
                coordinates: [
                  2.202869,
                  41.401605,
                ],
              },
            },
            {
              type: 'Feature',
              properties: {
                description: '<strong>FLORISTERÍA BOUQUETS & Co.</strong><p>Carrer de los Castillejos, 250, local 2, 08013 Barcelona - 930 42 64 83</p>',
              },
              geometry: {
                type: 'Point',
                coordinates: [
                  2.179465,
                  41.406169,
                ],
              },
            },
            {
              type: 'Feature',
              properties: {
                description: '<strong>Floristeria Maria</strong><p>Passeig de Sant Joan, 23, 08010 Barcelona - 931 43 57 75</p>',
              },
              geometry: {
                type: 'Point',
                coordinates: [
                  2.178055,
                  41.393614,
                ],
              },
            },
            {
              type: 'Feature',
              properties: {
                description: '<strong>elnoidelesflors</strong><p>Carrer taulat 2, Cementiri poblenou, 08005 Barcelona - 601 17 77 05</p>',
              },
              geometry: {
                type: 'Point',
                coordinates: [
                  2.201659,
                  41.395633,
                ],
              },
            },
          ],
        },
      },

      layout: {
        'icon-image': 'logo',
        'icon-size': 1,
        'icon-allow-overlap': true,
      },
    });

    // Center the map on the coordinates of any clicked symbol from the 'symbols' layer.
    map.on('click', 'symbols', (e) => {
      map.flyTo({ center: e.features[0].geometry.coordinates });
    });

    // Change the cursor to a pointer when the it enters a feature in the 'symbols' layer.
    map.on('mouseenter', 'symbols', () => {
      map.getCanvas().style.cursor = 'pointer';
    });

    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'symbols', () => {
      map.getCanvas().style.cursor = '';
    });

  });
});

// When a click event occurs on a feature in the places layer, open a popup at the
// location of the feature, with description HTML from its properties.
map.on('click', 'symbols', (e) => {
  const coordinates = e.features[0].geometry.coordinates.slice();
  const { description } = e.features[0].properties;

  // Ensure that if the map is zoomed out such that multiple
  // copies of the feature are visible, the popup appears
  // over the copy being pointed to.
  while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
  }

  new mapboxgl.Popup()
    .setLngLat(coordinates)
    .setHTML(description)
    .addTo(map);
});

// Change the cursor to a pointer when the mouse is over the symbols layer.
map.on('mouseenter', 'symbols', () => {
  map.getCanvas().style.cursor = 'pointer';
});

// Change it back to a pointer when it leaves.
map.on('mouseleave', 'symbols', () => {
  map.getCanvas().style.cursor = '';
});

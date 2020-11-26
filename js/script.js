mapboxgl.accessToken = 'pk.eyJ1IjoibXItYW5vbnltb3VzLW9mZmljaWFsIiwiYSI6ImNraHhnMnBkZDB5d3QyeG1vNmRqeHcwYnAifQ.OvjQ2C8YJU4AU_4APrPs_g';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mr-anonymous-official/ckhx75ztv0kai19qu8d5esbh6',
    center: [100.080534, 9.018756],
    zoom: 6
});

var geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    types: 'poi',
    render: function (item) {
        var maki = item.properties.maki || 'marker';
        return (
            "<div class='geocoder-dropdown-item'><img class='geocoder-dropdown-icon' src='https://unpkg.com/@mapbox/maki@6.1.0/icons/" +maki +"-15.svg'><span class='geocoder-dropdown-text'>" +item.text +'</span></div>'
        );
    },
    mapboxgl: mapboxgl
});

map.addControl(
    new MapboxDirections({
    accessToken: mapboxgl.accessToken
    }),
    'bottom-left'
);

map.addControl(geocoder);

map.addControl(new mapboxgl.NavigationControl());

map.addControl(
    new mapboxgl.GeolocateControl({
        positionOptions: {
            enableHighAccuracy: true
        },
            trackUserLocation: true
        }),
        'bottom-right'
);

var draw = new MapboxDraw({
    displayControlsDefault: false,
    controls: {
    polygon: true,
    trash: true
            },
        },

        );
    map.addControl(draw);
     
    map.on('draw.create', updateArea);
    map.on('draw.delete', updateArea);
    map.on('draw.update', updateArea);
     
    function updateArea(e) {
    var data = draw.getAll();
    var answer = document.getElementById('calculated-area');
    if (data.features.length > 0) {
    var area = turf.area(data);
    // restrict to area to 2 decimal points
    var rounded_area = Math.round(area * 100) / 100;
    answer.innerHTML =
    '<p><strong>' +
    rounded_area +
    '</strong></p><p>square meters</p>';
    } else {
    answer.innerHTML = '';
    if (e.type !== 'draw.delete')
    alert('Use the draw tools to draw a polygon!');
    }
    }
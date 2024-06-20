// map class initialize 
var map = L.map('map').setView([18.09, 78.84], 7);
map.zoomControl.setPosition('topright');

// adding osm tilelayer 
var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);



var satellite = L.tileLayer('https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 18,
	
    attributions: ['Developed by NIUM', ],
    id: 'mapbox/light-v9',
    //tileSize: 256,
    //zoomOffset: -1
}).addTo(map);

// var watercolorMap = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
//     attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//     subdomains: 'abcd',
//     minZoom: 1,
//     maxZoom: 16,
//     ext: 'jpg'
// });


//add map scale
L.control.scale().addTo(map);

//Map coordinate display


map.on('mousemove', function (e) {
    const lat = e.latlng.lat.toFixed(6);
    const lng = e.latlng.lng.toFixed(6);
    $('.coordinate').html(`Lat: ${lat} Lng: ${lng}`);
});




// var marker = L.markerClusterGroup();

// var layouts = L.geoJSON(data, {
//     pointToLayer: function (feature, latlng) {
//         // Create markers but don't add them directly to the map
//         return L.marker(latlng, {
//             icon: L.divIcon({className: 'my-custom-marker'})
//         });
//     },
//     onEachFeature: function (feature, layer) {
//         // Exclude "pdfsheetna" from the displayed properties
//         var popupContent = `
//             <style>
//                 .popup-table {
//                     width: 100%;
//                     border-collapse: collapse;
//                     margin-top: 8px;
//                 }
//                 .popup-table th, .popup-table td {
//                     border: 1px solid #ddd;
//                     padding: 8px;
//                     text-align: left;
//                 }
//             </style>
//             <table class="popup-table">
//                 <tr>
//                     <td><strong>File Number:</strong></td>
//                     <td>${feature.properties["File Numbe"]}</td>
//                 </tr>
//                 <tr>
//                     <td><strong>Year:</strong></td>
//                     <td>${feature.properties.Year}</td>
//                 </tr>
//                 <tr>
//                     <td><strong>Status of:</strong></td>
//                     <td>${feature.properties["Status of"]}</td>
//                 </tr>
//                 <tr>
//                     <td><strong>Layout Area:</strong></td>
//                     <td>${feature.properties["Layout Are"]}</td>
//                 </tr>
//                 <tr>
//                     <td><strong>Zone:</strong></td>
//                     <td>${feature.properties.Zone}</td>
//                 </tr>
//                 <tr>
//                     <td><strong>Approved on:</strong></td>
//                     <td>${feature.properties["Approved o"]}</td>
//                 </tr>
//             </table>
//         `;
//         layer.bindPopup(popupContent);
//     }
// });

// layouts.addTo(marker);
// // Note: Do not add layouts directly to the map

// marker.addTo(map);

var layerHMDABoundary;
var layerTelanganaBoundary;
var layerLayouts;
var layerHMDAULBs;
var layerGHMCBoundary;

// Create a marker cluster group for each layer
var markerHMDABoundary = L.markerClusterGroup();
var markerTelanganaBoundary = L.markerClusterGroup();
var markerLayouts = L.markerClusterGroup();
var markerHMDAULBs = L.markerClusterGroup();
var markerGHMCBoundary = L.markerClusterGroup();

// Load GeoJSON data for HMDA_Boundary.geojson
$.getJSON('data/HMDA Boundary.geojson', function (data) {
    layerHMDABoundary = L.geoJSON(data, {
        // onEachFeature: function (feature, layer) {
        //     var popupContent = "<b>Name:</b> " + feature.properties.Name;

        //     layer.bindPopup(popupContent);
        // },
        style: {
            fill: false,  // No fill
            color: 'black',  // Set the boundary color to dark black
            dashArray: '4, 4', 
            weight: 1,    // Adjust the dash pattern as needed
            smoothFactor: 0.000001  // Adjust this value for smoother or less smooth curves
        }
    });

    markerHMDABoundary.addLayer(layerHMDABoundary);
    map.addLayer(markerHMDABoundary);
});

// Load GeoJSON data for Telangana_Boundary.geojson
$.getJSON('data/Telangana Boundary.geojson', function (data) {
    layerTelanganaBoundary = L.geoJSON(data, {
        onEachFeature: function (feature, layer) {
            var popupContent = "<b>Name:</b> " + feature.properties.Name;

            layer.bindPopup(popupContent);
        },
        style: {
            fill: false,  // No fill
            color: 'Red',  // Set the boundary color to dark black
            dashArray: '4, 4', 
            weight: 2,    // Adjust the dash pattern as needed
            smoothFactor: 0.000001  // Adjust this value for smoother or less smooth curves
        }
    });

    markerTelanganaBoundary.addLayer(layerTelanganaBoundary);
    map.addLayer(markerTelanganaBoundary);
});

// Load GeoJSON data for Layouts.geojson
$.getJSON('data/Layouts.geojson', function (data) {
    layerLayouts = L.geoJSON(data, {
        onEachFeature: function (feature, layer) {
            var popupContent = `
            <style>
                // .popup-table {
                //     width: 100%;
                //     border-collapse: collapse;
                //     margin-top: 8px;
                // }
                // .popup-table th, .popup-table td {
                //     border: 1px solid #ddd;
                //     padding: 8px;
                //     text-align: left;
                // }
                .popup-table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 8px;
                }
                .popup-table th, .popup-table td {
                    border: 1px solid #ddd;
                    padding: 8px;
                    text-align: left;
                }
                .popup-container {
                    max-height: 200px; /* Maximum height */
                    overflow-y: auto; /* Enable vertical scrollbar */
                }
            </style>
            <div class="popup-container">
            <table class="popup-table">
                <tr>
                    <td><strong>File Number:</strong></td>
                    <td>${feature.properties["File Numbe"]}</td>
                </tr>
                <tr>
                    <td><strong>District:</strong></td>
                    <td>${feature.properties["DISTRICT"]}</td>
                </tr>
                <tr>
                    <td><strong>Mandal:</strong></td>
                    <td>${feature.properties["MANDAL"]}</td>
                </tr>
                <tr>
                <td><strong>Municipality:</strong></td>
                <td>${feature.properties["MUN_NAME"]}</td>
                </tr>
                <tr>
                    <td><strong>Village:</strong></td>
                    <td>${feature.properties["Village"]}</td>
                </tr>
                <tr>
                    <td><strong>Layout Status:</strong></td>
                    <td>${feature.properties["Status of"]}</td>
                </tr>
                <tr>
                    <td><strong>Layout Area(sq.m):</strong></td>
                    <td>${feature.properties["Approved A"]}</td>
                </tr>
                <tr>
                    <td><strong>Zone:</strong></td>
                    <td>${feature.properties.Zone}</td>
                </tr>
                <tr>
                    <td><strong>Approved on:</strong></td>
                    <td>${feature.properties["Approved o"]}</td>
                </tr>
                <td><strong>PDF Link:</strong></td>
                        <td><a href="${feature.properties["Drive link"]}" target="_blank">Click here to View</a></td>
            </table>
        `;
        layer.bindPopup(popupContent);
    }

       
    });

    markerLayouts.addLayer(layerLayouts);
    map.addLayer(markerLayouts);
});

// Load GeoJSON data for HMDA_ULBs.geojson
$.getJSON('data/HMDA ULBs.geojson', function (data) {
    layerHMDAULBs = L.geoJSON(data, {
        onEachFeature: function (feature, layer) {
            // var popupContent = "<b>Name:</b> " + feature.properties.Name;

            // layer.bindPopup(popupContent);
        },
        style: {
            fill: 'yellow',  // No fill
            color: 'yellow',  // Set the boundary color to dark black
            dashArray: '4, 4', 
            weight: 1,    // Adjust the dash pattern as needed
            smoothFactor: 0.000001  // Adjust this value for smoother or less smooth curves
        }
    });

    markerHMDAULBs.addLayer(layerHMDAULBs);
    map.addLayer(markerHMDAULBs);
});

// Load GeoJSON data for GHMC_Boundary.geojson
$.getJSON('data/GHMC Boundary.geojson', function (data) {
    layerGHMCBoundary = L.geoJSON(data, {
        onEachFeature: function (feature, layer) {
            // var popupContent = "<b>Name:</b> " + feature.properties.Name;

            // layer.bindPopup(popupContent);
        },
        style: {
            fill: 'Blue',  // No fill
            color: 'Blue',  // Set the boundary color to dark black
            dashArray: '4, 4', 
            weight: 1,    // Adjust the dash pattern as needed
            smoothFactor: 0.000001  // Adjust this value for smoother or less smooth curves
        }
    });

    markerGHMCBoundary.addLayer(layerGHMCBoundary);
    map.addLayer(markerGHMCBoundary);
});

var baseMaps = {
    'OSM': osm,
    'Satellite':satellite,
   
}


// Create an overlay object with the GeoJSON layers
var overlays = {
    "HMDA Boundary": markerHMDABoundary,
    "Telangana Boundary": markerTelanganaBoundary,
    "Layouts": markerLayouts,
    "HMDA ULBs": markerHMDAULBs,
    "GHMC_Boundary": markerGHMCBoundary
};

// Add overlays to the layer control
L.control.layers(baseMaps, overlays, { position: 'topleft' }).addTo(map);




// // Assuming you have a marker cluster group named 'markerLayouts' containing layers with the property 'File Numbe'
// var searchControl = new L.Control.Search({
//     layer: markerLayouts, // Use the marker cluster group for the search control
//     propertyName: 'File Numbe',
  
// });

// map.addControl(searchControl);


var searchControl = new L.Control.Search({
    layer: markerLayouts, // Use the marker cluster group for the search control
    propertyName: 'File Numbe',
    autoCollapse: true, // Automatically collapse the search control after a selection
    autoCollapseTime: 2000, // Auto-collapse after 2 seconds (adjust as needed)
    moveToLocation: function (latlng, title, map) {
        // Customize the behavior when selecting a search result
        map.setView(latlng, 16);
    },
});

map.addControl(searchControl);



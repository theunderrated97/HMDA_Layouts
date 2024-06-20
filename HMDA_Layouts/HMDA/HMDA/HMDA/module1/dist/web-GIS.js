//Full screen map view
var mapId = document.getElementById('map');
function fullScreenView() {
    if (document.fullscreenElement) {
        document.exitFullscreen()
    } else {
        mapId.requestFullscreen();
    }
}

//Leaflet browser print function
L.control.browserPrint({ position: 'topright' }).addTo(map);



//Leaflet measure
L.control.measure({
    primaryLengthUnit: 'kilometers',
    secondaryLengthUnit: 'meter',
    primaryAreaUnit: 'sqmeters',
    secondaryAreaUnit: undefined
}).addTo(map);

//zoom to layer
$('.zoom-to-layer').click(function () {
    map.setView([20.5937, 78.9629], 4)
})






// function onLocationFound(e) {
//     const radius = e.accuracy / 2;

//     const locationMarker = L.marker(e.latlng).addTo(map)
//         .bindPopup(`You are within ${radius} meters from this point`).openPopup();

//     const locationCircle = L.circle(e.latlng, radius).addTo(map);
// }

// function onLocationError(e) {
//     alert(e.message);
// }

// map.on('locationfound', onLocationFound);
// map.on('locationerror', onLocationError);

// map.locate({setView: true, maxZoom: 16});




// Create a custom control with a button


// const locationControl = L.control({ position: 'topleft' });

// locationControl.onAdd = function (map) {
//     const container = L.DomUtil.create('div', 'leaflet-bar leaflet-control');

//     // Create a button with a GPS icon
//     // const button = L.DomUtil.create('a', 'leaflet-control-button');
//     // button.innerHTML = '<img src ="./lib/assets/GPS.png"></i>';
//     // button.href = '#';

//     // Create an image tag with a class for the custom icon
//     const customIcon = L.DomUtil.create('img', 'custom-icon');
//     customIcon.src = './lib/assets/GPS.png';
//     customIcon.alt = 'Custom Icon';
    
//     // Append the custom icon to the button
//     button.appendChild(customIcon);
//     button.href = '#';

//     // Function to handle button click
//     L.DomEvent.on(button, 'click', function () {
//         toggleLocationTracking();
//     });

//     container.appendChild(button);

//     return container;
// };

// locationControl.addTo(map);

// let isLocationTracking = false; // Flag to track whether location tracking is enabled
// let previousZoomLevel; // Variable to store the previous zoom level

// // Function to toggle location tracking
// function toggleLocationTracking() {
//     if (isLocationTracking) {
//         map.stopLocate();
//         isLocationTracking = false;
//         if (previousZoomLevel) {
//             map.setZoom(previousZoomLevel);
//         }
//     } else {
//         previousZoomLevel = map.getZoom();
//         map.locate({ setView: true, maxZoom: 16 });
//         isLocationTracking = true;
//     }
// }

// // Function to handle location found
// function onLocationFound(e) {
//     const radius = e.accuracy / 2;

//     const locationMarker = L.marker(e.latlng).addTo(map)
//         .bindPopup(`You are within ${radius} meters from this point`).openPopup();

//     const locationCircle = L.circle(e.latlng, radius).addTo(map);
// }

// // Function to handle location error
// function onLocationError(e) {
//     alert(e.message);
// }

// // Event listeners for location found and location error
// map.on('locationfound', onLocationFound);
// map.on('locationerror', onLocationError);



//  Location Control with marker

// const locationControl = L.control({ position: 'topleft' });

// locationControl.onAdd = function (map) {
//     const container = L.DomUtil.create('div', 'leaflet-bar leaflet-control');

//     // Create a button with a GPS icon
//     const button = L.DomUtil.create('a', 'leaflet-control-button');
//     button.href = '#';

//     // Create an image tag with a class for the custom icon
//     const customIcon = L.DomUtil.create('img', 'custom-icon');
//     customIcon.src = './lib/assets/GPS.png';
//     customIcon.alt = 'Custom Icon';

//     // Append the custom icon to the button
//     button.appendChild(customIcon);

//     // Function to handle button click
//     L.DomEvent.on(button, 'click', function () {
//         toggleLocationTracking();
//     });

//     container.appendChild(button);

//     return container;
// };

// locationControl.addTo(map);

// let isLocationTracking = false; // Flag to track whether location tracking is enabled
// let previousZoomLevel; // Variable to store the previous zoom level

// // Function to toggle location tracking
// function toggleLocationTracking() {
//     if (isLocationTracking) {
//         map.stopLocate();
//         isLocationTracking = false;
//         if (previousZoomLevel) {
//             map.setZoom(previousZoomLevel);
//         }
//     } else {
//         previousZoomLevel = map.getZoom();
//         map.locate({ setView: true, maxZoom: 16 });
//         isLocationTracking = true;
//     }
// }



// function onLocationFound(e) {
//     const radius = e.accuracy / 2;

//     // Use L.circleMarker instead of L.marker
//     const locationPoint = L.circleMarker(e.latlng, {
//         radius: 8,  // Adjust the radius as needed
//         color: 'blue',  // Set the color of the circle marker
//         fillColor: 'blue',
//         fillOpacity: 1
//     }).addTo(map)
//     .bindPopup(`Accuracy ${radius} meters`).openPopup();

//     const locationCircle = L.circle(e.latlng, radius).addTo(map);
// }


// // Function to handle location error
// function onLocationError(e) {
//     alert(e.message);
// }

// // Event listeners for location found and location error
// map.on('locationfound', onLocationFound);
// map.on('locationerror', onLocationError);




const locationControl = L.control({ position: 'topleft' });

locationControl.onAdd = function (map) {
    const container = L.DomUtil.create('div', 'leaflet-bar leaflet-control');

    // Create a button with a GPS icon
    const button = L.DomUtil.create('a', 'leaflet-control-button');
    button.href = '#';

    // Create an image tag with a class for the custom icon
    const customIcon = L.DomUtil.create('img', 'custom-icon');
    customIcon.src = './lib/assets/GPS.png';
    customIcon.alt = 'Custom Icon';

    // Append the custom icon to the button
    button.appendChild(customIcon);

    // Function to handle button click
    L.DomEvent.on(button, 'click', function () {
        toggleLocationTracking();
    });

    container.appendChild(button);

    return container;
};

locationControl.addTo(map);

let isLocationTracking = false; // Flag to track whether location tracking is enabled
let previousZoomLevel; // Variable to store the previous zoom level
let locationPoint; // Variable to store the location marker

// Function to toggle location tracking
function toggleLocationTracking() {
    if (isLocationTracking) {
        map.stopLocate();
        isLocationTracking = false;
        if (locationPoint) {
            // Remove the location marker if it exists
            map.removeLayer(locationPoint);
            locationPoint = null;
        }
        if (previousZoomLevel) {
            map.setZoom(previousZoomLevel);
        }
    } else {
        previousZoomLevel = map.getZoom();
        map.locate({ setView: true, maxZoom: 16 });
        isLocationTracking = true;
    }
}

// Function to handle location found
function onLocationFound(e) {
    const radius = e.accuracy / 2;

    if (locationPoint) {
        // Update the position of the existing location marker
        locationPoint.setLatLng(e.latlng);
    } else {
        // Create a new location marker if it doesn't exist
        locationPoint = L.circleMarker(e.latlng, {
            radius: 6,  // Adjust the radius as needed
            color: 'Red',  // Set the color of the circle marker
            fillColor: 'Red',
            fillOpacity: 1
        }).addTo(map);
    }

    L.circle(e.latlng, radius).addTo(map);
}

// Function to handle location error
function onLocationError(e) {
    alert(e.message);
}

// Event listeners for location found and location error
map.on('locationfound', onLocationFound);
map.on('locationerror', onLocationError);




//  Legend Control

var markers = [
    
    { category: 'Layouts', icon: L.icon({ iconUrl: './lib/images/Blue.png', iconSize: [18, 18], iconAnchor: [9, 9], popupAnchor: [1, -9] }) },
    
    
];

// Create a rectangle layer


// Create a legend control
var legend = L.control({ position: 'bottomright' });

// Define the legend content dynamically based on markers and rectangle
legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'legend-container');
    div.innerHTML = '<div class="legend-heading"><strong>Legend</strong></div>';

    markers.forEach(function (marker) {
        div.innerHTML += '<p style="margin: 4px 0;"><img src="' + marker.icon.options.iconUrl + '" alt="' + marker.category + '" style="width: 24px; height: 24px;"> ' + marker.category + '</p>';
    });

    // Add rectangle legend
    // div.innerHTML += '<p style="margin: 4px 0;"><svg width="24" height="24"><rect width="24" height="16" style="fill:#FF0000;stroke:#FF0000;stroke-width:2" /></svg> Rectangle</p>';
     
    // Add Polyline to the Legend
    // div.innerHTML += '<p style="margin: 4px 0;"><svg width="24" height="24"><line x1="0" y1="12" x2="24" y2="12" style="stroke:#FF0000;stroke-width:2" /></svg> Real Line</p>';
    
    // Add legend for HMDA ULBs
    div.innerHTML += '<p style="margin: 4px 0;"><svg width="24" height="24"><rect width="24" height="16" style="fill: yellow; stroke: yellow; stroke-width: 2;"/></svg> HMDA ULBs</p>';

    // Add legend for GHMC Boundary
    div.innerHTML += '<p style="margin: 4px 0;"><svg width="24" height="24"><rect width="24" height="16" style="fill: blue; stroke: blue; stroke-width: 2;"/></svg> GHMC Boundary</p>';

    // Add legend for Telangana Boundary
    // div.innerHTML += '<p style="margin: 4px 0;"><svg width="24" height="24"><line x1="0" y1="12" x2="24" y2="12" style="stroke: red; stroke-width: 2" /></svg> Telangana Boundary</p>';

    // Add legend for Dotted line with red color
    div.innerHTML += '<p style="margin: 4px 0;"><svg width="24" height="24"><line x1="0" y1="12" x2="24" y2="12" style="stroke:red;stroke-width:2; stroke-dasharray: 5, 5;" /></svg> Telangana Boundary</p>';

    // Add legend for Dotted line with black color
    div.innerHTML += '<p style="margin: 4px 0;"><svg width="24" height="24"><line x1="0" y1="12" x2="24" y2="12" style="stroke:black;stroke-width:2; stroke-dasharray: 5, 5;" /></svg> HMDA Boundary</p>';

    
    return div;

    
};


// Add legend to the map
legend.addTo(map);

// Add a button to toggle legend visibility
var toggleLegendButton = L.control({ position: 'bottomright' });

toggleLegendButton.onAdd = function (map) {
    var buttonDiv = L.DomUtil.create('div', 'toggle-legend-button');
    buttonDiv.innerHTML = '<button onclick="toggleLegend()" style="padding: 10px; background-color: #4CAF50; color: white; border: none; border-radius: 5px; cursor: pointer;">Legend</button>';
    return buttonDiv;
};

toggleLegendButton.addTo(map);

// Initially hide the legend
var legendContainer = document.querySelector('.legend-container');
legendContainer.style.display = 'none';

// Function to toggle legend visibility
function toggleLegend() {
    if (legendContainer.style.display === 'none' || legendContainer.style.display === '') {
        legendContainer.style.display = 'block';
    } else {
        legendContainer.style.display = 'none';
    }
}




function loadKmlLayer(src, map) {
    var kmlLayer = new google.maps.KmlLayer({
        url: src,
        suppressInfoWindows: true,
        map: map

    });
    kmlLayer.setMap(map);

    kmlLayer.addListener('click', function (kmlEvent) {
        var text = kmlEvent.featureData.description;
        showInContentWindow(text);
        $(".MapInfo").css("visibility", "visible");
        $(".MapInfo").css("display", "block");

    });

    function showInContentWindow(text) {

        // alert(document.getElementsByClassName('MapInfo'));
        // var sidediv = document.getElementById('MapInfo');
        var sidediv = document.getElementsByClassName('MapInfo');
        $(".MapInfo").html(text);
        // sidediv.innerHTML = text;
    }
}

// The whole map
$(document).on("pageshow", "#map1", function () {
    $(".MapInfo").css("display", "none");
    var map = new google.maps.Map(document.getElementById('map'), {
        center: new google.maps.LatLng(1.44023, 103.73526),
        zoom: 2,
        mapTypeId: 'roadmap'
    });
    loadKmlLayer("http://www.chenqiurong.com/a2.kmz", map)
});

// Coastal Trail rendering
$(document).on("pageshow", "#coastalMap", function () {
    $(".MapInfo").css("display", "none");
    var map = new google.maps.Map(document.getElementById('coastalMapDiv'), {
        center: new google.maps.LatLng(1.44023, 103.73526),
        zoom: 2,
        mapTypeId: 'terrain'
    });

    loadKmlLayer("http://www.chenqiurong.com/coastal_trail3.kmz", map)

});

// Migratory Trail rendering
$(document).on("pageshow", "#migratoryMap", function () {
    $(".MapInfo").css("display", "none");
    var map = new google.maps.Map(document.getElementById('migratoryMapDiv'), {
        center: new google.maps.LatLng(1.44023, 103.73526),
        zoom: 2,
        mapTypeId: 'terrain'
    });

    loadKmlLayer("http://www.chenqiurong.com/Migratory_Bird_Trail1.kmz", map)

});

// Forest Trail rendering
$(document).on("pageshow", "#forestMap", function () {
    $(".MapInfo").css("display", "none");
    var map = new google.maps.Map(document.getElementById('forestMapDiv'), {
        center: new google.maps.LatLng(1.44023, 103.73526),
        zoom: 2,
        mapTypeId: 'terrain'
    });

    loadKmlLayer("http://www.chenqiurong.com/Forest_Trail2.kmz", map)

});

// MidCanopy Trail rendering
$(document).on("pageshow", "#midCanopyMap", function () {
    $(".MapInfo").css("display", "none");
    var map = new google.maps.Map(document.getElementById('midCanopyMapDiv'), {
        center: new google.maps.LatLng(1.44023, 103.73526),
        zoom: 4,
        mapTypeId: 'terrain'
    });
    loadKmlLayer("http://www.chenqiurong.com/Mid_Canopy_Walk2.kmz", map)
});


// Rendering Street view for Coastal Bird trail
$(document).on("pageshow", "#coastalMapView", function () {
    var map = new google.maps.Map(document.getElementById('coastalMapViewDiv'), {
        center: new google.maps.LatLng(1.44023, 103.73526),
        zoom: 16,
        mapTypeId: 'terrain'
    });

    loadKmlLayer("http://www.chenqiurong.com/coastal_trail1.kmz", map)

    var panorama = new google.maps.StreetViewPanorama(
        document.getElementById('coastalpano'), {
            position: new google.maps.LatLng(1.44023, 103.73526),
            pov: {
                heading: 34,
                pitch: 10
            }
        });
    map.setStreetView(panorama);
});


// Rendering Street view for migratory Bird trail
$(document).on("pageshow", "#migratoryMapView", function () {
    var map = new google.maps.Map(document.getElementById('migratoryMapViewDiv'), {
        center: new google.maps.LatLng(1.44607, 103.72831),
        zoom: 16,
        mapTypeId: 'terrain'
    });

    loadKmlLayer("http://www.chenqiurong.com/Migratory_Bird_Trail.kmz", map)

    var panorama = new google.maps.StreetViewPanorama(
        document.getElementById('migratorypano'), {
            position: new google.maps.LatLng(1.44607, 103.72831),
            pov: {
                heading: 34,
                pitch: 10
            }
        });
    map.setStreetView(panorama);
});


// Bus Locations
$(document).on("pageshow", "#getthere", function () {
    var map
    map = new google.maps.Map(document.getElementById('getthereMapDiv'), {
        center: new google.maps.LatLng(1.44023, 103.73526),
        zoom: 14,
        mapTypeId: 'roadmap',

    });
    // Create marker
    var marker = new google.maps.Marker({
        map: map,
        position: new google.maps.LatLng(1.44023, 103.73526),
        title: 'Sungei Buloh Radius',
    });

    // Add circle overlay and bind to marker
    var circle = new google.maps.Circle({
        map: map,
        radius: 1000, // 10 miles in metres
        fillColor: '#AA0000'
    });
    circle.bindTo('center', marker, 'position');

    var request = {
        location: new google.maps.LatLng(1.44023, 103.73526),
        radius: 1000,
        types: ['train_station', 'bus_station', 'subway_station', 'transit_station']
    };

    infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);
    service.search(request, callback);

    function callback(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
                createMarker(results[i]);
            }
        }
    }

    function createMarker(place) {

        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location
        });
        var content = '<strong style="font-size:1.2em">' + place.name + '</strong>' +
            '<br/><strong>Latitude:</strong>' + placeLoc.lat() +
            '<br/><strong>Longitude:</strong>' + placeLoc.lng() +
            '<br/><strong>Type:</strong>' + place.types[0] +
            '<br/><strong>Rating:</strong>' + (place.rating || 'n/a');
        var more_content = '<img src="http://googleio2009-map.googlecode.com/svn-history/r2/trunk/app/images/loading.gif"/>';

        //make a request for further details
        service.getDetails({
            reference: place.reference
        }, function (place, status) {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                more_content = '<hr/><strong><a href="' + place.url + '" target="details">Details</a>';

                if (place.website) {
                    more_content += '<br/><br/><strong><a href="' + place.website + '" target="details">' + place.website + '</a>';
                }
            }
        });


        google.maps.event.addListener(marker, 'click', function () {

            infowindow.setContent(content + more_content);
            infowindow.open(map, this);
        });
    }
});


// Food Locations
$(document).on("pageshow", "#hungry", function () {
    var map = new google.maps.Map(document.getElementById('hungryMapDiv'), {
        center: new google.maps.LatLng(1.44023, 103.73526),
        zoom: 14,
        mapTypeId: 'roadmap'
    });

    var request = {
        location: new google.maps.LatLng(1.44023, 103.73526),
        radius: 2300,
        types: ['restaurant']
    };
    infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);
    service.search(request, callback);

    function callback(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
                createMarker(results[i]);
            }
        }
    }

    function createMarker(place) {

        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location,
            icon: 'http://maps.google.com/mapfiles/kml/pal2/icon40.png'
        });
        var content = '<strong style="font-size:1.2em">' + place.name + '</strong>' +
            '<br/><strong>Latitude:</strong>' + placeLoc.lat() +
            '<br/><strong>Longitude:</strong>' + placeLoc.lng() +
            '<br/><strong>Type:</strong>' + place.types[0] +
            '<br/><strong>Rating:</strong>' + (place.rating || 'n/a');
        var more_content = '<img src="http://googleio2009-map.googlecode.com/svn-history/r2/trunk/app/images/loading.gif"/>';

        //make a request for further details
        service.getDetails({
            reference: place.reference
        }, function (place, status) {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                more_content = '<hr/><strong><a href="' + place.url + '" target="details">Details</a>';

                if (place.website) {
                    more_content += '<br/><br/><strong><a href="' + place.website + '" target="details">' + place.website + '</a>';
                }
            }
        });


        google.maps.event.addListener(marker, 'click', function () {

            infowindow.setContent(content + more_content);
            infowindow.open(map, this);
        });

    }
});

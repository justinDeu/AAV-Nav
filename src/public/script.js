var map;
var markers = [];

document.addEventListener('DOMContentLoaded', function() {
    console.log('running script.js');
    if (document.querySelectorAll('#map').length > 0) {
        if (document.querySelector('html').lang)
            lang = document.querySelector('html').lang;
        else
            lang = 'en';

        var js_file = document.createElement('script');
        js_file.type = 'text/javascript';
        var args = 'callback=initMap&key=' + API_KEY
            + '&language=' + lang;
        js_file.src = 'https://maps.googleapis.com/maps/api/js?' + args;
        document.getElementsByTagName('head')[0].appendChild(js_file);
    }
});

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: LATITUDE, lng: LONGITUDE},
        zoom: 16,
        mapTypeId: 'satellite',
        disableDoubleClickZoom: true,
      });

    google.maps.event.addListener(map, 'dblclick', function(event) {
        var lat = event.latLng.lat();
        var lng = event.latLng.lng();

        var marker = new google.maps.Marker({
            position: event.latLng,
            map: map,
            title: markers.length.toString(),
        })

        markers.push(marker);

    });
}


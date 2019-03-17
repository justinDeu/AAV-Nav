var map;

/*const API_KEY = 'AIzaSyB4xyZX5ig0iAYhR1kTT4Ux5Fv-GyXf3DQ';
const LATITUDE = 38.14467800;
const LONGITUDE = -76.42799500;*/

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
      });
}
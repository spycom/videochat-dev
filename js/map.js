var map;
function initialize() {
  var mapOptions = {
    zoom: 1,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  // Try HTML5 geolocation
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = new google.maps.LatLng(position.coords.latitude,
                                       position.coords.longitude);

      var infowindow = new google.maps.InfoWindow({
        map: map,
        position: pos,
        content: "Here you are!"
      });
      


      //var location_array = [london];
      //var location_array = [chicago,anchorage,mexico,equator,london,johannesburg,kinshasa,sydney];

      var coord;
      var markers = [];
      var infowindow = new google.maps.InfoWindow({
            content: "test"
          });

      for (coord in location_array) {
        var marker = new google.maps.Marker({
          map: map,
          position: location_array[coord],
          title: 'All you need is love!'
        });
        markers.push(marker);

      };

      var m;
      var i=0;
      for (m in markers) {

        google.maps.event.addListener(markers[m], 'mouseover', function() {
          infowindow.setContent(rooms[markers.indexOf(this)]);
          //i++;
          infowindow.open(map, this);
        });
        google.maps.event.addListener(markers[m], 'mouseout', function() {
          //var infowindow = new google.maps.InfoWindow({
          //  content: "test"
          //});
          infowindow.close();
        });
        google.maps.event.addListener(markers[m], 'click', function() {
          window.location = "?"+rooms[markers.indexOf(this)];
        });

      };

      /*var marker = new google.maps.Marker({
      position: pos,
      map: map,
      title: 'Thats you!'
      });*/

      

      map.setCenter(pos);
    }, function() {
      handleNoGeolocation(true);
    });
  } else {
    // Browser doesn't support Geolocation
    handleNoGeolocation(false);
  }

}

function handleNoGeolocation(errorFlag) {
  if (errorFlag) {
    var content = 'Error: The Geolocation service failed.';
  } else {
    var content = 'Error: Your browser doesn\'t support geolocation.';
  }

  var options = {
    map: map,
    position: new google.maps.LatLng(0,0),
    content: content
  };

  var infowindow = new google.maps.InfoWindow(options);
  map.setCenter(options.position);
}

google.maps.event.addDomListener(window, 'load', initialize);

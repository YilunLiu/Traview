
GoogleMaps.init(
    {
        'sensor': true, //optional
        'key': 'AIzaSyCpso8Ykkx70Nx1DsqhyYmDQ08Em_i3CA0', //optional
        'language': 'en' //optional
    }, 
    function(){
        var mapOptions = {
            zoom: 13,
            mapTypeId: google.maps.MapTypeId.HYBRID
        };
        map = new google.maps.Map(document.getElementById("googleMap"), mapOptions); 
        var center = new google.maps.LatLng( 32.8801705, -117.232095 );
        map.setCenter(center);
        var marker = new google.maps.Marker({map: map, position: center})
    }
);
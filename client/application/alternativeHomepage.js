Template.alternativeHomepage.rendered = function () {
	GoogleMaps.init(
        {
            'sensor': true, //optional
            'key': 'AIzaSyCpso8Ykkx70Nx1DsqhyYmDQ08Em_i3CA0', //optional
            'language': 'en' //optional
        }, 
        function(){
            var mapOptions = {
                zoom: 13,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                draggable: false,
                zoomControl: false,
                scrollwheel: false,
                disableDoubleClickZoom: false,
                mapTypeControl: false,
                streetViewControl:false,
                scaleControl: false

            };
            map = new google.maps.Map(document.getElementById("googleMap"), mapOptions); 
            var center = new google.maps.LatLng( 32.8801705, -117.232095 );
            map.setCenter(center);

            var markerInfo = Session.get(locationValueKey);
            if (markerInfo){
                var location = new google.maps.LatLng(markerInfo.loc[1],markerInfo.loc[0])
                var infowindow = new google.maps.InfoWindow({
                    content: markerInfo.name
                })
                var marker = new google.maps.Marker({map: map, position: location});
                google.maps.event.addListener(marker, 'click', function(){
                    infowindow.open(map,marker);
                });
                map.setCenter(location);
            }
            geocoder = new google.maps.Geocoder();
        }
    );
};
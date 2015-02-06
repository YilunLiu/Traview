Template.map.rendered = function () {

    GoogleMaps.init(
        {
            'sensor': true, //optional
            'key': 'AIzaSyCpso8Ykkx70Nx1DsqhyYmDQ08Em_i3CA0', //optional
            'language': 'en' //optional
        }, 
        function(){
            var mapOptions = {
                zoom: 13,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            map = new google.maps.Map(document.getElementById("googleMap"), mapOptions); 
            var center = new google.maps.LatLng( 32.8801705, -117.232095 );
            map.setCenter(center);
            marker = new google.maps.Marker({map: map, position: center})
            geocoder = new google.maps.Geocoder();
        }
    );
};

Template.map.events({
    'click #findPlace': function (e, template) {
        var address = $('#addressField').val();
        console.log(address);
        geocoder.geocode( {'address': address}, function(result, status){
            if (status == google.maps.GeocoderStatus.OK){
                map.setCenter(result[0].geometry.location);
                marker.setMap(null);
                marker = new google.maps.Marker({
                    map: map,
                    position: result[0].geometry.location

                });
            } else {
                throwError("Cannot find the address", status);
            }
        })
    }
});
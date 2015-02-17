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
                var location = new google.maps.LatLng(markerInfo.location.k,markerInfo.location.D)
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

Template.map.created = function () {
    var searchResult = {};
    Session.set(searchResultKey, searchResult);

    var errorField = {};
    Session.set(errorFieldKey, errorField);;
};

Template.map.events({
    'click #findPlace': function (e, template) {
        var address = $('#addressField').val();

        if (_.isEmpty(address)){
            var errorField = Session.get(errorFieldKey);
            errorField.addressField = "No address entered";
            Session.set(errorFieldKey, errorField);
            return;
        } else {
            var errorField = Session.get(errorFieldKey);
            Session.set(errorFieldKey, _.omit(errorField,'addressField'), errorField);
        }

        geocoder.geocode( {'address': address}, function(result, status){
            if (status == google.maps.GeocoderStatus.OK){
                map.setCenter(result[0].geometry.location);
                if (marker){
                    marker.setMap(null);
                }
                var marker = new google.maps.Marker({
                    map: map,
                    position: result[0].geometry.location

                });

                var names = result[0].address_components[0].long_name.split(",")

                var infowindow = new google.maps.InfoWindow({
                    content: result[0].formatted_address
                })

                google.maps.event.addListener(marker, 'click', function(){
                    infowindow.open(map,marker);
                });

                var searchResult = {
                    location: result[0].geometry.location,
                    name: names[0]
                }

                Session.setTemp(searchResultKey, searchResult);
                
            } else {
                throwError("Sorry, we are not able to locate", "Did you type it correctly?");
            }
        })
    }
});


Template.map.helpers({
    classError: function (str) {
        return !!Session.get(errorFieldKey)[str] ? 'has-error' : '';
    },
    errorMessage: function(str) {
        return Session.get(errorFieldKey)[str];
    }
});

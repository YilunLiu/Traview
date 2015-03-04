Template.alternativeMap.rendered = function () {

    var searchResult = {};
    Session.set(searchResultKey, searchResult);

    var errorField = {};
    Session.set(errorFieldKey, errorField);;

    Session.set("afterDrag",true);

	GoogleMaps.init(
        {
            'sensor': true, //optional
            'key': 'AIzaSyCpso8Ykkx70Nx1DsqhyYmDQ08Em_i3CA0', //optional
            'language': 'en', //optional
            'libraries':'places'
        }, 
        function(){
            var mapOptions = {
                zoom: 13,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                // draggable: false,
                zoomControl: false,
                scrollwheel: false,
                disableDoubleClickZoom: false,
                mapTypeControl: false,
                streetViewControl:false,
                scaleControl: false

            };
            map = new google.maps.Map(document.getElementById("map"), mapOptions); 
            var center = new google.maps.LatLng( 32.8801705, -117.232095 );
            map.setCenter(center);

            geocoder = new google.maps.Geocoder();

            var input = document.getElementById('mapSearch');
            map.controls[google.maps.ControlPosition.TOP_CENTER].push(input);
            // var buttons = document.getElementById('enterbuttons');
            // map.controls[google.maps.ControlPosition.BOTTOM_LEFT].push(buttons);

            infowindow = new google.maps.InfoWindow();
            infowindow.bindTo('position',map,'center');
            $('<div/>').addClass('centerMarker').appendTo(map.getDiv());

            google.maps.event.addListener(map, 'dragstart', function() {
                infowindow.close();
                Session.set("afterDrag",true);
                $('#enterbuttons').hide();
            })

            google.maps.event.addListener(map, 'idle', function() { 
                if (Session.get('afterDrag')){
                    geocoder.geocode({'latLng': map.getCenter()}, function(results, status) {
                        if (status == google.maps.GeocoderStatus.OK) {
                          if (results[0]) {
                            var names = results[0].formatted_address.split(",")
                            infowindow.setContent(names[0]);
                            infowindow.open(map);

                            var searchResult = {
                                loc: [results[0].geometry.location.D, results[0].geometry.location.k],
                                name: names[0]
                            }
                            Session.setTemp(searchResultKey, searchResult);

                          } else {
                            throwError('No results found');
                          }
                        } else {
                          throwError('Geocoder failed due to: ' + status);
                        }
                    });
                    Session.set('afterDrag',false)
                }
                
                $('#enterbuttons').fadeIn();

            });
            
        }
    );

};

Template.alternativeMap.events({
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

                var names = result[0].address_components[0].long_name.split(",")

                 
                infowindow.setContent(names[0]);
                infowindow.open(map)

                var searchResult = {
                    loc: [result[0].geometry.location.D, result[0].geometry.location.k],
                    name: names[0]
                }

                Session.setTemp(searchResultKey, searchResult);
                Session.set('afterDrag',false);
                
            } else {
                throwError("No such place found","Did you type it correctly?");
            }
        })
    }
})


Template.alternativeMap.helpers({
    classError: function (str) {
        return !!Session.get(errorFieldKey)[str] ? 'error' : '';
    },
    errorMessage: function(str) {
        return Session.get(errorFieldKey)[str];
    }
});

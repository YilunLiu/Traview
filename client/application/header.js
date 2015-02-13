
Template.header.helpers({
	locationName: function () {
		var location = Session.get(locationValueKey);
		if (location){
			return "(at "+location.name+")";
		} else {
			return "";
		}
	},
	changeLocation: function(){
		var location = Session.get(locationValueKey);
		if (location){
			return "Change Location";
		} else {
			return "Set Location"
		}
	}
});

Template.header.events({
	'click a': function () {
		$(".navbar-collapse").collapse('hide');
	}
});
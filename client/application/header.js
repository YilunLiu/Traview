Template.header.rendered = function () {
};

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
	},
	title: function(){
		return Session.get('title');
	}
});

Template.header.events({
	'click a': function () {
		$(".navbar-collapse").collapse('hide');
	},
	'click .content.icon': function(){
		$('.left.sidebar').sidebar('toggle',{left: 'overlay'});
	}
});

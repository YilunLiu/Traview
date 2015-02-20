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
		return "Set Location"
	},
	title: function(){
		return Session.get('title');
	}
});

Template.header.events({
	'click .left': function(){
		$('.left.sidebar').sidebar('toggle',{left: 'overlay'});
	}
});

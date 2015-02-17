Template.menu.helpers({
	randomPictureUrl: function () {
		var picturePath = "/DefaultProfilePicture/"
		var random = Math.floor(Math.random() * 10);
		return picturePath+random+".jpg";
	},
	currentUsername: function () {
		if (Meteor.userId()){
			return Meteor.user().username;
		}
		else {
			return "Traveler"
		}
	},
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

Template.menu.events({
	'click a': function () {
		$('.left.sidebar').sidebar('toggle');
	}
});

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
		if (_.isEmpty(location)){
			return "(at "+location.name+")";
		} else {
			return "";
		}
	},
	changeLocation: function(){
		var location = Session.get(locationValueKey);
		if (_.isEmpty(location)){
			return "Change Location";
		} else {
			return "Set Location"
		}
	},
	hasLocation: function(){
		var location = Session.get(locationValueKey);
		if (_.isEmpty(location)){
			return false;
		} else {
			return true;
		} 
	}
});

Template.menu.events({
	'click a': function () {
		$('.left.sidebar').sidebar('toggle');
	},
	'click .logoutButton' : function() {
		Meteor.logout(function(err){
			if (err){
				throwError(err.reason)
			} else {
				Router.go('home');
			}
		})
	}
});

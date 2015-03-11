Template.menu.rendered = function () {

};

Template.menu.helpers({
	defaultPictureUrl: function () {
		var picturePath = "/DefaultProfilePicture/"
		//var random = Math.floor(Math.random() * 10);
		return picturePath+"profile_default.png";
	},
	userImageObject: function() {
		return ProfileImages.findOne(Meteor.user().profile.image);
	},
	currentUsername: function () {
		if (Meteor.user()){
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
	},
	isActive: function(field){
		var title = Session.get('title');
		return title === field ? 'active' : '';
	}
});

Template.menu.events({
	'click a': function (e,template) {
		$('.left.sidebar').sidebar('toggle');
	},
	'click .logoutButton' : function(e,template) {
		e.preventDefault();
		Meteor.logout(function(err){
			if (err){
				throwError(err.reason)
			} else {
				Router.go('home');
			}
		})
	}
});

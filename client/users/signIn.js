Template.signIn.rendered = function () {
	Session.setTemp('title','Sign In');

	Session.setTemp('errors',{});
};

Template.signIn.events({
	'click .ui.signIn.button': function () {
		var username = $('#usernameField').val();
		var password = $('#passwordField').val();

		var errors = {};

		if (!username){
			errors.username = "Please enter a username";
		}

		if (!password){
			errors.password = "Please enter a password";
		}

		Session.setTemp('errors',errors);

		if (!_.isEmpty(errors)){
			return;
		}

		var previousState = Session.get('previousLocation');
		Meteor.loginWithPassword(username, password, function(err){
			if (err){
				throwError("Sign in failed",err.reason);
			} else {
				var previousState = Session.get('previousLocation');
				if (_.isEmpty(previousState)){
					history.back()
				}
				else{
					Router.go(previousState);
				}
			}
		});
	}
});

Template.signUp.helpers({
	errorClass: function (field) {
		var errors = Session.get('errors');
		if (!errors){
			return '';
		}
		return !!errors[field] ? 'error' : '';
	},
	errorMessage: function(field){
		var errors = Session.get('errors');
		if (!errors){
			return '';
		}
		return !!errors[field] ? errors[field] : '';
	}
});
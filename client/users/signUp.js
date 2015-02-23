Template.signUp.rendered = function () {
	Session.setTemp('title','Sign Up');

	Session.setTemp('errors',{});
};

Template.signUp.events({
	'click .ui.signUp.button': function () {
		var username = $('#usernameField').val();
		var password = $('#passwordField').val();
		var passwordConfirm = $('#passwordConfirm').val();

		var errors = {};

		if (!username){
			errors.username = "Please enter a username";
		}

		if (!password){
			errors.password = "Please enter a password";
		}

		if (!passwordConfirm){
			errors.passwordConfirm = "Please enter a password again";
		}		

		if (passwordConfirm != password){
			errors.passwordConfirm  = "The two passwords don't match";
		}


		Session.setTemp('errors',errors);

		if (!_.isEmpty(errors)){
			return;
		}

		Accounts.createUser({
			username: username,
			password: password,
			profile: {}
		}, function(err){
			if (err){
				throwError(err.reson);
			}
			else {
				Router.go('reviewsList');
			}
		});
		
	},
	'click .ui.cancel.button' : function(e,template){
		Router.go('signIn');
	}
});

Template.signIn.helpers({
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
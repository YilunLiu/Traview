Template.changePassword.rendered = function () {
	Session.set('title', 'Change Password');

	var errors = {};
	Session.setTemp('errors',errors);
};


Template.changePassword.events({
	'click .ui.button': function (e, template) {
		var oldPassword = $('#oldPassword').val();
		var newPassword = $('#newPassword').val();
		var newPasswordConfirm = $('#newPasswordConfirm').val();


		var errors = {};
		if (!oldPassword){
			errors.oldPassword = "Please enter the old password" 
		}

		if (!newPassword){
			errors.newPassword = "Please enter the new password"
		}

		if (!newPasswordConfirm){
			errors.newPasswordConfirm = "Please enter the new password again"
		}

		if (newPasswordConfirm != newPassword){
			errors.newPasswordConfirm = "The two passwords do not match "
		}

		Session.setTemp('errors', errors);
		if (!_.isEmpty(errors)){
			return;
		}

		Accounts.changePassword(oldPassword,newPassword, function(err){
			if (err){
				throwError(err.reason);
			}
		});

	}
});

Template.changePassword.helpers({
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
throwError = function(title, message) {
	var notificationId = Notifications.error(title, message);
	Meteor.setTimeout( function() {
		Notifications.remove({_id: notificationId});
	}, 2000);

}

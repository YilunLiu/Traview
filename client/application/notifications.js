Notifications = new Mongo.Collection(null);

throwError = function(message) { 
	notification = Notifications.insert({message: message});
	Meteor.setTimeout(function(){
		Notifications.remove({});
	},3000)
};

Template.notifications.helpers({
	notifications: function () {
		return Notifications.find();
	}
});
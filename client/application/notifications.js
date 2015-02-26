Notifications = new Mongo.Collection(null);

throwError = function(title, message) { 
	notification = Notifications.insert({type: "negative", title: title, message: message});
	Meteor.setTimeout(function(){
		Notifications.remove({});
	},3000)
};

sendSuccess = function(title, message){
	notification = Notifications.insert({type: "positive", title: title, message: message});
	Meteor.setTimeout(function(){
		Notifications.remove({});
	},3000)
}

Template.notifications.helpers({
	notifications: function () {
		return Notifications.find();
	}
});


Template.notification.helpers({
});
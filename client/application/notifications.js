Notifications = new Mongo.Collection(null);

throwError = function(message) { 
	notification = Notifications.insert({type: "error", message: message});
	Meteor.setTimeout(function(){
		Notifications.remove({});
	},3000)
};

sendSuccess = function(message){
	notification = Notifications.insert({type: "success", message: message});
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
	alertType: function () {
		if (this.type === 'error'){
			return 'alert-danger';
		}
		if (this.type === 'success'){
			return 'alert-success';
		}
	}
});
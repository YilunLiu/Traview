Template.chatsList.helpers({
	chats: function () {
		return Chats.find();
	}
});


Template.chatItem.events({
	'click .Chat': function (event, template) {
		event.preventDefault();
		console.log(event);
		console.log(template);
	}
});
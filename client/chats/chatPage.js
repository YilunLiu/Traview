Template.messageItem.helpers({
	otherMessage: function () {
		return true;
	}
});

Template.chatPage.helpers({
	messages: function(){
		console.log('find');
		return Messages.find();
	}
});
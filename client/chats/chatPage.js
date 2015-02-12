Template.messageItem.helpers({
	otherMessage: function () {
		return true;
	}
});

Template.chatPage.helpers({
	messages: function(){
		return Messages.find();
	}
});

Template.chatPage.rendered = function () {
	$("#message-field").keypress(function(e){
		if (e.keyCode == '13'){
			e.preventDefault();
			sendMessage();
		}
	});
};

Template.chatPage.events({
	'click #send-message-btn': function (e) {
		e.preventDefault();
		sendMessage();
	}	
});

var sendMessage = function(){
	var content = $('#message-field').val();
	if (content){
		var message = {
			content: content,
			timeCreated: new Date(),
			author: Meteor.user().username
		};
		Messages.insert(message);
		$('#message-field').val('');
		window.scrollTo(0,document.body.scrollHeight);
	}
	else{
		return;
	}
}

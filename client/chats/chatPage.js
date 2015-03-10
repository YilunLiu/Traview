Template.messageItem.helpers({
	formatedTimeCreated: function(){
		return formatDate(this.timeCreated);
	}
});

Template.chatPage.helpers({
	messages: function(){
		return this.messages;
	},
	title: function(){
		console.log('yes');
		return Meteor.users.findOne(_.without(this.users, Meteor.userId()).toString()).username;
	}
});




Template.chatPage.rendered = function () {

	$('#header').hide();
	$('ui.fixed.sticky').sticky();
}


Template.chatPage.events({
	'click #send-message-btn': function (e, template) {
		e.preventDefault();
		sendMessage(template.data._id);
	},
	'keypress #message-field': function(e, template){
		if (e.keyCode == '13'){
			e.preventDefault();
			sendMessage(template.data._id);
		}
	},
	'click #backBtn': function(e,template){
		history.back();
		$('#header').show();
	}
});

var sendMessage = function(chatId){
	var content = $('#message-field').val();
	if (content){
		var message = {
			content: content,
			timeCreated: moment().toISOString(),
			author: Meteor.user().username
		};
		insertMessage(message, chatId);
		$('#message-field').val('');

		
	}
	else{
		return;
	}
}


Template.messageItem.rendered = function () {

	window.scrollTo(0,document.body.scrollHeight);

};


Template.chatsList.helpers({
	chats: function () {
		return Chats.find();
	}
});
Template.chatsList.rendered = function(){
	Session.set('title', 'My Chats');
}

Template.chatItem.events({
	'click .Chat': function (event, template) {
		event.preventDefault();
		Router.go('chat',{_id: this._id});
	}
});

Template.chatItem.helpers({
	chatPerson: function() {
		return Meteor.users.findOne(_.without(this.users, Meteor.userId()).toString()).username;
	},
	modifiedLastestMessage: function() {
		if (this.lastestMessage.length > 30){
			return this.lastestMessage.substr(0, 40) + "...";
		} else {
			return this.lastestMessage;
		}
	},
	formatedLastestUpdate: function(){
		return formatDate(this.lastestUpdate);
	}

});
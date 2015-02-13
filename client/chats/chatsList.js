Template.chatsList.helpers({
	chats: function () {
		return Chats.find();
	}
});


Template.chatItem.events({
	'click .Chat': function (event, template) {
		event.preventDefault();
		Router.go('chat',{_id: this._id});
	}
});

Template.chatItem.helpers({
	chatPerson: function() {
		if (this.userA === Meteor.userId()){
			return Meteor.users.findOne(this.userB).username;
		}
		else{
			return Meteor.users.findOne(this.userA).username;
		}
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
Template.chatsList.helpers({
	chats: function () {
		return Chats.find({},{lastestUpdate: -1});
	}
});
Template.chatsList.rendered = function(){
	Session.set('title', 'My Chats');
}

Template.chatItem.events({
	'click .chat': function (event, template) {
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
	},
	imageObject: function(){
		user = Meteor.users.findOne(_.without(this.users, Meteor.userId()).toString());
		return ProfileImages.findOne(user.profile.image);
	}

});

Template.initialChat.rendered = function(){
	// if (!Meteor.userId()){
	// 	return;
	// }

	$('#addChat').modal({
		onApprove: function(){
			var newChatUser = Session.get('newChatUser');
			if (!_.isEmpty(newChatUser)){
				var chat = Chats.findOne({users: {$all: [Meteor.userId(), newChatUser._id]}});
				var chatId;
				if (chat){
					chatId = chat._id;
					Router.go('chat',{_id: chatId});
				} else {
					Meteor.call('createChat', Meteor.userId(), newChatUser._id, function(err, result){
						if (err){
							throwError('Unable to create a chat',err.reason);
						}
						else {
							chatId = Chats.findOne({users: {$all: [Meteor.userId(), newChatUser._id]}})._id;
							Router.go('chat',{_id: chatId});
						}
					});
				}


			}
		}
	});

	Session.setTemp('newChatUser',{});
	var users = Meteor.users.find({_id: {$not: Meteor.userId()}}).fetch();

	// if(users.length < 1){
	// 	return;
	// }

	var source = [];
	for (var i in users){
		var user = users[i];
		source.push({title: user.username});
	}
	// console.log(source);
	$('.ui.users.search').search({
		source: source,
		onSelect: function(result, response){
			var user = Meteor.users.findOne({username: result.title});
			Session.set('newChatUser',user);
		}
	});


	// console.log($('.ui.users.search'));
}

Template.initialChat.helpers({
	newChatUser: function () {
		return Session.get('newChatUser');
	},
	hasNewChatUser: function() {
		var newUser = Session.get('newChatUser');
		return !_.isEmpty(newUser);
	},
	profileImageObject: function() {
		return ProfileImages.findOne(this.profile.image);
	}
});



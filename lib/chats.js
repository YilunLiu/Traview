Chats = new Meteor.Collection('chats');

insertMessage = function(message, chatId){
	Chats.update(chatId, {
		$set: {
			lastestMessage: message.content, 
			lastestUpdate: message.timeCreated
		},
		$push: {
			messages: message
		}
	});
}

Chats.allow({
	insert: function (userId, doc) {
		return userId == doc.userA;
	},
	update: function (userId, doc, fields, modifier){
		//TODO
		return true;
	},
	remove: function (userId, doc) {
		return false
	}
});
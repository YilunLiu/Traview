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
		true
	},
	update: function (userId, doc, fields, modifier){
		//TODO
		return true;
	},
	remove: function (userId, doc) {
		return false
	}
});

Meteor.methods({
	createChat: function (idA, idB){
		check(idA, String);
		check(idB, String);

		if (!Meteor.users.findOne(idA)){
			throw new Meteor.Error('Cannot find userA');
		}

		if (!Meteor.users.findOne(idB)){
			throw new Meteor.Error('Cannot find userB');
		}

		var newChat = {
			users: [ idA, idB],
			messages: [],
			lastestUpdate: "",
			lastestMessage: ""
		};

		Chats.insert(newChat, function(err, result){
			if (err){
				throw err;
			}
			else {
				return result;
			}
		});
	}
})
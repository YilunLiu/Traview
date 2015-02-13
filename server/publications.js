Meteor.publish('reviews',function(){
	return Reviews.find();
})

Meteor.publish('myChats',function(userId){
	return Chats.find({
		$or : [
			{userA: userId},
			{userB: userId}
		]
	}, {
		messages: 0
	});
});

Meteor.publish('oneChat', function(chatId){
	return Chats.find({_id: chatId});
});

Meteor.publish('users',function(){
	return Meteor.users.find({}, {
		emails: 1,
		username: 1
	});
})


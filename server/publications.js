Meteor.publish('reviews',function(){
	return Reviews.find();
})

Meteor.publish('chats',function(){
	return Chats.find();
})

Meteor.publish('messages',function(){
	return Messages.find()
})
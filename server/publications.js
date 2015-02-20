
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


Meteor.publish('reviews', function(loc){
	var distance = 10/3959;
	return Reviews.find({loc: {$geoWithin: {$centerSphere: [[loc[0],loc[1]], distance ]}}});
})

Meteor.publish('oneReview', function(reviewId){
	return Reviews.find({_id: reviewId});
});

Meteor.publish('images', function(){
	return Images.find();
})

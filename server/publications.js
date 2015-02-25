
Meteor.publish('myChats',function(userId){
	return Chats.find({ users: userId
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
	return [Reviews.find({loc: {$geoWithin: {$centerSphere: [[loc[0],loc[1]], distance ]}}}),
			Images.find({"metadata.loc": {$geoWithin: {$centerSphere: [[loc[0],loc[1]], distance ]}}})];
})

Meteor.publish('oneReview', function(reviewId){
	var review = Reviews.findOne(reviewId);
	return [Reviews.find({_id: reviewId}), Images.find({_id: review.image})];
});

Meteor.publish('images', function(){
	return Images.find();
});

Meteor.publish('myReviews', function(userId){
	return Reviews.find({authorId: userId});
})

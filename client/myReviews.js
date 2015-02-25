Template.myReviews.rendered = function () {
	Session.set('title', 'My Reviews');
};

Template.myReviews.helpers({
	username: function () {
		if (Meteor.user()){
			return Meteor.user().username;
		}
	},
	reviewsNumber: function() {
		return Reviews.find().count();
	},
	likesReceived: function() {
		var total = 0;
		var reviews = Reviews.find().fetch();
		for (var i in reviews){
			console.log(reviews[i]);
			total = reviews[i].likes.length + total;
		}
		return total;
	}
});

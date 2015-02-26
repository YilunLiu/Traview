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
			if (reviews[i].likes)
			{
				total = reviews[i].likes.length + total;
			}
		}
		return total;
	},
	myReviews : function() {
		if (Meteor.userId()){
			return Reviews.find({authorId: Meteor.userId()},{sort: {createdTime: -1}});
		}
	}
});

Template.myReview.events({
	'click .myReview': function(e, template){
		e.preventDefault();
		if (e.target.className === "large circular icon trash"){
			return;
		}
		Router.go('review',{_id: this._id});
	},
	'click .trash.icon': function(e, template){
		e.preventDefault();
		// Reviews.remove({_id: this._id});
		$('.basic.modal').modal('show');
		Session.set('deleteReivewId',this._id);
		Session.set('fromReviewPage',false);
	}
})

Template.myReview.helpers({
	modifiedCreatedTime : function(){
		return formatDate(this.createdTime);
	},
	imageObject: function(){
		return Images.findOne(this.image);
	}
})

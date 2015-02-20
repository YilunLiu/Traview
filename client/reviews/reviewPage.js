Template.reviewPage.rendered = function () {
	$('#header').hide();
};

Template.reviewPage.helpers({
	modifiedCreatedTime: function(){
		return formatDate(this.createdTime);
	},
	otherReview: function(){
		return this.authorId != Meteor.userId();
	},
	imageObject: function(){
		return Images.findOne(this.image);
	}
});

Template.reviewPage.events({
	'click #chat-btn': function (e, template) {
		e.preventDefault();
		if(!Meteor.userId()){
			Router.go('/sign-in');
			return;
		}
		var chatId = Chats.findOne({$or: [{userA: this.authorId}, {userB: this.authorId}]})._id;
		Router.go('chat',{_id: chatId});
		$('#header').show();
	},
	'click #backBtn' : function(e, template){
		e.preventDefault();
		Router.go('reviewsList');
		$('#header').show();
	},
	'click .like' : function(e, template){
		$(e.target).find('i').toggleClass('empty');
	}
});


Template.reviewPageRating.rendered = function () {
	this.$('.ui.star.rating').rating({
		initialRating: this.data,
		maxRating: this.data
	});
};
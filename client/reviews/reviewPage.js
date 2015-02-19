Template.reviewPage.rendered = function () {
	$('#header').hide();
};

Template.reviewPage.helpers({
	modifiedCreatedTime: function(){
		return formatDate(this.createdTime);
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
	}
});


Template.reviewPageRating.rendered = function () {
	this.$('.ui.star.rating').rating({
		initialRating: this.data,
		maxRating: this.data
	});
};
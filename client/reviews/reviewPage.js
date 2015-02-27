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
	},
	liked: function() {
		if (!this.likes){
			return 'empty';
		}
		if (this.likes.indexOf(Meteor.userId()) === -1){
			return 'empty';
		}
		else {
			return '';
		}
	},
	likeText: function(){
		if (this.likeNumber === 0){
			return 'like';
		}
		if (this.likeNumber > 1){
			return this.likeNumber + "  likes";
		} else if (this.likeNumber === 1) {
			return this.likeNumber + '  like';
		} 
	}
});

Template.reviewPage.events({
	'click #chat-btn': function (e, template) {
		e.preventDefault();
		if(!Meteor.userId()){
			Router.go('/sign-in');
			return;
		}
		var chat = Chats.findOne({users: {$all: [Meteor.userId(), this.authorId]}});
		var chatId;
		if (chat){
			chatId = chat._id
		} else {
			Meteor.call('createChat', Meteor.userId(), this.authorId, function(err, result){
				console.log(chatId);
				if (err){
					console.log(err);
					throwError('Unable to create a chat');
				}
				else {
					chatId  = result; 
					console.log(result);
				}
			});
		}

		Router.go('chat',{_id: chatId});
		$('#header').show();
	},
	'click #backBtn' : function(e, template){
		e.preventDefault();
		history.back();
		$('#header').show();
	},
	'click .like' : function(e, template){
		if ($(e.target).find('i').hasClass('empty')){
			Reviews.update({_id: this._id}, {$push: {likes: Meteor.userId()}, $inc: {likeNumber: 1}});
		}
		else{
			Reviews.update({_id: this._id}, {$pull: {likes: Meteor.userId()}, $inc: {likeNumber: -1}});
		}
		$(e.target).find('i').toggleClass('empty');

	},
	'click #delete-btn' : function (e,template) {
		Reviews.remove({_id: this._id},function(err){
			if (err){
				throwError(err.reason);
			}
			else {
				history.back();
				$('#header').show();
				sendSuccess('Your review has been deleted');
			}
		})

		e.preventDefault();
		// Reviews.remove({_id: this._id});
		$('.basic.modal').modal('show');
		Session.set('deleteReivewId',this._id);
		Session.set('fromReviewPage', true);


	}
});


Template.reviewPageRating.rendered = function () {
	this.$('.ui.star.rating').rating({
		initialRating: this.data,
		maxRating: this.data
	});
};
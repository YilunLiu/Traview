Template.reviewsList.rendered = function () {
	Session.set('title', 'Read Reviews');

};

Template.reviewItem.helpers({
	modifiedCreatedTime: function () {
		return formatDate(this.createdTime);
	},
	categoryTag: function() {
		return this.category;
	},
	modifiedComment: function() {
		if (this.comment.length > 60){
			return this.comment.substr(0,60)+"..."
		} else if (this.comment.length == 0){
			return "No comment here";
		}
		else{
			return this.comment;
		}
	}
});

Template.reviewItem.events({
	'click .review': function (e, template) {
		e.preventDefault();
		Router.go('review',{_id: this._id});
	}
});



Template.reviewItem.rendered = function () {

	this.$('.ui.star.rating').rating({
		initialRating: this.data.rating,
		maxRating: this.data.rating
	});
	this.$('.ui.star.rating').rating('disable');
};

Template.reviewMenu.rendered = function () {
	this.$('.dropdown').dropdown();
};
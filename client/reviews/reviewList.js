Template.reviewsList.rendered = function () {
	Session.set('title', 'Read Reviews');

};

Template.reviewItem.helpers({
	modifiedCreatedTime: function () {
		return formatDate(this.createdTime);
	},
	categoryTag: function() {
		return this.category;
	}
});

Template.reviewItem.events({
	'click #detailBtn': function (e, template) {
		e.preventDefault();
		Router.go('review',{_id: this._id});
	}
});



Template.reviewItem.rendered = function () {

	this.$('.ui.star.rating').rating({
		rating: 3,
		maxRating: 3
	});
	this.$('ui.star.rating').rating("disbale");
};

Template.reviewMenu.rendered = function () {
	this.$('.dropdown').dropdown();
};
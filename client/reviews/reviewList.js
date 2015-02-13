Template.reviewItem.helpers({
	modifiedCreatedTime: function () {
		return formatDate(this.createdTime);
	}
});

Template.reviewItem.events({
	'click #detailBtn': function (e, template) {
		e.preventDefault();
		Router.go('review',{_id: this._id});
	}
});
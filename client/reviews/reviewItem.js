Template.reviewItem.events({
	'click .btn': function (e) {
		e.preventDefault();
		Router.go('reviewPage');
	}
});
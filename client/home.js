Template.home.events({
	'click #enter': function (e) {
		e.preventDefault();
		Router.go('reviewsList');
	}
});

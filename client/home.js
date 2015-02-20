Template.home.events({
	'click #enter': function (e) {
		e.preventDefault();

		var searchResult = Session.get(searchResultKey);
		if (!_.isEmpty(searchResult)){
			Session.setPersistent(locationValueKey, searchResult);
		} else {
			throwError("Please enter a location and search it :)");
			return ;
		}
		Router.go('reviewsList');
	}
});


Template.home.rendered = function () {
	Session.setTemp('title','Homepage');
};

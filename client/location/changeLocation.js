Template.changeLocation.events({
	'click #changeBtn': function (e) {
		e.preventDefault();

		var searchResult = Session.get(searchResultKey);
		if (!_.isEmpty(searchResult)){
			Session.setPersistent(locationValueKey, searchResult);
		} else {
			throwError("Where are you going, bro?", "Please enter a location and search it :)");
			return ;
		}
		Router.go('reviewsList');

	}
});

Template.changeLocation.helpers({
	changeOrSet: function () {
		if (Session.get(locationValueKey)){
			return "Change";
		}
		else {
			return "Set";
		}
	}
});

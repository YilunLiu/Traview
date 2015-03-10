Template.changeLocation.rendered = function () {
	Session.setTemp('title','Change Location');
};

Template.changeLocation.events({
	'click #changeBtn': function (e) {
		e.preventDefault();

		var searchResult = Session.get(searchResultKey);
		if (!_.isEmpty(searchResult)){
			Session.setPersistent(locationValueKey, searchResult);
		} else {
			throwError("Please enter a location and search it :)");
			return ;
		}

		history.back();
	}
});


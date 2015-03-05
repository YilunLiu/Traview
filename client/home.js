Template.homepage.events({
	'click #enter': function (e) {
		e.preventDefault();

		var duration = moment().diff(Session.get('startTime'),'seconds');
		woopra.track('HomeASuccessfulClick',{
			duration: duration
		})

		var searchResult = Session.get(searchResultKey);
		if (Session.get(locationValueKey)){
			Router.go('reviewsList');
		}
		else if (!_.isEmpty(searchResult)){
			Session.setPersistent(locationValueKey, searchResult);
		} else {
			throwError("Please enter a location and search it :)");
			return ;
		}
		Router.go('reviewsList');
	}
});


Template.homepage.rendered = function () {
	Session.setTemp('title','Homepage');

	Session.set('startTime',moment());
};

Template.home.helpers({
	useAlternative: function(){
		return Math.floor(Math.random() * 2);
	}
})
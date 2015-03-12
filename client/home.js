Template.homepage.events({
	'click #enter': function (e) {
		e.preventDefault();

		var duration = moment().diff(Session.get('startTime'),'seconds');
		woopra.track('HomeASuccessfulClick',{
			duration: duration
		})

		var searchResult = Session.get(searchResultKey);
		if (_.isEmpty(searchResult) || !Session.get(locationValueKey)){

			throwError("Please enter a location and search it :)");
			return ;
		} else {
			Session.setPersistent(locationValueKey, searchResult);
		}
		Router.go('reviewsList');
	}
});

Template.home.events({
	'click #WelcomeImage': function(e,temp){
		e.preventDefault();

		$('#WelcomeImage').fadeOut();
	},
	'click #Introduction1': function(e,temp){
		e.preventDefault();

		$('#Introduction1').fadeOut();
	},
	'click #Introduction2': function(e,temp){
		e.preventDefault();

		$('#Introduction2').fadeOut();
	},
	'click #Introduction3': function(e,temp){
		e.preventDefault();

		$('#Introduction3').fadeOut();
		Meteor.setTimeout(function(){
			Session.setPersistent('notFirstime',true)}
		,3000);
	}

});

Template.home.helpers({
	isFirstTime: function () {
		return !Session.get('notFirstime');
	}
});

Template.homepage.rendered = function () {
	Session.setTemp('title','Homepage');

	Session.set('startTime',moment());
};

Template.home.helpers({
	useAlternative: function(){
		return Math.floor(Math.random() * 2);
	},
	picPath1: function(){
		return "/Introduction//Welcome.png";
	},
	picPath2: function(){
		return "/Introduction//Introduction1.png";
	},
	picPath3: function(){
		return "/Introduction//Introduction2.png";
	},
	picPath4: function(){
		return "/Introduction/Introduction3.png";
	}
})
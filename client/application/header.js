Template.header.rendered = function () {

};

Template.header.helpers({
	locationName: function () {
		var location = Session.get(locationValueKey);
		if (location){
			return "(at "+location.name+")";
		} else {
			return "";
		}
	},
	changeLocation: function(){
		return "Set Location"
	},
	title: function(){
		return Session.get('title');
	},
	isReadReview: function(){
		var title = Session.get('title');
		if (title === "Read Reviews"){
			return true;
		}
		return false;
	},
	isMyChats: function(){
		var title = Session.get('title');
		if (title === "My Chats"){
			return true;
		}
		return false;
	}
});

Template.header.events({
	'click .left': function(e,template){
		e.preventDefault();
		$('.left.sidebar').sidebar('toggle');
	},
	'click .big.write.icon': function(e,template){
		e.preventDefault();
		Router.go('writeReview');
		woopra.track('ClickOnIcon');
	},
	'click #addChatBtn': function(e,template){
		e.preventDefault();
		$('#addChat').modal('show');
	}
});

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
	'click .left': function(){
		$('.left.sidebar').sidebar('toggle',{left: 'overlay'});
	},
	'click .big.write.icon': function(){
		Router.go('writeReview');
	}
});

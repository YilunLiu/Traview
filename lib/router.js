
Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound',
	onBeforeAction: function(){
		this.next();
		return Meteor.subscribe('myChats',Meteor.userId());
	}
});


Router.route('/', {
	template: 'home',
	onAfterAction: function(){
		$(document.body).addClass("animated fadeIn");
	}
});

Router.route('/home', {
	name: 'home',
	template: 'home'
});

Router.route('/writeReview', {
	name: 'writeReview',
	template: 'writeReview',
	onBeforeAction: function(){
		$(document.body).removeClass("animated fadeIn");
		if (! Meteor.userId()) {
			throwError('Login required','You must login to write a review');
		    Router.go('/sign-in')
		} else if (_.isEmpty(Session.get(locationValueKey))) {
		 	throwError("You need set a location first");
		    Router.go('changeLocation')
		} else {
			this.next();
		}
	}
});

Router.route('/contactUs', {
	name: 'contactUs',
	template: 'contactUs'
});

Router.route('/changePassword', {
	name: 'changePassword',
	template: 'changePassword'
});


Router.route('/myReviews', {
	name: 'myReviews',
	template: 'myReviews',
	onBeforeAction: function(){
		if (!Meteor.userId()){
			throwError('You must sign in first');
			Router.go('signIn');
		} else {
			this.next();
			return Meteor.subscribe('myReviews',Meteor.userId());
		}
	}
});

Router.route('/reviewsList',{
	name: 'reviewsList',
	template: 'reviewsList', 
	onBeforeAction: function(){
		$(document.body).removeClass("animated fadeIn");
		var location = Session.get(locationValueKey);
	 	if (_.isEmpty(location)){
	 		throwError("You need set a location first");
	 		Router.go('changeLocation');
	 	} else {
			var location = Session.get(locationValueKey);
	 		this.next();
			return Meteor.subscribe('reviews',location.loc);
	 	}
	 },
	data: function(){
		return {
			reviews: Reviews.find()
		}
	}
})

Router.route('/help',{
	name: 'help',
	template: 'help'
});


Router.route('/review/:_id',{
	name: 'review',
	template: 'reviewPage',
	waitOn: function(){
		return Meteor.subscribe('oneReview', this.params._id)
	},
	data: function(){
		return Reviews.findOne(this.params._id)
	}
});

Router.route('/chat/:_id',{
	name: 'chat',
	template: 'chatPage',
	waitOn: function(){
		return Meteor.subscribe('oneChat',this.params._id);
	},
	data: function() {
		return Chats.findOne(this.params._id);
	}
});

Router.route('/chatsList',{
	name: 'chatsList',
	template: 'chatsList',
	onBeforeAction: function(){
		if (! Meteor.userId()) {
		    this.render('sign-in');
		} else {
		    this.next();
		}
	}
});

Router.route('/changeLocation',{
	name: 'changeLocation',
	template: 'changeLocation'
});

Router.route('/images',{
	name: 'images',
	template: 'images',
	waitOn: function(){
		Meteor.subscribe('images');
	}
});

Router.route('/sign-in', {
	name: 'signIn',
	template: 'signIn'
});

Router.route('/sign-Up',{
	name: 'signUp',
	template: 'signUp'
})

Router.route('/alternativeHomepage',{
	name: 'alternativeHomepage',
	template: 'alternativeHomepage'
})

Router.route('/profileChange',{
	name:'profileChange',
	template: 'profileChange'
})
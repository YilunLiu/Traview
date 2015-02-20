Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound',
	onBeforeAction: function(){
		Meteor.subscribe('users');
		Meteor.subscribe('myChats',Meteor.userId());
		this.next();
	}
})


Router.route('/', {
	template: 'home'
});

Router.route('/home', {
	name: 'home',
	template: 'home'
});

Router.route('/writeReview', {
	name: 'writeReview',
	template: 'writeReview',
	onBeforeAction: function(){
		if (! Meteor.userId()) {
		    this.render('sign-in');
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
	template: 'myReviews'
});

Router.route('/reviewsList',{
	name: 'reviewsList',
	template: 'reviewsList', 
	waitOn: function(){
		return Meteor.subscribe('reviews');
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
		Meteor.subscribe('oneReview', this.params._id)
	},
	data: function(){
		return Reviews.findOne(this.params._id)
	}
});

Router.route('/chat/:_id',{
	name: 'chat',
	template: 'chatPage',
	waitOn: function(){
		Meteor.subscribe('oneChat',this.params._id)
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
})
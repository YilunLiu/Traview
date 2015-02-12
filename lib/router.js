Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound'
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
	template: 'writeReview'
});

Router.route('/contactUs', {
	name: 'contactUs',
	template: 'contactUs'
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

Router.route('/reviewPage',{
	name: 'reviewPage',
	template: 'reviewPage'
});

Router.route('/dashboard',{
	name: 'dashboard',
	template: 'chatsList'
});

Router.route('/chatPage',{
	name: 'chatPage',
	template: 'chatPage',
	waitOn: function(){
		return Meteor.subscribe('messages');
	}
});

Router.route('/chatsList',{
	name: 'chatsList',
	template: 'chatsList',
	waitOn: function(){
		return Meteor.subscribe('chats');
	}
});

Router.route('/changeLocation',{
	name: 'changeLocation',
	template: 'changeLocation'
});
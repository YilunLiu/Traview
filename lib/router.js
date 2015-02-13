Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound',
	waitOn: function(){
		Meteor.subscribe('users');
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
	name: 'chatPage',
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
		AccountsEntry.signInRequired(this);
	},
	waitOn: function(){
		Meteor.subscribe('myChats',Meteor.userId());
	}
});

Router.route('/changeLocation',{
	name: 'changeLocation',
	template: 'changeLocation'
});
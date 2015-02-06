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
	template: 'reviewsList'
})

Router.route('/help',{
	name: 'help',
	template: 'help'
})

Router.route('/reviews',{
	name: 'reviews',
	template: 'reviewPage'
})

Router.route('/dashboard',{
	name: 'dashboard',
	template: 'chatsList'
})

Router.route('/chatPage',{
	name: 'chatPage',
	template: 'chatPage'
})

Router.route('/chatsList',{
	name: 'chatsList',
	template: 'chatsList'
})
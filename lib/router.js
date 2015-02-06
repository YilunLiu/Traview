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
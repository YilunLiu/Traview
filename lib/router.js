Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound'
})


Router.route('/home', {
	template: 'home'
});

Router.route('/writeReview', {
	template: 'writeReview'
});
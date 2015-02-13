Template.writeReview.events({
	'click a': function (e, template) {
		// console.log(e.target.attr('tag'));
		$('#dropdown'+($(e.target).attr('tag'))).text(e.target.text);
	}
});
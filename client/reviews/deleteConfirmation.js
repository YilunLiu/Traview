Template.deleteConfirmation.rendered = function(){
	$('.basic.modal').modal({
		useCSS: true,
		duration: 200,
		onHide: function(){
			Session.set('deleteReivewId','');
			Session.set('fromReviewPage',false);
		},
		onApprove: function() {
			var reviewId = Session.get('deleteReivewId');
			var fromReviewPage = Session.get('fromReviewPage');
			if (reviewId.length > 0){
				Reviews.remove({_id: reviewId}, function(err){
					if (err){
						throwError(err.reason);
					}
					else if (fromReviewPage){
						history.back();
						$('#header').show();
						sendSuccess('Your review has been deleted');
					}
				});
			}
		}
	})
}
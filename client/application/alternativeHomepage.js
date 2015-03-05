Template.alternativeHomepage.rendered = function () {

    $('#header').hide();

    Session.set('startTime',moment());

}

Template.alternativeHomepage.events({
	'click #readReviews': function(e, template){
		e.preventDefault();

		var duration = moment().diff(Session.get('startTime'),'seconds');
		woopra.track('HomeBSuccessfulClick',{
			duration: duration
		})

		if(Template.alternativeHomepage.storeResult()){
			Router.go('reviewsList');
			$('#header').show()
		}
	},
	'click #writeReviews': function(e, template){
		e.preventDefault();

		var duration = moment().diff(Session.get('startTime'),'seconds');
		woopra.track('HomeBSuccessfulClick',{
			duration: duration
		})

		if(Template.alternativeHomepage.storeResult()){
			Router.go('writeReview');

			$('#header').show()
		}
	}
})

Template.alternativeHomepage.storeResult = function(){
	var searchResult = Session.get(searchResultKey);
	if (!_.isEmpty(searchResult)){
		Session.setPersistent(locationValueKey, searchResult);
		console.log(searchResult);
		return true
	} else {
		throwError("No location Set", "Please locate a place and proceed");
		return false ;
	}
}
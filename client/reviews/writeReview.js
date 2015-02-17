Template.rendered = function () {
	errorField = {};
	uploadedFile = {};
	Session.setTemp(errorFieldKey,errorField);
	Session.setTemp(uploadedFileKey,uploadedFile);


};


Template.writeReview.events({
	'click a': function (e, template) {
		// console.log(e.target.attr('tag'));
		$('#dropdown'+($(e.target).attr('tag'))).text(e.target.text);
	},
	'click #postBtn': function (e,template){

		e.preventDefault();

		errorField = {}
		var title = $('#titleField').val();
		var uploadedFile = Session.getTemp(uploadedFileKey);
		var tag1 = $('#tagField1').val();
		var tag2 = $('#tagField2').val();
		var sentenceField1 = $('#sentenceField1').val();
		var sentenceField2 = $('#sentenceField2').val();
		var sentenceField3 = $('#sentenceField3').val();

		if (_.isEmpty(title)){
			errorField.title = "You need a title.";
		}

		if (_.isEmpty(uploadedFile)){
			errorField.picture = "How about a picture?";
		}

		if (_.isEmpty(tag1) && _.isEmpty(tag2)){
			errorField.tag = "Give us a tag";
		}


	}
});
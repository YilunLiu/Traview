Template.writeReview.rendered = function () {
	errorField = {};
	uploadedFile = {};
	Session.setTemp(errorFieldKey,errorField);
	Session.setTemp(uploadedFileKey,uploadedFile);
	Session.setTemp('tags', []);
	Session.setTemp('errors',{});
	Session.setTemp('title',"Write a Review");

	Template.writeReview.uploadedFile = {};

	Session.setTemp('title','Write a Review');

	this.$('.category2').hide();
	this.$('.category3').hide();

	this.$('.ui.dropdown').dropdown({
		onChange: function(value, text, choice){
			$('[name=comment]').attr('placeholder','Your Feelings About The '+value);
		}
	});
	this.$('.ui.star.rating').rating();
};

Template.writeReview.addTag = function(name){
	var tags = Session.get('tags');
	if (tags.length >= 2){
		throwError("At most two tags");
		return;
	}
	tags.push(name);
	Session.setTemp('tags',tags);
	$('#tag-field').val('');
}

Template.writeReview.events({
	'click .add.icon': function(e, template){
		e.preventDefault();
		console.log(template);
		Template.writeReview.addTag($('#tag-field').val());
	},
	'keypress #tag-field': function(e, template){
		if (e.keyCode == '13'){
			e.preventDefault();
			Template.writeReview.addTag($('#tag-field').val());
		}
	},
	'change #file': function(e, template){
		e.preventDefault();
		var chooseBtn = $('.ui.icon.button.choose');
		var appendText = "";
		if (e.target.files.length != 0){
			appendText = " (" + e.target.files.length + " file is chosen)"
		}
		chooseBtn.html(" <i class='file icon'></i> Choose A Picture" + appendText);

	},
	'click .ui.button.upload': function(e, template){
		e.preventDefault();
		var uploadedFile = Template.writeReview.uploadedFile;
		if (_.isEmpty(uploadedFile)){		
			var file = $('#file')[0].files[0];
			if (!file){
				throwError('Please select a picture to upload');
				return;
				
			} else{
				var newFile = new FS.File(file);
				var location = Session.get(locationValueKey);

				newFile.metadata = {owner: Meteor.userId(), loc: location.loc};
				Images.insert(newFile, function(err, fileObj){
					if (err) {
						throwError("Upload image unsuccessfully");
						return;
					}
					Template.writeReview.uploadedFile = fileObj;
					sendSuccess("Picture Uploaded");
					$(e.target).text('Cancel');
				});
			}
		} else {
			Template.writeReview.uploadedFile = {};
			Images.remove({_id: uploadedFile._id});
			$(e.target).text('Upload');
			
		}
	},
	'click #review-submit': function(e,template){
		var title = $('#title-field').val();
		var category = $('.ui.selection.dropdown').dropdown('get value');
		var rating = $('.ui.star.rating').rating('get rating');
		var comment = $('textarea').val();
		var tags = Session.get('tags');
		var file = Template.writeReview.uploadedFile;
		var location = Session.get(locationValueKey);

		if (_.isEmpty(location)){
			throwError("You need to set a location first");
			Router.go('changeLocation');
			return;
		}

		var errors = {};
		if (!title){
			errors.title= "Type a title here";
		}
		if (!category){
			errors.category = "Choose a category here";
		}
		if (!rating){
			errors.rating = "Choose a rating here";
		}
		if (!comment){
			errors.comment = "Type some comment here";
		}
		if (_.isEmpty(file)){
			errors.file = "Upload file here";
		}

		console.log(errors);

		if (!_.isEmpty(errors)){
			Session.setTemp('errors',errors);
			throwError("Found empty fields in the post");
			return;
		}


		review = {
			author: Meteor.user().username,
			authorId: Meteor.userId(),
			createdTime: moment().toISOString(),
			loc: location.loc,
			title: title,
			category: category,
			rating: rating,
			comment: comment,
			tags: tags,
			image: file._id,
			likes: [],
			likeNumber: 0

		};

		Reviews.insert(review, function(err, reviewId){
			if (err){
				throwError("Insert failed: "+ err);
			} 
			else {
				Meteor.users.update(
					{_id: Meteor.userId()}, 
					{$push: {"profile.reviews": reviewId}}
				);
				Router.go('reviewsList');
			}

		});

	},
	'click #changeLocationBtn': function(e, template){
		Router.go('changeLocation');
	}
});

Template.writeReview.helpers({
	categoryNumber: function () {
		var categoryNumber = Session.get("categoryNumber");
		var numbers = [];
		for (var i = 1; i<=categoryNumber; i++){
			numbers.push(i);
		}
		return numbers;
	},
	tags: function() {
		return Session.get('tags');
	},
	errorClass: function(field){
		if (!Session.get('errors')){
			return '';
		}

		return !!Session.get('errors')[field] ? 'error' : '';
	},
	currentLocation: function(){
		return Session.get(locationValueKey).name;
	}
});

Template.tag.events({
	'click .delete.icon': function (e, template) {
		var tags = Session.get('tags');
		var index = tags.indexOf(template.data);
		if (index > -1){
			tags.splice(index,1);
		}
		Session.setTemp('tags', tags);

	}
});

Template.categoryInput.rendered = function () {
	this.$('.ui.dropdown').dropdown({
		onChange: function(value, text, choice){
			$('[name=comment]').attr('placeholder','Your Feelings About The '+value);
		}
	});
	this.$('.ui.star.rating').rating();
};

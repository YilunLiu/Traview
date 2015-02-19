Template.writeReview.rendered = function () {
	errorField = {};
	uploadedFile = {};
	Session.setTemp(errorFieldKey,errorField);
	Session.setTemp(uploadedFileKey,uploadedFile);
	Session.setTemp('tags', []);
	Session.setTemp('error',{});

	Template.writeReview.uploadedFile = {};

	Session.setTemp('title','Write A Review');

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
	tags.push({tag: name});
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
				newFile.metadata = {owner: Meteor.userId()};
				Images.insert(newFile, function(err, fileObj){
					if (err) {
						throwError("Upload image unsuccessfully");
						return;
					}
					Template.writeReview.uploadedFile = fileObj;
					throwError("upload successfully(need change color)");
					console.log(e);
					$(e.target).text('Cancel');
				});
			}
		} else {
			Template.writeReview.uploadedFile = {};
			Images.remove({_id: uploadedFile._id});
			$(e.target).text('Upload');
			
		}
	},
	'click submit': function(e,template){
		//TODO
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
	}
});

Template.tag.events({
	'click .delete.icon': function (e, template) {
		console.log(e);
		console.log(template);
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

Template.writeReview.rendered = function () {
	errorField = {};
	uploadedFile = {};
	Session.setTemp(errorFieldKey,errorField);
	Session.setTemp(uploadedFileKey,uploadedFile);
	Session.setTemp('categoryNumber',1);
	Session.setTemp('tags', []);

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

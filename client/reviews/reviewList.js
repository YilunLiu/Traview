Template.reviewsList.rendered = function () {
	Session.set('title', 'Read Reviews');
	Session.set('sort','Oldest');
	Session.set('category','All');
};

Template.reviewsList.helpers({
	sortedFilteredReviews: function () {
		var sort = Session.get('sort');
		var category = Session.get('category');

		var filter;
		if (category == "All"){
			filter = {};
		} else {
			filter = {category : category};
		}



		var sortOrder;
		if (sort === 'Oldest'){
			sortOrder = {createdTime : 1};
		} else if (sort === 'Most Recent'){
			sortOrder = {createdTime : -1};
		} else if (sort === 'Highest Rating'){
			sortOrder = {rating: -1};
		} else if (sort === 'Lowest Rating'){
			sortOrder = {rating: 1};
		}

		return Reviews.find(filter, {sort: sortOrder});
	}
});

Template.reviewItem.helpers({
	modifiedCreatedTime: function () {
		return formatDate(this.createdTime);
	},
	categoryTag: function() {
		return this.category;
	},
	modifiedComment: function() {
		if (this.comment.length > 60){
			return this.comment.substr(0,60)+"..."
		} else if (this.comment.length == 0){
			return "No comment here";
		}
		else{
			return this.comment;
		}
	},
	imageFile: function(){
		return Images.findOne(this.image);
	}
});

Template.reviewItem.events({
	'click .review': function (e, template) {
		e.preventDefault();
		Router.go('review',{_id: this._id});
	}
});




Template.reviewItem.rendered = function () {

	this.$('.ui.star.rating').rating({
		initialRating: this.data.rating,
		maxRating: this.data.rating
	});
	this.$('.ui.star.rating').rating('disable');
};

Template.reviewMenu.rendered = function () {
	this.$('.dropdown').dropdown();
	this.$('.category .dropdown').dropdown({
		onChange: function(val,text){
			Session.set('category',text);
		}
	});
	this.$('.sort .dropdown').dropdown({
		onChange: function(val,text){
			Session.set('sort',text);
		}
	});
};
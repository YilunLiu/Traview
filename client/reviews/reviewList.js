Template.reviewsList.rendered = function () {
	Session.set('title', 'Read Reviews');




	if (!Session.get('sort')){
		Session.set('sort','Most Popular');
	}
	if (!Session.get('category')){
		Session.set('category','All');
	}
	if (!Session.get('reviewsLimit')){
		Session.set('reviewsLimit',10);
	}


};

Template.reviewsList.events({
	"click .loadMore": function(e,template){
		e.preventDefault();
		var limit = Session.get('reviewsLimit');
		limit = limit + 10;
		Session.set('reviewsLimit',limit);
	}
})

Template.reviewsList.helpers({
	sortedFilteredReviews: function () {
		var sort = Session.get('sort');
		var category = Session.get('category');
		var limit = Session.get('reviewsLimit');
		var location = Session.get(locationValueKey);
		var distance = 10000;

		

		if (category == "All"){
			filter = {loc:{$near:[location.loc[0], location.loc[1]], $maxDistance:distance}};
		}
		else {
			filter = {loc:{$near:[location.loc[0], location.loc[1]], $maxDistance:distance}, category: category};
		}

		var sortOrder;
		if (sort === 'Oldest'){
			sortOrder = {createdTime : 1};
		} else if (sort === 'Most Recent'){
			sortOrder = {createdTime : -1};
		} else if (sort === 'Highest Rating'){
			sortOrder = {rating: -1, createdTime : -1};
		} else if (sort === 'Lowest Rating'){
			sortOrder = {rating: 1, createdTime : -1};
		} else if (sort === 'Most Popular'){
			sortOrder = {likeNumber: -1, createdTime : -1};
		}

		var reviews = Reviews.find(filter, {sort: sortOrder});
		Session.set('reviewNumber',reviews.count());

		return Reviews.find(filter, {sort: sortOrder, limit:limit});
	},
	hasMore : function (){
		var limit = Session.get('reviewsLimit');
		var reviewNumber = Session.get('reviewNumber');
		return limit < reviewNumber;
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
		if (this.comment.length > 50){
			return this.comment.substr(0,50)+"..."
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
	this.$('.category .dropdown').dropdown("set text", Session.get('category')).dropdown({
		onChange: function(val,text){
			Session.set('category',text);
		}
	});
	this.$('.sort .dropdown').dropdown("set text", Session.get('sort')).dropdown({
		onChange: function(val,text){
			Session.set('sort',text);
		}
	});
};

Template.reviewTag.helpers({
	randomColor: function () {
		var colors = ['teal','blue',''];
		var randomNumber = Math.floor(Math.random()*3);
		return colors[randomNumber];
	}
});
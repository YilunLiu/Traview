Template.reviewPage.helpers({
	sentencesArray: function () {
		var sentencesArray = [];
		for (var key in this.sentences ){
			var sentence = {
				key : key,
				content: this.sentences[key]
			}
			sentencesArray.push(sentence);
		}
		return sentencesArray;
	},
	getTags: function(){
		var tagsArray = [];
		for (var i in this.tags){
			tagsArray.push(this.tags[i]);
		}
		return tagsArray.join(' ');
	}
});

Template.reviewPage.events({
	'click button': function (e, template) {
		e.preventDefault();

		Chats.findOne({$or: [{userA: this.authorId}, {userB: this.authorId}]});
	}
});
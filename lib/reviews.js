Reviews = new Mongo.Collection('reviews');

Reviews.allow({
	insert: function (userId, doc) {
		return true;
	},
	update: function (userId, doc, fields, modifier) {
		if (doc.authorId === userId){
				return true;
		} 
		else{
			return _.isEmpty(_.without(fields, 'likes','likeNumber'));
		}
	},
	remove: function (userId, doc) {
		return doc.authorId === userId;
	}
});

reviews = 	[
	{
		"title": "Awesome Trip",
		"authorId": "",
		"category": "Food",
		"imageUrl": "http://www.yosemitebestwestern.com/images/upper_yosemite_falls_2_o.jpg",
		"tags":["Pretty","Beautiful"],
		"comment": "I love this amazing National Parck buitiful especially glacier point",
		"rating": 5
	},
	{
		"title": "No winter travel",
		"authorId": "",
		"category": "Transportation",
		"imageUrl": "http://www.frozy.net/wp-content/uploads/2012/07/Yosemite-Valley-snow.jpg",
		"tags":["Cold","Dangerous"],
		"comment": "Nope; not for me.  2½ hours each way not counting traffic jams.  You generally take CA-99.   I went on Monday, Oct 6th '14.  Yosemite Valley is a ten mile slot with two service roads blasted between the granite",
		"rating": 5
	},
	{
		"title": "Good in Spring",
		"authorId": "",
		"category": "Food",
		"imageUrl": "http://familyspice.com/fs_photos/other%20photos/yosemite_2011/tioga_lunch/tioga_lunch_1.jpg",
		"tags":["WonderGoAgain","Beautiful"],
		"comment": "We loved Yosemite National Park!  Be warned, it's a long drive to El Capitan and the great views, however it's definitely worth it.",
		"rating": 5
	},
		{
		"title": "High School Field Trip ",
		"authorId": "",
		"category": "Scenery",
		"imageUrl": "http://cache.graphicslib.viator.com/graphicslib/thumbs674x446/2402/SITours/yosemite-national-park-and-giant-sequoias-trip-in-san-francisco-117263.jpg",
		"tags":["Fun","Camp"],
		"comment": "An absolute must for any visit to California. Breathtaking views and scenery. Would definitely recommend renting a raf",
		"rating": 5
	}
];
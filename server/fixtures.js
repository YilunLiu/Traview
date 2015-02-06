if (Reviews.find().count() === 0) {
	for (var i = 0; i < 10; i++){

		var review = {
			sentenceOne: "Travel to Yosimite "+i,
			author: "luckman"
		};
		Reviews.insert(review);
	}
}
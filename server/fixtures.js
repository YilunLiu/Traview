if (Reviews.find().count() === 0) {
	for (var i = 0; i < 10; i++){

		var review = {
			sentenceOne: "Travel to Yosimite "+i,
			author: "luckman"
		};
		Reviews.insert(review);
	}
}

if (Chats.find().count() === 0){
	for (var i = 0; i < 10; i++){

		var chat = {
			toName: "toMe",
			lastestMessage: "How are you?",
			lastUpdate: "12:30pm"
		}
		Chats.insert(chat);
	}
}
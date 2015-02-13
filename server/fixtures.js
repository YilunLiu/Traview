if (Meteor.users.find().count() === 0){

	var userFrodo = {
		username: "Frodo",
		email: "Frodo@ucsd.edu",
		password: "lordofring"
	};

	var FrodoId = Accounts.createUser(userFrodo);

	var userAragorn = {
		username: "Aragon",
		email: "Aragon@ucsd.edu",
		password: "lordofring"
	};
	var AragornId = Accounts.createUser(userAragorn);


	var chat = {
		userA: FrodoId,
		userB: AragornId,
		messages: [],
		lastestUpdate: "",
		lastestMessage: ""
	}

	var chatId = Chats.insert(chat);


	var message = {
		author: "Aragon",
		content: "Hello",
		timeCreated: moment().subtract(1,'months').toISOString()
	}
	insertMessage(message,chatId);

	var message = {
		author: "Frodo",
		content: "Hello",
		timeCreated: moment().subtract(10,'days').toISOString()
	}
	insertMessage(message,chatId);

	var message = {
		author: "Aragon",
		content: "Did you get the ring?",
		timeCreated: moment().subtract(7,'days').toISOString()
	}
	insertMessage(message,chatId);

	var message = {
		author: "Aragon",
		content: "It's very important.",
		timeCreated: moment().subtract(7,'days').toISOString()
	}
	insertMessage(message,chatId);

	var message = {
		author: "Frodo",
		content: "Yes. I got it",
		timeCreated: moment().subtract(3,'days').toISOString()
	}
	insertMessage(message,chatId);

	var message = {
		author: "Aragon",
		content: "Where are you now?",
		timeCreated: moment().subtract(1,'days').toISOString()
	}
	insertMessage(message,chatId);

	var message = {
		author: "Frodo",
		content: "Can you verify who you are?",
		timeCreated: moment().subtract(1,'hours').toISOString()
	}
	insertMessage(message,chatId);

	var message = {
		author: "Aragon",
		content: "Aragorn II, son of Arathorn is a fictional character from J. R. R. Tolkien's legendarium. He is one of the protagonists of The Lord of the Rings. Aragorn was a Ranger of the North, first introduced with the name Strider at Bree, as the Hobbits continued to call him throughout The Lord of the Rings. He was eventually discovered to be the heir of Isildur and rightful claimant to the thrones of Arnor and Gondor. He was also a confidant of Gandalf and an integral part of the quest to destroy the One Ring and defeat the Dark Lord Sauron.",
		timeCreated: moment().subtract(2,'minutes').toISOString()
	}
	insertMessage(message,chatId);
}
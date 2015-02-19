Images = new FS.Collection("images",{
    stores: [new FS.Store.GridFS("images")],
    filter: {
    	allow: {
    		contentTypes: ['image/*'],
    		extensions: ['png', 'PNG', 'jpg', 'JPG', 'jpeg', 'JPEG']
    	}
    }
});

Images.allow({
	insert: function (userId, doc) {
		return true;
	},
	update: function (userId, doc, fields, modifier) {
		return false;
	},
	remove: function (userId, doc) {
		return userId === doc.owner;
	},
	download: function(userId){
		return true;
	}
});
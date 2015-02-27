ProfileImages = new FS.Collection("profileImages",{
    stores: [new FS.Store.GridFS("profileImages")],
    filter: {
    	allow: {
    		contentTypes: ['image/*'],
    		extensions: ['png', 'PNG', 'jpg', 'JPG', 'jpeg', 'JPEG']
    	}
    }
});

ProfileImages.allow({
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
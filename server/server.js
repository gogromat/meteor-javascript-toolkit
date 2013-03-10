//Meteor.startup(function () {
//});

Meteor.publish('users', function () {
	return getUsers;
});

Meteor.publish('nodes', function () {
	return Nodes.find({});
});


//Meteor.users.update( {_id:Meteor.user()._id}, {profile:{"stuff":true}});
Meteor.users.deny({
	update: function () { 
		return true; 
	},
	// allow for now
	insert: function () {
		return true;
	},
	remove: function () {
		return true;
	}
});



function getUsers() {
	return Meteor.users.find({},{fields: {emails: 1}});
}
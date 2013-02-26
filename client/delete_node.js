Template.delete_node.events({

	'dblclick #delete_node': function(evt) {
    console.log('This id is:', this._id);
    Meteor.call("remove_node", this._id);
	}

});
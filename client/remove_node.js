Template.remove_node.events({

	'dblclick #remove_node': function(evt) {
    console.log('This id is:', this._id);
    Meteor.call("remove_node", this._id);
	}

});
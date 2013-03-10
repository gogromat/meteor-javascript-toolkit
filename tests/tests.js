describe('Chai & Mocha', function() {
	it('should work together', function() {
		chai.assert.equal(10, 10);
	});
});



describe('Nodes', function() {
  
  describe('add_new_node', function() {

	var new_node 		 = {name:'', url:'', description:'', owner: Meteor.userId()};
	new_node.name 		 = "Test node names";
	new_node.url  		 = "Test node url";
	new_node.description = "Test node description";
	/*
    it('should add new node', function() {
    	Meteor.call("add_new_node", new_node, function (error, result) {
		    var node = Nodes.findOne({name: new_node.name});
	        chai.assert.equal(new_node.name, 		node.name);
	        chai.assert.equal(new_node.url, 		node.url);
	        chai.assert.equal(new_node.description, node.description);
    	});
    });


    it('should remove new node', function () {
	    var nodeOld = Nodes.findOne({name: new_node.name});
        Meteor.call("remove_node", nodeOld._id);
		var node2   = Nodes.findOne({name: new_node.name});
        chai.assert.isUndefined(node2);
    });
	*/

  });

});
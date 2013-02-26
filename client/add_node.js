Template.add_node.events({

	'click #add_new_node': function(evt) {

							 // Enter
      if (evt.which === 1 || evt.which === 13) {

  	    var new_name = $("#new_node_name"), 
            name     = new_name.val().trim(),
            new_url  = $("#new_node_url"),
            url      = new_url.val().trim(),
            new_image= $("#new_node_image_url"),
            image    = new_image.val().trim(),
            new_description = $("#new_node_description"),
            description     = new_description.val().trim(),
            new_node_item   = {name:'',url:'',description:'',owner: Meteor.userId()};  	

        if (name === "" || url === "") {
          return false;
        }
        
        new_node_item.name = name;
        new_node_item.url  = url;
        
        if (image !== "") {
          new_node_item.image = image;
        }
        if (description !== "") {
          new_node_item.description = description;
        }

        console.log("Meteor.call(add_new_node)");
        Meteor.call("add_new_node", new_node_item);

        new_name.val("");
        new_url.val("");
        new_image.val("");
        new_description.val("");

      }
	}

});
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
            new_node_item   = {name:'', url:'', description:'', owner: Meteor.userId()};  	

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

        Meteor.call("add_new_node", new_node_item);

        new_name.val("");
        new_url.val("");
        new_image.val("");
        new_description.val("");
      }
	},
  'click #add_new_image_div' : function () {
    activate_filepicker_for("adding");
  }
  /*
  'change #filepicker-attachment': function (evt) {
    console.log("Event: ", evt, evt.fpfile, evt.fpfile.url);
    //var image = document.getElementById("attachment");
    //console.log(image, image.value, image.files);
    //console.log(image.fpfile, JSON.stringify(image.fpfile) );
    //Meteor.call('save_to_filepicker');
    if (Session.equals('isChangingImage', true) ) {
      
      Session.set('isChangingImage', false);
    } else {
      add_image_div(evt.target, evt.fpfile.url);
      $("#new_node_image_url").val(evt.fpfile.url);
    }
  }*/
});

//Template.add_node.helpers({
  //'get_new_nodes_id': function() {
  //  return Nodes._makeNewID();
  //}
//});


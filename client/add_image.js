Template.add_image.helpers({
  adding_image: function () {
    return Session.get('isAddingImage');
  },
  inserting_image: function () {
  	return (Session.get('isAddingImage') || Session.get('isChangingImage'));
  }
});

Template.add_image.events({

  //ADD IMAGE
  'change #filepicker-attachment': function (evt) {
    add_image_div(evt.target, evt.fpfile.url);
    $("#node_image_url").val(evt.fpfile.url);
    
    // show button
    $("#add_image_success").show();
  },

  //SUCCESS
  'click #add_image_success': function () {

  	var new_image_url 	= $("#node_image_url").val(),
  		currentNodeId 	= Session.get('currentNodeId'),
  		isChangingImage = Session.get('isChangingImage');

  	// If we are changing existing node
  	if (currentNodeId && isChangingImage) {
  		Meteor.call('change_node_image_url', currentNodeId, new_image_url);
  	// If this is a new node
  	} else {
  		$("#new_node_image_url").val(new_image_url);
  	}
  	reset_image_div();
  },
  
  // CANCEL
  'click #add_image_close, click #add_image_cancel' : function () {
  	reset_image_div();
  }


  //'change #add_image_input': function (evt) {
  //	console.log('changed');
  //    var name = $('#new_node_id').val();
  //    uploadImage(name, evt.target.files[0]);
  //},
  //'change #add_node_image_url': function(evt) {
  //	console.log('changed');
  //  var name = $('#new_node_id').val();
  //  uploadImage(name, $.trim($(evt.target).val()) );
  //},
});


function reset_image_div() {
  	Session.set('isAddingImage', 	false);
  	Session.set('isChangingImage', 	false);
  	Session.set('currentNodeId',	null);
  	$("#node_image_url").val("");
  	// hide button
    $("#add_image_success").hide();
}

function add_image_div(target, image_url) {
  if (image_url) {  
    $(target).after(
      "<br>" +
      "<div id='node-image-preview-div' class='well'>"+
           "<h5>Image Preview</h5>"+
           "<img src='" + image_url + "' id='node_image_preview'>"+
      "</div>");
  } else {
    $('#new_node_image_preview').remove();
  }
}

/*
function uploadImage(name, source, callback, options) {
	var options = options || {maxWidth: 96, maxHeight: 96, canvas: true};
  	var callback = callback ||  function (canvas) {

	    if(canvas.type === "error") {

	      console.log("Error loading image " + source);

	    } else {

	      console.log(canvas);

	      $(canvas).attr('id','add_image_result');
	      
	      $("#add_image_upload").html(canvas);
	      $("#add_image_success").css("display","block");

	      if (canvas.toBlob) {
	        
	          canvas.toBlob(
	              function (newBlob) {
	                //expect(newBlob.type).to.be('image/png');

	                console.log(newBlob, newBlob.type);

	                
	                //Meteor.saveFile(file, file.name);
	                //Meteor.saveFile(newBlob, name + ".png");
	              },
	              'image/png'
	          );
	        
	      }
	    }
	};
  window.loadImage(source, callback, options);
  //   $("#node-image-upload").append('<canvas id="resized" ></canvas>');
  //   var resized = new obscura('#node_image_result','#resized').resize(96, keepProportions=true).save();
}*/
Meteor.subscribe('users');
Meteor.subscribe('nodes');

Session.set('isAddingImage',   false);
Session.set('isChangingImage', false);
Session.set('currentNodeId',   null);


Meteor.startup(function() {
  filepicker.setKey("AtDeeAp04RPirFBkQCjWez");
});


Template.nodes.helpers({
  nodes: function () {
    return Nodes.find({});
  },
  isClientOwner: function () {
    return isOwner(this.owner);
  }
});

Template.nodes.events({
  'blur .owner_node_description': function(evt) {
    var new_description = $(evt.target).html().trim();
    if (this.description !== new_description) {
      Meteor.call('change_node_description', 
                  this._id, new_description);
    }
  },
  'click .owner_node_image_change': function(evt) {
    Session.set('currentNodeId',     this._id);
    activate_filepicker_for("changing");
  }
});


/**
 * @blob (https://developer.mozilla.org/en-US/docs/DOM/Blob)
 * @name the file's name
 * @type the file's type: binary, text (https://developer.mozilla.org/en-US/docs/DOM/FileReader#Methods) 
 *
 * TODO Support other encodings: https://developer.mozilla.org/en-US/docs/DOM/FileReader#Methods
 * ArrayBuffer / DataURL (base64)
 */
/*
Meteor.saveFile = function(blob, name, path, type, callback) {
  var fileReader = new FileReader(),
    method, encoding = 'binary', type = type || 'binary';
  switch (type) {
    case 'text':
      // TODO Is this needed? If we're uploading content from file, yes, but if it's from an input/textarea I think not...
      method = 'readAsText';
      encoding = 'utf8';
      break;
    case 'binary': 
      method = 'readAsBinaryString';
      encoding = 'binary';
      break;
    default:
      method = 'readAsBinaryString';
      encoding = 'binary';
      break;
  }
  fileReader.onload = function(file) {
    Meteor.call('saveFile', file.srcElement.result, name, path, encoding, callback);
  }
  fileReader[method](blob);
}*/

function activate_filepicker_for(action) {
  if (!action) {
    throw new Meteor.Error(400, "Required parameter missing (action)");
  }
  if (action === "adding") {
    Session.set('isAddingImage', true);
  } else if (action === "changing") {
    if (Session.get('currentNodeId')) {
      Session.set('isChangingImage', true);
    }
  } else {
    throw new Meteor.Error(400, "Wrong parameter (action)");
  }

  Meteor.setTimeout(function(){
    filepicker.constructWidget(
      $("#filepicker-attachment")
    );
    $("button.filepicker-attachment").click();
  }, 0);
}
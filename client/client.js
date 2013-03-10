Meteor.subscribe('users');
Meteor.subscribe('nodes');


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
      //todo update node description
      console.log(new_description);
    }
  }
});
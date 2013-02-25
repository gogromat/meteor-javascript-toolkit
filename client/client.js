Meteor.subscribe('users');
Meteor.subscribe('nodes');




Template.nodes.nodes = function () {
  return Nodes.find({});
};
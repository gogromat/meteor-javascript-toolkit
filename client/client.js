Meteor.subscribe('users');
Meteor.subscribe('nodes');



// This are the transformation function helpers
Template.nodes.helpers({
  // email_objs: function () {
  //   var contact_id = this._id;
  //   return _.map(this.emails || [], function (email) {
  //     return {contact_id : contact_id, 
  //             address: email.address,
  //             gravatar: Gravatar.imageUrl(email.address)
  //            };
  //   });
  // }
  isClientOwner: function () {
    return isOwner(this.owner);
  }
});


Template.nodes.nodes = function () {
  return Nodes.find({});
};


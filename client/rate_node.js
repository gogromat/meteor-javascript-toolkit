Template.rate_node.events({
	'mouseover .foundicon-up-arrow, mouseover .foundicon-down-arrow': function (evt) {
		console.log('mousing over!');
		$(evt.target).tooltip({
			html: true
		});
	},
	'click .foundicon-up-arrow': function (evt) {
		console.log("calling to change rank with id:", this._id);
		Meteor.call("change_node_rank", this._id, 1, "add");
	},
	'click .foundicon-down-arrow': function (evt) {
		console.log("calling to change rank with id:", this._id);
		Meteor.call("change_node_rank", this._id, -1, "add");
	}
});

Template.rate_node.helpers({
  node_ranking: function () {
  	
    var node_rank = {_id: this._id, rank:0, total:0, total_text:"", like_text:"", dislike_text:""};

    _.map(this.ranks || {}, function(rank_object) {
      if (rank_object.vote === true) {
      	node_rank.rank += 1;
        (isCurrentUser(rank_object.user) ? node_rank.currentUserLikes = true : "");
      } else if (rank_object.vote === false) {
      	(isCurrentUser(rank_object.user) ? node_rank.currentUserDislikes = true : "");
      }
      node_rank.total +=1;
    });

    node_rank.total_text   = "Total votes: " + node_rank.total;
    node_rank.like_text    = "Likes: " 		 + node_rank.rank;
    node_rank.dislike_text = "Dislikes: "    + parseInt(node_rank.total - node_rank.rank, 10);

    return node_rank;
  }
});
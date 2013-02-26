Nodes = new Meteor.Collection("nodes");

Nodes.allow({
	insert: function () {
		return false;
	},
	remove: function () {
		return false;
	}
});

if (Meteor.isServer) {
	Meteor.startup(function () {
		var owner_id = this.userId;
		if (owner_id !== undefined) {
			if (Nodes.find({name:"jQuery"}).fetch().length === 0) {
				var node = {
					name: "jQuery",
					link: "http://www.jquery.com",
					image: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcS6ncay38jTJMkOEwQbR-HVoREsR-poNI1--lrAt_tNpn47VjrD",
					description: "jQuery is a fast, small, and feature-rich JavaScript library. It makes things like HTML document"+
								 " traversal and manipulation, event handling, animation, and Ajax much simpler with an easy-to-use"+
								 " API that works across a multitude of browsers. With a combination of versatility and extensibility,"+
								 " jQuery has changed the way that millions of people write JavaScript.",
					owner: owner_id
				};
				Nodes.insert(node);
			}
			if (Nodes.find({name:"jQuery UI"}).fetch().length === 0) {
				var node = {
					name: "jQuery UI",
					link: "http://jqueryui.com/",
					image: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQXYLbpG6xtybBJ-Ol1Ux_4brkGSejJIP617h61HR_1X6G_iObIyg",
					description: "jQuery UI is a curated set of user interface interactions, effects, widgets, and themes built"+
								 " on top of the jQuery JavaScript Library. Whether you're building highly interactive web applications"+
								 " or you just need to add a date picker to a form control, jQuery UI is the perfect choice.",
					owner: owner_id
				};
				Nodes.insert(node);
			}
			if (Nodes.find({name:"Meteor"}).fetch().length === 0) {
				var node = {
					name: "Meteor",
					link: "http://meteor.com/",
					image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQBFd11-y3tRIE_mZuckB4O6qSmuG8Ngret6-tl_bcYYZnJuqol",
					description: "Meteor is an ultra-simple environment for building modern websites. What once took weeks, even"+
								 "with the best tools, now takes hours with Meteor.",
					owner: owner_id
				};
				Nodes.insert(node);
			}
			if (Nodes.find({name:"Underscore"}).fetch().length === 0) {
				var node = {
					name: "Underscore.js",
					link: "http://underscorejs.org/",
					image: "http://www.google.com/imgres?um=1&hl=en&sa=X&biw=1694&bih=903&tbs=isz:m&tbm=isch&tbnid=-94W3aJ9mHrWBM:&imgrefurl=http://libjunkie.com/javascript/component-library/underscore-js/230&docid=tZO07tWzClXfmM&imgurl=http://libjunkie.com/uploads/127.jpg&w=500&h=300&ei=4Po4UdOmHImu0AHMwYH4Dg&zoom=1&ved=1t:3588,r:6,s:0,i:99&iact=rc&dur=643&page=1&tbnh=155&tbnw=280&start=0&ndsp=24&tx=166&ty=97",
					description: "Underscore is a utility-belt library for JavaScript that provides a lot of the functional"+
								 " programming support that you would expect in Prototype.js (or Ruby), but without extending"+
								 " any of the built-in JavaScript objects. It's the tie to go along with jQuery's tux, and"+
								 " Backbone.js's suspenders.",
					owner: owner_id
				};
				Nodes.insert(node);
			}
		}

	});
}

	
Meteor.methods({
	'add_new_node': function(node_item) {
		//console.log("Sent user id:", node_item.owner, "Current user id:",this.userId)
		if (!node_item.name || !node_item.url || !node_item.owner || !isOwner(node_item.owner) ) {
        	throw new Meteor.Error(400, "Required parameters are missing");
      	}
      	var inserted =  Nodes.insert(node_item); 
      	//console.log("Inserted new node item:", inserted, node_item);
      	return inserted;
	},
	'remove_node': function(node_id) {
		//console.log("Delete node item with id:", node_id);
        var node_item = Nodes.findOne(node_id);
      	if (!node_id || !node_item || !node_item.owner || !isOwner(node_item.owner) ) {
        	throw new Meteor.Error(400, "Required parameters missing (node_id, node_item)");
      	}
      	Nodes.remove({_id: node_id});
	}
});


//if (Meteor.isServer) {
function isOwner(userId) {
	//console.log("Is owner?",userId, Meteor.userId());
	return (userId === Meteor.userId() && Meteor.userId() !== null);
}
//}
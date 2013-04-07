Nodes = new Meteor.Collection("nodes");

Nodes.allow({
	insert: function () {
		return true;
	},
	remove: function () {
		return true;
	},
	update: function () {
		return true;
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
					owner: owner_id,
					ranks: []
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
					owner: owner_id,
					ranks: []
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
					owner: owner_id,
					ranks: []
				};
				Nodes.insert(node);
			}
		}

	});
} else if (Meteor.isClient) {
	Meteor.startup(function() {
	    //var require = __meteor_bootstrap__.require;
	    //var fs = require('fs');
	    //fs.symlinkSync('../../../../uploads', '.meteor/local/build/static/uploads'); 
	});
}


	
// todo: move to server only 	
Meteor.methods({
	'add_new_node': function(node_item) {
		//console.log("Sent user id:", node_item.owner, "Current user id:",this.userId)
		if (!node_item.name || !node_item.url || !node_item.owner || !isOwner(node_item.owner) ) {
        	throw new Meteor.Error(400, "Required parameters are missing");
      	}
      	var inserted =  Nodes.insert(node_item); 
      	console.log("Inserted new node item:", inserted, node_item);
      	return inserted;
	},
	'remove_node': function(node_id) {
		//console.log("Delete node item with id:", node_id);
        var node_item = Nodes.findOne(node_id);
      	if (!node_id || !node_item || !node_item.owner || !isOwner(node_item.owner) ) {
        	throw new Meteor.Error(400, "Required parameters missing (node_id, node_item)");
      	}
      	Nodes.remove({_id: node_id});
	},
	'change_node_rank': function(node_id, rank, action) {
		var rank = parseInt(rank, 10),
			user  = Meteor.userId();

		console.log("Entered the rank change");

		if (!node_id || !rank || rank === NaN) {
			throw new Meteor.Error(400, "Required parameters missing (node_id, node_item)");
		}
		if (rank > 0) {
			rank = Boolean(true);
		} else {
			rank = Boolean(false);
		}

		console.log("Turned to boolean:", rank);
		
		if (action === 'add') {

			var previousRank = Nodes.find({_id: node_id, "ranks.user": user }).fetch();
			//console.log("Node ID:",node_id, "User:", user, "PrevRank:",previousRank);

			if (previousRank.length < 1) {
				//console.log("No previous rank found, inserting new rank");
				Nodes.update(node_id, { $push : {ranks: { user:user, vote:rank } } });
			} else if (previousRank.vote !== rank) {
				//console.log("Updating old rank with different value", previousRank.vote, "New vote:", rank);
				Nodes.update(node_id, {$pull: { ranks: {user:user   	    } } });
				Nodes.update(node_id, {$push: { ranks: {user:user,vote:rank } } });
			} else {			
				console.log("Same vote, skipping!");
			}

			var newRank = Nodes.find({_id: node_id, "ranks.user": user }).fetch();

			console.log("Added: new rank:", newRank);

		} else if (action === 'remove') {

		} else {
			throw new Meteor.Error(405, "Wrong Action");
		}
	},
	'change_node_image_url' : function(node_id, image_url) {
		var node = Nodes.findOne(node_id);
		if (!node_id || !image_url || !isOwner(node.owner)) {
			throw new Meteor.Error(400, "Required parameters missing (node_id, image_url)");
		}
		//var fpfile = {url: node.image};
		//filepicker.remove(fpfile, function(data){
		//    console.log(data);
		//});
		Nodes.update(node_id, { $set: {image: image_url} } );
	},
	'change_node_description': function(node_id, new_description) {
		var node = Nodes.findOne(node_id);
		if (!node_id || !new_description || !isOwner(node.owner)) {
			throw new Meteor.Error(400, "Required parameters missing (node_id, description)");
		}
		Nodes.update(node_id, {$set: {description: new_description}});
	}
	/*,
	saveFile: function(blob, name, path, encoding) {
	    var path 	 = cleanPath(path), 
	    	fs 		 = __meteor_bootstrap__.require('fs'),
	      	name 	 = cleanName(name || 'file'), 
	      	encoding = encoding || 'binary',
	      	chroot   = Meteor.chroot || 'public';
	    // Clean up the path. Remove any initial and final '/' -we prefix them-,
	    // any sort of attempt to go to the parent directory '..' and any empty directories in
	    // between '/////' - which may happen after removing '..'
	    path = chroot + (path ? '/' + path + '/' : '/');
	    
	    // TODO Add file existance checks, etc...
	    fs.writeFile(path + name, blob, encoding, function(err) {
	      if (err) {
	        throw (new Meteor.Error(500, 'Failed to save file.', err));
	      } else {
	        console.log('The file ' + name + ' (' + encoding + ') was saved to ' + path);
	      }
	    }); 
	 
	    function cleanPath(str) {
	      if (str) {
	        return str.replace(/\.\./g,'').replace(/\/+/g,'').
	          replace(/^\/+/,'').replace(/\/+$/,'');
	      }
	    }
	    function cleanName(str) {
	      return str.replace(/\.\./g,'').replace(/\//g,'');
	    }
	},
	save_to_filepicker: function () {
		var fpfile = { 
			url: 'https://www.filepicker.io/api/file/AtDeeAp04RPirFBkQCjWez',
		    filename: 'hello.txt', 
		    mimetype: 'text/plain', 
		    isWriteable: true, size: 100
		};
		console.log("Storing", fpfile.filename);
		filepicker.store(
			fpfile, 
			{filename: 'myCoolFile.txt'},
	    	function(new_fpfile){
	        	console.log(JSON.stringify(new_fpfile));
			}
		);
	}*/
});


//if (Meteor.isServer) {
function isOwner(userId) {
	//console.log("Is owner?",userId, Meteor.userId());
	return (userId === Meteor.userId() && Meteor.userId() !== null);
}

function isCurrentUser(userId) {
	return isOwner(userId);
}
//}
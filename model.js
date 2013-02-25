Nodes = new Meteor.Collection("nodes");




if (Meteor.isServer) {
	Meteor.startup(function () {

		if (Nodes.find({name:"jQuery"}).fetch().length === 0) {
			var node = {
				name: "jQuery",
				link: "http://www.jquery.com",
				image: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcS6ncay38jTJMkOEwQbR-HVoREsR-poNI1--lrAt_tNpn47VjrD",
				description: "jQuery is a fast, small, and feature-rich JavaScript library. It makes things like HTML document traversal and manipulation, event handling, animation, and Ajax much simpler with an easy-to-use API that works across a multitude of browsers. With a combination of versatility and extensibility, jQuery has changed the way that millions of people write JavaScript."
			};
			Nodes.insert(node);
		}
		if (Nodes.find({name:"jQuery UI"}).fetch().length === 0) {
			var node = {
				name: "jQuery UI",
				link: "http://jqueryui.com/",
				image: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQXYLbpG6xtybBJ-Ol1Ux_4brkGSejJIP617h61HR_1X6G_iObIyg",
				description: "jQuery UI is a curated set of user interface interactions, effects, widgets, and themes built on top of the jQuery JavaScript Library. Whether you're building highly interactive web applications or you just need to add a date picker to a form control, jQuery UI is the perfect choice."
			};
			Nodes.insert(node);
		}
		if (Nodes.find({name:"Meteor"}).fetch().length === 0) {
			var node = {
				name: "Meteor",
				link: "http://meteor.com/",
				image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQBFd11-y3tRIE_mZuckB4O6qSmuG8Ngret6-tl_bcYYZnJuqol",
				description: "Meteor is an ultra-simple environment for building modern websites. What once took weeks, even with the best tools, now takes hours with Meteor."
			};
			Nodes.insert(node);
		}

	});
}

	
Meteor.methods({
	'add_new_node': function(node) {
      if (!node.name || !node.url) {
        throw new Meteor.Error(400, "Required parameters are missing");
      }
      inserted =  Nodes.insert(node); 
      console.log("Inserted new node:", inserted, node);
      return inserted;
	}
});
function apply_nickname(old_name, new_name){
	console.log("Applying nickname " + new_name + " for " + old_name);
	// Sends new key/value pair to content.js in all tabs
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
		var message = { "old_name" : old_name, "new_name" : new_name };
		for(var i = 0; i < tabs.length; i++){
			//console.log("Tab " + tabs[i].id + " receiving old name " + message.old_name + " and new name " + message.new_name);
			chrome.tabs.sendMessage(tabs[i].id, message);
		}
	});


}









function submit(){
	var old_name = document.getElementById("old_name").value;
	var new_name = document.getElementById("new_name").value;
	console.log("Replace " + old_name + " with " + new_name);
	var failure = false;

	/* Bad Input Handling */
	if(old_name === ""){
		console.log("Error: Did not enter name to be replaced.");
		failure = true;
	}
	if(new_name === ""){
		console.log("Error: Did not enter nickname.");
		failure = true;
	}
	if(failure){
		return;
	}


	// Remember the nickname
	var pair = {};
	pair[old_name] = new_name;
	chrome.storage.sync.set(pair, function(){
		// Notify that saving was successful
		console.log(old_name + " : " + new_name + " key/value pair saved.");
	})

	// Apply the nickname
	apply_nickname(old_name, new_name);
}

function clear_data(){
	chrome.storage.sync.clear(function(){
		// Notify that all data was cleared
		console.log("All data cleared.");
	});
}

document.addEventListener('DOMContentLoaded', function(){
	var x = document.getElementById("submit_button");
	x.addEventListener('click', function(){
		submit();
	});
});

document.addEventListener('DOMContentLoaded', function(){
	var x = document.getElementById("clear_button");
	x.addEventListener('click', function(){
		clear_data();
	});
});
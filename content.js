var names = {};
chrome.storage.sync.get(null, function(items){
	names = items;
	console.log("Loaded from storage.");
});

window.onload = function() { 
	refresh();
	setInterval(refresh, 5000);
};

function refresh() {
	for(var name in names){
		setNickname(name);
	}
}




chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse){
		console.log("Setting up replacements for " + request.old_name + " and " + request.new_name);
		names[request.old_name] = request.new_name;
		setNickname(request.old_name);
	});

function editText(old_name, node, action) {
	if(node.nodeName === "#text"){
		action(old_name, node);
	}
	var children = node.childNodes;
	for(var i = 0; i < children.length; i++){
		editText(old_name, children[i], action);
	}
}

function setNickname(old_name){
	editText(old_name, document.body, function(old_name, node){
		var old = new RegExp(old_name, "g");
		var rep = names[old_name];
		node.textContent = node.textContent.replace(old, rep);
	});

}
alert("Content.js injected");
var names = {};

function editText(old_name, node){
	if(node.nodeName === "#text"){
		var old = new RegExp(old_name, "g");
		var rep = names[old_name];
		node.textContent = node.textContent.replace(old, rep);
	}
	var children = node.childNodes;
	for(var i = 0; i < children.length; i++){
		editText(old_name, children[i]);
	}
}

function setNickname(old_name){
	editText(old_name, document.body)

}

/*
function setAllNicknames(){
	var words = document.body.innerHTML.split(" ");
	var mod;
	for(var word in words){
		mod += word
	}

}
*/

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse){
		console.log("Setting up replacements for " + request.old_name + " and " + request.new_name);
		names[request.old_name] = request.new_name;
		setNickname(request.old_name);
	});

//setAllNicknames();
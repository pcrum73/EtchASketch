var timer;
var size;

$(document).ready(function(){
		Initialize();
		BuildButton();
		$("body").append('<div id="dvContainer"></div>');
		BuildGrid();
		BuildEtchASketch();
	});

function Initialize(){
	size = 16;
}

function BuildButton(){
	$("body").append('<input type="submit" id="btnClear" value="Clear" onclick="Clear(); return false">');
}


function BuildGrid(){
	
	for(var i=0; i < (size * size - 1); i++){
		var id = i + 1;
		if (id % size === 0){
			$("#dvContainer").append('<div id="dv' + id + '"></div>');
		}
		else{
			$("#dvContainer").append('<div id="dv' + id + '" class="left"></div>');
		}
	}
	var borderWidth = size * $("#dv1").width();
	var borderHeight = size * $("#dv1").height() + 1;
	$("#dvContainer").css("width", borderWidth + "px");
	$("#dvContainer").css("height", borderHeight + "px");
}

function BuildEtchASketch(){
	
	for(var i=0; i < (size * size - 1); i++){
		var id = i + 1;
		var myId = i;
		$("#dv" + id).hover(
			function handlerIn() {
				clearTimeout(timer);
				var redValue = Math.floor((Math.random() * 256) + 1);
				var greenValue = Math.floor((Math.random() * 256) + 1);
				var blueValue = Math.floor((Math.random() * 256) + 1);
				var opacity = Math.random() * 1;
				$(this).css("background-color", "rgba(" + redValue + "," + greenValue + "," + blueValue + "," + opacity);
			},
			function handlerOut(myId){
				timer = setInterval(function() {
					$("#dv" + myId).css("background-color", "white");
				},50000);
			}(myId)
		);
	}
}

function Clear(){
	clearInterval(timer);
	$("#dvContainer > div").css("background-color", "white");
	PromptForGrid();

}

function PromptForGrid(){
	size = prompt("How Many Squares Per Side?");
	if(size < 1){
		Initialize();
	}
	RemoveExistingGrid();
}

function RemoveExistingGrid(){
	$("#dvContainer > div").remove();
	BuildGrid();
	BuildEtchASketch();
}
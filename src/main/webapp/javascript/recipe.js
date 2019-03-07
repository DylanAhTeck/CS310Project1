var id = '';
var title = '';
var image = '';
var ingredients = [];
var instructions = [];
var cookTime;
var prepTime;
var readyTime = '';
var selectedList = '';

//Function to decode URL Parameters
$.urlParam = function(name){
		var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
		return results[1] || 0;
	}
//Function to get parameters from URL
$.getParams = function() {
	id = $.urlParam('id');
	title = decodeURI($.urlParam('title'));
	ingredients = JSON.parse(decodeURI($.urlParam('ingredients')));
	image = $.urlParam('image');
	instructions = decodeURI($.urlParam('instructions')).split('.');
	cookTime = $.urlParam('cookTime');
	prepTime = $.urlParam('prepTime');
	readyTime = $.urlParam('readyTime');
}

//function to render the recipe details
$.renderRecipe = function() {
	$('#recipe-title').text(title);
	$('#recipe-image').html('<img src="' + image + '" />');
	//If the recipe does not have seperate cook times, render time that contains both.
	if(prepTime != "null" && cookTime != "null") {
		$('#recipe-prep-time').text('Prep Time: ' + prepTime + ' minute(s)');
		$('#recipe-cook-time').text('Cook Time: ' + cookTime + ' minute(s)');
	} else {
		$('#recipe-prep-time').text('Ready in ' + readyTime + ' minute(s)');
	}
	//List out each recipe ingredient
	var ingredientsList = '';
	ingredients.forEach(function(item, i) {
		ingredientsList += '<li>'+item.originalString+'</li>'
	})
	$('#ingredients').html(ingredientsList);
	var instructionsList = '';
	//List out each instruction
	instructions.forEach(function(item, i) {
		if(item != ""){
			instructionsList += '<li>'+item+'</li>';
		}	
	})
	$('#instructions').html(instructionsList);
	
}

$.addToList = function() {
	$('#addtolist').click(function(){	
		var item = JSON.parse(localStorage.getItem(title));
		
		
		selectedList = document.getElementById('dropdown').value;
		if(selectedList != "")
			{
		$.ajax({
	        url: './ListServlet',
	        type: 'post',
	        dataType: 'json',
	        data: {
	        	'item': JSON.stringify(item),
	        	 'function': 'add', 
	        	 'list' : selectedList,
	        	 'type' : 'recipe',
	        }
	        
	    })
			}

	})
}

$( document ).ready(function() {
	$.getParams();
	$.renderRecipe();
	$.addToList();
	
	  $('#managelist').click(function(){
		  selectedList = document.getElementById('dropdown').value;
		  var url =  './managelist.html?listTitle=' + selectedList; 
		  console.log('selected list: ' + selectedList);
		  if(selectedList != '') 
			  {
			  Cookies.set('resultsURL', window.location.href);
			  window.location.href = url;
			  }
	  })

  })
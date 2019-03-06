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
	$('#add-to-list').click(function() {
		if(selectedList != ''){
			console.log('Attempting to add ' + title + ' to ' + selectedList);
			if(Cookies.get(id) == null) {
				Cookies.set(id, selectedList);
				console.log('Added ' + title + ' to ' + selectedList);
			} else {
				console.log(title + ' is already on ' + Cookies.get(id));
			}
			
		}
	})
}

$( document ).ready(function() {
	$.getParams();
	$.renderRecipe();
	$.addToList();
	$('.dropdown-trigger').click(function() {
	  $('.dropdown').addClass('is-active');
	 })
	  
	 $('#favorites').click(function() {
	  selectedList = 'Favorites';
	  $('#dropdown-title').text(selectedList);
	  $(this).addClass('is-active');
	  $('.dropdown').removeClass('is-active');
	  $('#explore').removeClass('is-active');
	  $('#do-not-show').removeClass('is-active');
	 })
	 $('#explore').click(function() {
	  selectedList = 'To Explore';
	  $('#dropdown-title').text(selectedList);
	  $(this).addClass('is-active');
	  $('.dropdown').removeClass('is-active');
	  $('#favorites').removeClass('is-active');
	  $('#do-not-show').removeClass('is-active');
	 })
	 $('#do-not-show').click(function() {
	  selectedList = 'Do Not Show';
	  $('#dropdown-title').text(selectedList);
	  $(this).addClass('is-active');
	  $('.dropdown').removeClass('is-active');
	  $('#favorites').removeClass('is-active');
	  $('#explore').removeClass('is-active');
	 })
  })
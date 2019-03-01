var id;
var name;
var address;
var phone;
var website;

//Function to decode URL Parameters
$.urlParam = function(name){
		var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
		return results[1] || 0;
	}
//Function to get parameters from URL
$.getParams = function() {
	id = decodeURI($.urlParam('id'));
	name = decodeURI($.urlParam('name'));
	address = decodeURI($.urlParam('address'));
	phone = decodeURI($.urlParam('phone'));
	website = decodeURI($.urlParam('website'));
}

//function to render the recipe details
$.renderRestaurant = function() {
	$('#restaurant-name').text(name);
	$('#restaurant-address').text(address);
	$('#restaurant-phone-number').text(phone);
	$('#restaurant-link').text(website);
	$('#restaurant-link').attr('href', website);
	$('#restaurant-address').attr('href', 'https://www.google.com/maps/dir/Tommy+Trojan,+801-899+Childs+Way,+Los+Angeles,+CA+90089/'+address);
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
	$.renderRestaurant();
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
  })/**
 * 
 */
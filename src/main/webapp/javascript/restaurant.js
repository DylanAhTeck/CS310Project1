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
	website = decodeURIComponent($.urlParam('website'));
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
	$('#addtolist').click(function(){	
		var item = JSON.parse(localStorage.getItem(name));
		
		
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
	        	 'type' : 'restaurant',
	        }
	        
	    })
			}

	})
	
}

$( document ).ready(function() {
	$.getParams();
	$.renderRestaurant();
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
  })/**
 * 
 */
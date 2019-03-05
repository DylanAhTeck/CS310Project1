var selectedList = '';
//Function to get URL Parameters

  $.urlParam = function(name){
		var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
		return results[1] || 0;
	}
	
  //Function to render star rating for restaurants
  $.getStars = function(rating) {
	  var stars = '';
	  for(var i = 0; i < rating; i++ ) {
		  stars += '<span class="icon has-text-info"><i class="fas fa-star"></i></span>'
	  }
	  return stars;
  }
  //Function to render star ratings for recipe
  $.getStarsRecipe = function(rating) {
	  var render = '';
	  var stars = (rating/100) * 5;
	  var fullStars = Math.floor(stars);
	  var halfStars = 0;
	  if(stars % 1 != 0) {
		  halfStars = 1;
	  }
	  for(var i = 0; i < fullStars; i++ ) {
		  render += '<span class="icon has-text-info"><i class="fas fa-star"></i></span>'
	  }
	  if(halfStars == 1) {
		  render += '<span class="icon has-text-info"><i class="fas fa-star-half-alt"></i></span>'
	  }
	  return render;
  }
  //Function to render pricing
  $.getPrice = function(price) {
	  if(price == null) return '';
	  var signs = '';
	  for(i=0; i<price.length; i ++) {
		  signs += '<span class="icon has-text-success dollar-signs"><i class="fas fa-dollar-sign"></i></span>'
	  }
	  return signs
  }
  //Function to turn location object into string
  $.getAddress = function(loc) {
	  return (loc.address1 + ", " + loc.city + ", " + loc.state + " " + loc.zip_code);
  }
  //Function to get driving time
 
  $.getDrivingTime = function(loc,i) {
	  var key = 'AIzaSyCdpgAD8kWgEeFD7AY2FMwBAIe_Hz2jITo';
	  var service = new google.maps.DistanceMatrixService();
	  var mins = service.getDistanceMatrix(
	    {
	      origins: ['Tommy Trojan'],
	      destinations: [$.getAddress(loc)],
	      travelMode: 'DRIVING',
	    }, function(response, status) {
	    	console.log(response.rows[0].elements[0].duration.text)
			$('.distance_'+i).text(response.rows[0].elements[0].duration.text); //Adding driving time to html
	    }) 
  }
  
  //Function that returns the prep time and cook time or ready in minutes
  $.getCookTime = function(prep, cook, ready) {
	  var time = '';
	  if(prep != null && cook != null) {
		  time = 'Prep Time: ' + prep + ' minutes Cook Time: ' + cook + ' minutes'
	  } else {
		  time = 'Ready in ' + ready + ' minutes'
	  }
	  return time;
  }
  //Function that returns all restaurant results from List
  $.getList = function() {
	//Returning JSON array from cookie
	  selectedList = $.urlParam('listTitle');
	  var json_str = Cookies.get(selectedList);
	  var arr = JSON.parse(json_str);
	  
	
	 $('.title').text('Results for ' + selectedList);  //Setting Header to 'Results for [q]'
				    
	    arr.forEach(function(item, i) {
	    	var color = '';
	    	if(i%2 != 0) { //if index is odd make it gray
	    		color = 'has-background-white-ter';
	    	}
	    	
	    	if(item.name != null) $.getRestaurant(item,i,color);
	    	else $.getRecipe(item,i,color);
	    	
	    });
  }
  
  //Create footer
  	$.addMoveAddRemove = function(type, item, i){
	$('#move'+type+i).click(function(){
	selectedList = document.getElementById('dropdown').value;
	if(selectedList != '' && selectedList != $.urlParam('listTitle')){
	console.log('Attempting to move ' + item.name + ' to ' + selectedList);
	if(Cookies.get(selectedList) == null) 
	{
		var arr = [];
		arr.push(item);
		Cookies.set(selectedList, JSON.stringify(arr));
	}		
	else
	{
		var json_str = Cookies.get(selectedList);
		var arr = JSON.parse(json_str);
		console.log(arr);
		arr.push(item);
		Cookies.set(selectedList,JSON.stringify(arr));
	}
	var json_str = Cookies.get($.urlParam('listTitle'));
	var arr = JSON.parse(json_str);
	for(var i=0; i < arr.length; i++){
		if(arr[i].alias === item.alias)  arr.splice(i,1);
		break;
		}
	Cookies.set($.urlParam('listTitle'),JSON.stringify(arr));
	window.location.reload();
	} else {
		console.log('No list is specified');
	}
	})
	
	$('#remove'+type+i).click(function(){
	selectedList = document.getElementById('dropdown').value;
	console.log('Attempting to remove ' + item.name + ' from ' + selectedList);
	var json_str = Cookies.get(selectedList);
	var arr = JSON.parse(json_str);
	for(var i=0; i < arr.length; i++){
		if(arr[i].alias === item.alias)  arr.splice(i,1);
		break;
		}
	Cookies.set(selectedList,JSON.stringify(arr));
	window.location.reload();
	})
	
  	}
	
  $.getRestaurant = function(item, i, color){
			  var html = '<div class="card" ' + color + '>' + 
				'<div class="card-content" ' + 'id="' + item.alias + '">'+
					'<div class="content">' +
						'<div class="columns">'+
							'<div class="column is-four-fifths">'+
								'<div class="has-text-left">'+
									'<p>' + item.name + ' ' + $.getStars(item.rating) + '</p>'+
									'<p class="distance_'+i+'"></p>'+
									'<p>' + $.getAddress(item.location) + '</p>'+
								'</div>'+
							'</div>'+
							'<div class="column is-one-fifth">'+
								'<div class="has-text-right">'+
									'<p>' + $.getPrice(item.price) + '</p>' +
								'</div>'+
							'</div>'+
						'</div>'+
					'</div>'+
				'</div>'+
				'<footer class="card-footer">'+
					'<a id="move'+'restaurant'+i+'" class="card-footer-item">Move To List</a>'+
					'<a id="remove'+'restaurant'+i+'" class="card-footer-item">Remove From List</a>'+
				'</footer>'+
			'</div>';
		$('#results').append(html);
		$.getDrivingTime(item.location,i);
		$('#'+item.alias).click(function() {
			var id = "id="+item.alias +"&";
			var name = "name=" + item.name +"&";
			var address = "address=" + $.getAddress(item.location) + "&";
			var phone = "phone=" + item.phone + "&";
			var link = encodeURIComponent(item.url);
			console.log(link);
			var website = "website=" + link;
			var url =  "./restaurant.html?" + id + name + address + phone + website;
			
			window.location.href = url;
		})
		//Add move/remove button
		$.addMoveAddRemove('restaurant', item, i);
		
	}

  $.getRecipe = function(item, i,color){
	    	var color = '';
	    	if(i%2 != 0) { //if index is odd make it gray
	    		color = 'has-background-white-ter'
	    	}
	    	var html = '<div class="card" ' + color + '>' + 
				'<div class="card-content ' + ' id="' + item.id+ '">'+
	    						'<div class="content">' +
	    							'<div class="columns">'+
	    								'<div class="column is-three-fifths">'+
	    									'<div class="has-text-left">'+
	    										'<p>' + item.title + '</p>'+
	    										'<p></p>'+
	    										'<p>' + $.getCookTime(item.preparationMinutes, item.cookingMinutes, item.readyInMinutes) + '</p>'+
	    									'</div>'+
	    								'</div>'+
	    								'<div class="column is-two-fifths">'+
	    									'<div class="has-text-right">'+
	    										'<p>' + $.getStarsRecipe(item.spoonacularScore) + '</p>' +
	    									'</div>'+
	    								'</div>'+
	    							'</div>'+
	    						'</div>'+
	    					'</div>'+
	    					'<footer class="card-footer">'+
								'<a id="move'+'recipe'+i+'" class="card-footer-item">Add To List</a>'+
								'<a id="remove'+'recipe'+i+'" class="card-footer-item">Add To List</a>'+
							'</footer>'+
	    				'</div>';
	    	$('#results').append(html);
	    	$('#'+item.id).click(function() {
	    		var id = "id="+item.id +"&";
	    		var title = "title=" + item.title +"&";
	    		var image = "image=" + item.image + "&";
	    		var ingredients = "ingredients=" +JSON.stringify(item.extendedIngredients) + "&";
	    		var instructions = "instructions=" + item.instructions + "&";
	    		var prepTime = "prepTime=" + item.preparationMinutes + "&";
	    		var cookTime = "cookTime=" + item.cookingMinutes + "&";
	    		var readyTime = "readyTime=" + item.readyInMinutes + "&";
	    		var url =  "./recipe.html?" + id + title + image + ingredients + instructions + prepTime + cookTime + readyTime;
	    		
	    		window.location.href = url;
	    	})
	    	$('#recipe'+i).click(function(){
	    		if(selectedList != ''){
	    			console.log('Attempting to add ' + item.title + ' to ' + selectedList);
	    			if(Cookies.get(item.id) == null) {
	    				Cookies.set(item.id, selectedList);
	    				console.log('Added ' + item.title + ' to ' + selectedList);
	    			} else {
	    				console.log(item.title + ' is already on ' + Cookies.get(item.id));
	    			}
	    			
	    		}
	    	})
	    	
	    	//Add move/remove button
			$.addMoveAddRemove('recipe', item, i);
	    };
	    
	    

  
  $( document ).ready(function() {
	  console.log(Cookies.get());
	  $.getList();
	  $('#managelist').click(function(){
		  selectedList = document.getElementById('dropdown').value;
		  var url =  './managelist.html?listTitle=' + selectedList; 
		  console.log('selected list: ' + selectedList);
		  if(selectedList != '') window.location.href = url;
	  })
	   /*
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
	  */
  })
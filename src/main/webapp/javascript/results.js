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
  //Function that returns all restaurant results from YelpApi
  $.getRestaurantResults = function() {
	//Making ajax request to YelpApi
	  var q = $.urlParam('query'); //get search query
	  var s = $.urlParam('size'); //get number of results 
	  $('.title').text('Results for ' + q.split('+').join(' '));  //Setting Header to 'Results for [q]'
	  $.post("./YelpApi",
			  {
				  query: q,
				  size: s,
			  },
			  function(data, status){
			    console.log(data);
			    data.forEach(function(item, i){
			    	if(Cookies.get(item.alias) == 'Favorites'){ //If on favorites list move to front
			    		data.splice(i, 1);
			    		data.unshift(item);
			    	}
			    	if(Cookies.get(item.alias) == 'Do Not Show'){ //If on do not show list, remove for list
			    		data.splice(i, 1);
			    	}
			    });
			    data.forEach(function(item, i) {
			    	var color = '';
			    	if(i%2 != 0) { //if index is odd make it gray
			    		color = 'has-background-white-ter'
			    	}
			    	//the restaurant card that holds the restaurant info
			    	var html = '<div class="card ' + color +' " id="' + item.alias + '">' + 
			    					'<div class="card-content">'+
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
	    								'<a id="restaurant'+i+'" class="card-footer-item">Add To List</a>'+
	    							'</footer>'+
			    				'</div>';
			    	$('#restaurants').append(html);
			    	//Calling function to get driving time
			    	$.getDrivingTime(item.location,i)
			    	//Function to handle click to forward to details page
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
					  //
			    	$('#restaurant'+i).click(function(){
			    		if(selectedList != ''){
			    			console.log('Attempting to add ' + item.name + ' to ' + selectedList);
			    			if(Cookies.get(item.alias) == null) {
			    				Cookies.set(item.alias, selectedList);
			    				console.log('Added ' + item.name + ' to ' + selectedList);
			    			} else {
			    				console.log(item.name + ' is already on ' + Cookies.get(item.alias));
			    			}
			    			
			    		}
			    	})
			    })
			  });
  }
  $.getRecipeResults = function() {
		//Making ajax request to YelpApi
		  var q = $.urlParam('query'); //get search query
		  var s = $.urlParam('size'); //get number of results 
		  $.post("./SpoonacularApi",
				  {
					  query: q,
					  size: s,
				  },
				  function(data, status){
					  console.log(data);
					    data.forEach(function(item, i){
					    	if(Cookies.get(item.id) == 'Favorites'){
					    		data.splice(i, 1);
					    		data.unshift(item);
					    	}
					    	if(Cookies.get(item.id) == 'Do Not Show'){
					    		data.splice(i, 1);
					    	}
					    });
					    data.forEach(function(item, i) {
					    	var color = '';
					    	if(i%2 != 0) { //if index is odd make it gray
					    		color = 'has-background-white-ter'
					    	}
					    	//The html for the recipe card containing all recipe info
					    	var html = '<div class="card ' + color +' "id="'+item.id+'">' + 
					    					'<div class="card-content">'+
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
			    								'<a id="restaurant'+i+'" class="card-footer-item">Add To List</a>'+
			    							'</footer>'+
					    				'</div>';
					    	$('#recipes').append(html);
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
					    })
				  });
	  }
  //Function to get 10 images from google
  $.getGoogleImages = function() {
	  var q = $.urlParam('query'); //get search query
	  var s = $.urlParam('size');
	  $.post("./GoogleServlet",
			  {
				  query: q,
			  },
			  function(data, status){
			    data.items.forEach(function(item, i){
			    	var rotation = Math.floor(Math.random() * (90)) -45;
			    	var html = '<img class="food-image" src="' + item.link +'" width="100%" style="transform: rotate(' + rotation +'deg)"/>';
			    	$('#image'+ i).append(html);
			    })
			  })
  }
  
  $(document).ready(function() {
	  console.log(Cookies.get());
	  $.getRestaurantResults();
	  $.getRecipeResults();
	  $.getGoogleImages();
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
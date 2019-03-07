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
				  
				  $.post("./ListServlet",
						  {
					  		'function': 'return', 
					  		'list' : 'do-not-show',
					  		'type' : 'restaurant',
					  		 
						  },						  
						  function(dnsArray){
							  data.forEach(function(item, i) {
								  dnsArray.forEach(function(dnsItems) {			  
									  if (item.name == dnsItems.name)
										  {
										  console.log('in here. i: ' + i)
										  console.log('item name' + item.name)
									      console.log('dns name ' + dnsItems.name)
										  data.splice(i,1);
										  }
						  })})})
				 $.post("./ListServlet",
				  {
			  		'function': 'return', 
			  		'list' : 'favorites',
			  		'type' : 'restaurant',
			  		 
				  },						  
				  function(favArray){
					  data.forEach(function(item, i) {
						  favArray.forEach(function(favItems) {									 
							  if (item.name == fav.name)
								  {
								  data.splice(i,1);
								  data.unshift(item);
								  }
				  })})})  
				  

			    data.forEach(function(item, i) {
			    	if(i >= s) return;
			    	var color = '';
			    	if(i%2 != 0) { //if index is odd make it gray
			    		color = 'has-background-white-ter'
			    	}
			    	//the restaurant card that holds the restaurant info

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

			    				'</div>';

			    					'<footer class="card-footer">'+
	    								'<a id="restaurant'+ i +'" class="card-footer-item">Add To List</a>'+
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
					    		var link = encodeURI(item.url);
					    		console.log(link);
					    		var website = "website=" + link;
					    		var url =  "./restaurant.html?" + id + name + address + phone + website;
					    		window.location.href = url; 
					  })


			    	$('#restaurant'+i).click(function(){	    		
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
			    })
			  });
  }
  $.getRecipeResults = function() {
		//Making ajax request to YelpApi
		  var q = $.urlParam('query'); //get search query
		  var s = $.urlParam('size'); //get number of results 
		  $('#loader').append('<progress class="progress is-info" max="100">60%</progress>');
		  
		  $.post("./SpoonacularApi",
				  {
					  query: q,
					  size: s,
				  },
				  function(data, status){
				  $.post("./ListServlet",
						  {
					  		'function': 'return', 
					  		'list' : 'do-not-show',
					  		'type' : 'restaurant',
					  		 
						  },						  
						  function(dnsArray){
							  data.forEach(function(item, i) {
								  dnsArray.forEach(function(dnsItems) {			  
									  if (item.title == dnsItems.title)
										  {
										  console.log('in here. i: ' + i)
										  console.log('item name' + item.title)
									      console.log('dns name ' + dnsItems.title)
										  data.splice(i,1);
										  }
						  })})})
					 $.post("./ListServlet",
					  {
				  		'function': 'return', 
				  		'list' : 'favorites',
				  		'type' : 'restaurant',
				  		 
					  },						  
					  function(favArray){
						  data.forEach(function(item, i) {
							  favArray.forEach(function(favItems) {									 
								  if (item.title == fav.title)
									  {
									  data.splice(i,1);
									  data.unshift(item);
									  }
					  })})})
					  $('#loader').remove();
					    data.forEach(function(item, i) {
					    	if(i >= s) {return};
					    	var color = '';
					    	if(i%2 != 0) { //if index is odd make it gray
					    		color = 'has-background-white-ter'
					    	}

					    	var html = '<div class="card" ' + color + '>' + 
							'<div class="card-content ' + '" id="' + item.id+ '">'+
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
					    		selectedList = document.getElementById('dropdown').value;
					    		if(selectedList != ""){
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
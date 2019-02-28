  //Function to get URL Parameters
  $.urlParam = function(name){
		var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
		return results[1] || 0;
	}
  //Function to render star rating
  $.getStars = function(rating) {
	  var stars = '';
	  for(var i = 0; i < rating; i++ ) {
		  stars += '<span class="icon has-text-info"><i class="fas fa-star"></i></span>'
	  }
	  return stars;
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
	  var key = '';
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
  //Function that returns all restaurant results from YelpApi
  $.getRestaurantResults = function() {
	//Making ajax request to YelpApi
	  var q = $.urlParam('query'); //get search query
	  var s = $.urlParam('size'); //get number of results 
	  $('.title').text('Results for ' + q);  //Setting Header to 'Results for [q]'
	  $.post("./YelpApi",
			  {
				  query: q,
				  size: s
			  },
			  function(data, status){
			    console.log(data);
			    data.forEach(function(item, i) {
			    	var color = '';
			    	if(i%2 != 0) { //if index is odd make it gray
			    		color = 'has-background-white-ter'
			    	}
			    	var html = '<div class="card ' + color +' ">' + 
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
	    								'<a class="card-footer-item">Add To List</a>'+
	    							'</footer>'+
			    				'</div>';
			    	$('#restaurants').append(html);
			    	$.getDrivingTime(item.location,i)
			    })
			  });
  }
  
  $( document ).ready(function() {
	  $.getRestaurantResults();
  })
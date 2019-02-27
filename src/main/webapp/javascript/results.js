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
		  signs += '<span class="icon has-text-success"><i class="fas fa-dollar-sign"></i></span>'
	  }
	  return signs
  }
  
  $( document ).ready(function() {
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
			    	var html = '<div class="card">' + 
			    					'<div class="card-content">'+
			    						'<div class="content">' +
			    							'<div class="level">'+
			    								'<div class="level-left">'+
			    									'<div class="level-item">'+
			    										'<div>' + item.name + ' ' + $.getStars(item.rating) + '</div>'+
			    									'</div>'+
			    								'</div>'+
			    								'<div class="level-right">'+
			    									'<div class="level-item">'+
			    										'<p>' +$.getPrice(item.price) + '</p>' +
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
			    })
			  });
  })
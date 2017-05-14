
	var responseDocs=[];
	$(document).ready(function(){

	$("#submit").on("click", function(){
		event.preventDefault();

		var searchString = $("#search").val();
		var beginDate = $("#start-year").text();
		var endDate = $("#end-year").text();

		getArticles(searchString,beginDate,endDate);
	});

	// getArticles("smoking","","");
	function getArticles(searchString,beginDate,endDate)
	{
			
		var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
		if(beginDate != ""){
			queryURL += '?' + $.param({
		  'api-key': "d689a3ae4786408c97d5be109fa52bea",
		  'q': searchString,
		  'begin_date': beginDate 
		 
		});
		}

		else if(endDate != "" ){
			queryURL += '?' + $.param({
		  'api-key': "d689a3ae4786408c97d5be109fa52bea",
		  'q': searchString,
		  'begin_date': beginDate,
		  'end_date': endDate
		});
		}
		else{
			queryURL += '?' + $.param({
			  'api-key': "d689a3ae4786408c97d5be109fa52bea",
			  'q': searchString
			 
			});
			console.log(queryURL);
		}
		
		$.ajax({
		  url: queryURL,
		  method: 'GET',
		}).done(function(result) {
			console.log(result);
		  console.log(result.response.docs);
		  responseDocs = result.response.docs;
		  $('#results').empty();

	  		// Counter to keep track of article numbers as they come in
			var articleCounter = 0;

		  
		  for (var i=0; i<responseDocs.length; i++) {

		  	// Add to the Article Counter (to make sure we show the right number)
		    articleCounter++;

		  	var r = responseDocs[i];
  			var wrap = $('<div>');
			wrap.addClass('well result-wrap row col-md-10 col-md-offset-1');


			var h2 = $('<h2>');
			var link = $('<a>');
			var p = $('<p>');

			// var x = r.headline.main;
			// console.log('x',x);

			h2.text( r.headline.main );
			link.attr('href', r.web_queryURL);
			p.text(r.snippet);

			wrap.append(link);
			wrap.append(h2);
			wrap.append(p);

			$('#results').append(wrap);
		  };


		});
		// .fail(function(err) {
		//   throw err;
		// });
	}
});

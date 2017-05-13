
	var responseDocs=[];
	$(document).ready(function(){

	$("#submit").on("click", function(){
		var searchString = $("#search").text();
		var beginDate = $("#start-year").text()+"0000";
		var endDate = $("#end-year").text()+"0000";

		getArticles(searchString,beginDate,endDate);
	});

	// getArticles("smoking","","");
	function getArticles(searchString,beginDate,endDate)
	{
		
			// Built by LucyBot. www.lucybot.com
	
		var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
		if(beginDate != ""){
			url += '?' + $.param({
		  'api-key': "d689a3ae4786408c97d5be109fa52bea",
		  'q': searchString,
		  'begin_date': beginDate 
		 
		});
		}

		else if(endDate != "" ){
			url += '?' + $.param({
		  'api-key': "d689a3ae4786408c97d5be109fa52bea",
		  'q': searchString,
		  'begin_date': beginDate,
		  'end_date': endDate
		});
		}
		else{
			url += '?' + $.param({
			  'api-key': "d689a3ae4786408c97d5be109fa52bea",
			  'q': searchString
			 
			});
			console.log(url);
		}
		
		$.ajax({
		  url: url,
		  method: 'GET',
		}).done(function(result) {
			console.log(result);
		  console.log(result.response.docs);
		  responseDocs = result.response.docs;
		}).fail(function(err) {
		  throw err;
		});
	}
});

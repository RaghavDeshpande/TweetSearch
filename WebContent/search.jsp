<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<script src="jquery-3.2.1.min.js"></script>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
</head>
<h1> hello</h1>
 <form action="http://localhost:8080/TweetSearch/search" method="get">
 <input type="text"  id="query" name="query">
 </form> 
 <button id="search">Search</button>
<body>
<script>
	$(document).ready(function(){
		$('#search').click(function(){
			var x =encodeURIComponent( $('#query').val());
			$('#query').val(x);
			$('form').submit();
		});
		$.ajax({
			type:'GET',
			contentType: "application/json",
			url:"http://localhost:8080/TweetSearch/getSearchResults"
		}).done(function(data, err){
			if(err == "success"){
				console.log(data);
				var meta = data.search_metadata;
				var statuses = data.statuses;
				$.each(statuses, function(index, value){
					var text = value.text;
					var misc = value.retweeted_status;
					addResults(text);
					
				})
			}
			else 
				console.log(err);
			
		})
	});
	function addResults(str){
		var $div = $("<div>", {id: str, align:"center"});
		$div.html(str);
		$('body').append($div)
	}
	
</script>
</body>
</html>
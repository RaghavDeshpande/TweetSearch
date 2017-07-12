<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
		<link rel="stylesheet" href="https://code.getmdl.io/1.3.0/material.indigo-pink.min.css">
		<script defer src="https://code.getmdl.io/1.3.0/material.min.js"></script>
		<script src="jquery-3.2.1.min.js"></script>
		<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
		<title>home page</title>
	</head>
<body>
 <h1></h1>
 <form action="http://localhost:8080/TweetSearch/search" method="get">
 <input type="text"  id="query" name="query">
 </form> 
 <button id="search" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">Search</button>
</body>
<script>
	var trends;
	
	$(document).ready(function(){
		getScreenName();
		getTrends();
		$('#search').click(function(){
			var x =encodeURIComponent( $('#query').val());
			$('#query').val(x);
			$('form').submit();
		});
	})
	function getTrends(){
		$.ajax({
			type:'GET',
			contentType: "application/json",
			url:"http://localhost:8080/TweetSearch/getTrends"
		}).done(function(data, err){
			if(err == "success"){
				var obj = data[0];
				trends = obj.trends;
				$.each(trends, function(index, value){
					if(value.promoted_content == null)
						addTrends(value.name)
				})
			}
			else{
				console.log(err);
			}
		})
	}
	function getScreenName(){
		$.ajax({
			type:"GET",
			contentType: "application/json",
			url:"http://localhost:8080/TweetSearch/accountSettings"
		}).done(function(data, err){
			if(err == "success"){
				$('h1').text("hello "+ data.screen_name);
				
			}
			else console.log(err);
		});
	}
	function addTrends(str){
		var $div = $("<div>", {id: str, align:"center"});
		$div.html(str);
		$('body').append($div)
	}
	function Search(str){
		console.log('i am fired');
		console.log();
	}
	
</script>
</html>
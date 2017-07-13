var url="http://localhost:8080/TweetSearch/getSearchResults";
$(document).ready(function(){
	getScreenName();
	getTrends();
	$('#search').on("click", getSearchResults);
	$("#content").on("click", ".mdl-button", toggle);
	$("#favourite").on("click", ".mdl-button", toggle);
	$("#favourite").on("click", getFavourite);
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
			$('#username').text(data.screen_name);
		}
		else console.log(err);
	});
}
function addTrends(str){
	var div = document.createElement('a');
	var textNode = document.createTextNode(str);
	div.appendChild(textNode);
	div.className = "mdl-navigation__link";
	componentHandler.upgradeElement(div);
	document.getElementById('navigation_pane').appendChild(div);
}

function getSearchResults(){
	$('#content').empty();
var x = encodeURIComponent( $('#query').val());
console.log(x)
$.get(url, 
		{query:x },
		function(data){
			DATA = data;
			console.log(data);
			var meta = data.search_metadata;
			var statuses = data.statuses;
			$.each(statuses, function(index, value){
				var user = value.user.name;
				addSearch(user, value.text);			
			})
		}).fail(()=>{ console.log(err); })
}

function toggle(){
	var nam =this.name;
	$(this).parent().siblings(".tweet-div").toggleClass(nam);
	$(this).toggleClass("pink  mdl-button--colored");
}

function addSearch(user, tweet){
	var $odiv = $("<div>", { class:"demo-card-wide mdl-card mdl-shadow--2dp", id:"outter-div"});
	
	var $twitdiv = $("<div>", { class:"demo-card-wide mdl-card mdl-shadow--2dp tweet-div", id:"twit-div" });
	var $hd4 = $("<h4>", { class:"mdl-card__title-text" });
	$hd4.html(tweet);
	$twitdiv.append($hd4);

	var $userdiv = $("<div>",{ class:"mdl-card__supporting-text" })
	$userdiv.html(user)
	
	var $btndiv = $("<div>", { class: "mdl-card__actions mdl-card--border" })
	var $like = $("<a>", { class:"mdl-button  mdl-button--colored mdl-js-button mdl-js-ripple-effect", name:"LIKE" });
	$like.html("Like");
	var $hate = $("<a>", { class:"mdl-button  mdl-button--colored mdl-js-button mdl-js-ripple-effect", name:"HATE"  });
	$hate.html("DisLike");
	var $fav = $("<a>", { class:"mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect", name:"FAVOURITE" });
	$fav.html("Favourite");
	
	$btndiv.append($like);
	$btndiv.append($hate);
	$btndiv.append($fav);
	$odiv.append($twitdiv);
	$odiv.append($userdiv);
	$odiv.append($btndiv);
	$("#content").append($odiv);
}
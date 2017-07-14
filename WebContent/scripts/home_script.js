var profile_image = "./images/avatar7_big.png";
$(document).ready(function(){
	getScreenName();
	getTrends();
	$('#navigation_pane').on("click", 'a',searchTrends);
	$('#search').on("click", getSearchResults);
	$("#content").on("click", ".mdl-button", toggle);
	$("#favourites").on("click", ".mdl-button", toggle);
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
function searchTrends(){
	var q = $(this).text();
	$('#query').val(q);
	getSearchResults();
}
function getScreenName(){
	$.ajax({
		type:"GET",
		contentType: "application/json",
		url:"http://localhost:8080/TweetSearch/accountSettings"
	}).done(function(data, err){
		if(err == "success"){
			console.log(data);
			$('#username').text(data.screen_name);
			if(data.profile_use_background_image == true){
				profile_image = data.profile_image_url;
			}
			$("#profile_pic").attr("src", profile_image );
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



function toggle(){
	var nam =this.name;
	$(this).parent().siblings(".tweet-div").toggleClass(nam);
	$(this).toggleClass("pink  mdl-button--colored");
}
function getFavourite(){
        var f =document.getElementsByClassName("FAVOURITE");
        $.each(f, function(index, value){
			if(!$(value).hasClass("in-favourite")){
            	$("#favourites").append($(value).parent());
				$(value).addClass("in-favourite");
			}
        })
    }
function addSearch(user, tweet, img){
	var $odiv = $("<div>", { class:"demo-card-wide mdl-card mdl-shadow--2dp", id:"outter-div"});
	var $twitdiv = $("<div>", { class:"demo-card-wide mdl-card mdl-shadow--2dp tweet-div", id:"twit-div", });
	$twitdiv.css('background-image', 'url(' + img + ')');
	$twitdiv.css("background-size", 'cover');
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
function getSearchResults(){
	var url="http://localhost:8080/TweetSearch/getSearchResults";
	if(! $("#content").hasClass("is-active")){
		$("#content").toggleClass("is-active");
		$("#favourite").toggleClass("is-active");
	}
	var imgURL = "";
	$('#content').empty();
	createProgressBar();
	console.log("lol")
	var x = encodeURIComponent( $('#query').val());
	$.get(url, 
			{query:x },
			function(data){
				var meta = data.search_metadata;
				var statuses = data.statuses;
				$('#content').empty();
				$.each(statuses, function(index, value){
					var DATA = value;
					if(DATA.entities.media == undefined || DATA.entities.media == "undefined" || DATA.entities.media == null)
					{  imgURL = "./images/twitter-logo-wallpaper.jpg"}	
					else{
						imgURL = DATA.entities.media.pop().media_url;
					}
					var user = value.user.name;
					addSearch(user, value.text, imgURL);			
				})
			}).fail(()=>{ console.log(err); })
}
function createProgressBar(){
	console.log("called");
	var div = document.createElement('div');
    div.className = "mdl-progress mdl-js-progress mdl-progress__indeterminate";
	componentHandler.upgradeElement(div);
    document.getElementById('content').appendChild(div);
}
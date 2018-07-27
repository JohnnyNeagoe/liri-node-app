require("dotenv").config();
var fs = require('fs');
var keys = require('./keys')
var Twitter = require('twitter');
var myTweets;
 
myTweets();
 
function myTweets(){
    var params = { 
    screen_name: 'JohnnyNeagoe', 
    count: '20', 
    };
    var client = new Twitter(keys.twitter);
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
       for (var i = 0; i<tweets.length;i++){
           var myTweets = ('\n' + "@" + params.screen_name + "\n" + "tweeted: " + tweets[i].text + "\n" + "on :" + tweets[i].created_at)
           console.log(myTweets);

       }
        //console.log(JSON.stringify(tweets, null, 2));
    }
    });

}

//var spotify = new Spotify(keys.spotify);


//console.log(spotify);
//console.log(client);



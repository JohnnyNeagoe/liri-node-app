require("dotenv").config();
var fs = require('fs');
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var keys = require('./keys');


var listTweets;
var spotifySearch;

myTweets();
spotifyThisSong();
 
function myTweets(){
    var params = { 
    screen_name: 'JohnnyNeagoe', 
    count: '20', 
    };
    var client = new Twitter(keys.twitter);
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            for (var i = 0; i<tweets.length;i++){
                listTweets = ('\n' + "@" + params.screen_name + "\n" + "tweeted: " + tweets[i].text + "\n" + "on :" + tweets[i].created_at)
                console.log(listTweets);

            }
        }
    });
}

function spotifyThisSong(){
    var spotify = new Spotify(keys.spotify);
    spotify.search({ type: 'track', query: 'Surivial' }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        } 
       
      console.log(data); 
      });
}



//console.log(spotify);
//console.log(client);



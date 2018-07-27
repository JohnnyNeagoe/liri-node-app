require("dotenv").config();
var fs = require('fs');
var Spotify = require('spotify');
var Twitter = require('twitter');
var keys = require('./keys');
console.log(Twitter);
console.log(Spotify);
var listTweets;
var spotifySearch;

//myTweets();
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
    spotify.search({ type: 'track', query: 'Can"t take a joke' }, function(err, data) {
        if ( err ) {
            console.log('Error occurred: ' + err);
            return;
        }
     
        console.log()
    });
}



//console.log(spotify);
//console.log(client);



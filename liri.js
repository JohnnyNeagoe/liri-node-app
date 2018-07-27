require("dotenv").config();
var fs = require('fs');
var keys = require('./keys')
var Twitter = require('twitter');
var listTweets;
var spotifySearch;
myTweets();
spotifyThisSong()
 
function myTweets(){
    var params = { 
    screen_name: 'JohnnyNeagoe', 
    count: '20', 
    };
    var client = new Twitter(keys.twitter);
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            for (var i = 0; i<tweets.length;i++){
                var listTweets = ('\n' + "@" + params.screen_name + "\n" + "tweeted: " + tweets[i].text + "\n" + "on :" + tweets[i].created_at)
                console.log(listTweets);

            }
        }
    });
}

function spotifyThisSong(){
    search: function({ type: 'artist OR album OR track', query: 'My search query', limit: 20 }, callback);
    var spotify = new Spotify(keys.spotify);

}



//console.log(spotify);
//console.log(client);



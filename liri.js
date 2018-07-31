require("dotenv").config();
var fs = require('fs');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var keys = require('./keys');
var listTweets;
var command = process.argv[2];
var argument = process.argv[3];
var loggedSearches = [];

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
                loggedSearches.unshift(listTweets);
            }
            myHistory();
        }
    });
}
function spotifyThisSong(){
    if (argument == null) {
		argument == 'The Sign';
    }
    var spotify = new Spotify(keys.spotify);
    spotify.search({ type: 'track', query: argument, limit: 1 }, function(err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        } myTrack = "Artist: " + data.tracks.items[0].artists[0].name + "\nSong: " + data.tracks.items[0].name + "\nAlbum : " + data.tracks.items[0].album.name + "\nRelease Date: " + data.tracks.items[0].album.release_date + "\nLink: " + data.tracks.items[0].href;
        console.log(myTrack);
        loggedSearches.unshift(myTrack);
        myHistory();
    });
}
function movieThis(){
    if (argument == null) {
		argument = 'Mr. Nobody';
	}
	var queryUrl = 'http://www.omdbapi.com/?t=' + argument +"&y=&plot=short&apikey=68f018e0";
	request(queryUrl, function(error, response, body) {
        var parseIt = JSON.parse(body)
		if(!error && response.statusCode == 200) {
			displayMovie = ('\nMovie Info \n\nTitle: ' + parseIt['Title'] + '\n\nRelease Date: ' + parseIt['Released'] + '\n\nIMDB Rating: ' + parseIt['Ratings']['0']['Value'] + '\n\nRotten Tomatoes Rating: ' + parseIt['Ratings']['1']['Value']  + '\n\nProduction Country: ' + parseIt['Country'] + '\n\nLanguage: ' + parseIt['Language'] + '\n\nSynopsis: ' + parseIt['Plot'] + '\n\nActors: ' + parseIt['Actors']);
            console.log(displayMovie); 
            loggedSearches.unshift(displayMovie);
            myHistory();
		} else console.log('omdb error or nothing matches your search.');
	});
}
function doWhatItSays(){
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
          return console.log(error);
        } 
        var dataArr = data.split("|");  
        var randomPick = dataArr[Math.floor(Math.random() * dataArr.length)];
        command = randomPick.split(",")[0].trim(); 
        argument = randomPick.split(",")[1].trim();
        choose();
      });
};
function myHistory(){
    var divider = "\n------------------------------------------------------------\n\n";
    fs.appendFile("log.txt", loggedSearches + divider , function(err) {
        if(err) {
        return console.log(err);
        }
        console.log("The file was saved!");
    });
};
function choose() {
	switch(command) {
		case 'my-tweets':
            myTweets();
			break;
		case 'spotify-this-song':
            spotifyThisSong();
			break;
		case 'movie-this':
            movieThis();
			break;
		case 'do-what-it-says':
            doWhatItSays();
			break;
		default:
			console.log("Hmm... I am not sure about that command. Please try again");
	}
}
choose();




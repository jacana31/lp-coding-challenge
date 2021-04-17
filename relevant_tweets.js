// set up the environment var from .env file
require('dotenv').config({path:'.env'});

var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  bearer_token: process.env.TWITTER_BEARER_TOKEN
});
// search for tweets '#liveperson'
client.get('search/tweets', {q: '#liveperson'}, function(error, tweets, response) {
   tweets.statuses.forEach(function(tweet) {
   	console.log("tweet: " + tweet.text)
   });
});
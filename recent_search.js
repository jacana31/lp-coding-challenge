


module.exports={ 
    getTwitts
};


// Search for Tweets within the past seven days
// https://developer.twitter.com/en/docs/twitter-api/tweets/search/quick-start/recent-search

const needle = require('needle');

// The code below sets the bearer token from your environment variables
// To set environment variables on macOS or Linux, run the export command below from the terminal:
// export BEARER_TOKEN='YOUR-TOKEN'
require('dotenv').config({path:'.env'});
const token = process.env.TWITTER_BEARER_TOKEN;


const endpointUrl = "https://api.twitter.com/2/tweets/search/recent";

async function getTwitts() {

    // Edit query parameters below
    // specify a search query, and any additional fields that are required
    // by default, only the Tweet ID and text fields are returned
    const params = {
      //  'query': 'liveperson -is:retweet',
      'query': 'liveperson',
        'tweet.fields': 'author_id'
    }
try {
    
    const res = await needle('get', endpointUrl, params, {
        headers: {
            "User-Agent": "v2RecentSearchJS",
            "authorization": `Bearer ${token}`,
            "open_timeout": "5000",
            "response_timeout" : "5000" 
        }
    })


    if (res.body) {
        return res.body;
    } else {
        throw new Error('Unsuccessful request');
    }
        
} catch (error) {
    console.log(error);
    throw new Error('Unsuccessful request');
   }
}
/*
(async () => {

    try {
        // Make request
        const response = await getTwitts();
        console.dir(response, {
            depth: null
        });

    } catch (e) {
        console.log(e);
        process.exit(-1);
    }
    process.exit();
})();
*/
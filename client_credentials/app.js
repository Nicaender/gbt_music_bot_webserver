/**
 * This is an example of a basic node.js script that performs
 * the Client Credentials oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#client_credentials_flow
 */

var request = require('request'); // "Request" library

var client_id = 'c3df6f1db7d948989c233d7f41be53ab'; // Your client id
var client_secret = 'd5b25222a8074ca18dc616f210d064e8'; // Your secret

// your application requests authorization
var authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64'))
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};

request.post(authOptions, function(error, response, body) {
  if (!error && response.statusCode === 200) {

    // use the access token to access the Spotify Web API
    var token = body.access_token;
    var options = {
      url: 'https://api.spotify.com/v1/playlists/2fw0Nid4lne2gBhCI1WRtm?si=a6e9952036eb4e47',
      headers: {
        'Authorization': 'Bearer ' + token
      },
      json: true
    };

    function requestData(options) {
      request.get(options, function(error, response, body) {
        console.log(body);
        return body;
      });
    }

    var tracks = requestData(options);
    console.log(tracks);
  }
});



const express = require('express')
const port = 50612 // you need to put your port number here

function queryHandler(req, res, next) {
    let url = req.url;
    let qObj = req.query;
    console.log(qObj);
    if (qObj.word != undefined) {
        
        // THIS IS WHERE i TAKE TEXT FROM BROWSER AND SEND IT TO THE API
        // ALSO HUNDLE IT WHEN TRANSLATION IS RECIEVED BACK FROM API SERVER
        reachGoogleApi(qObj.word, res);

        // SEND IT BACK TO THE BROWSER TO DISPLAY IT
        //res.json(respondObject);
    }
    else {
	   next();
    }
}

function fileNotFound(req, res) {
    let url = req.url;
    res.type('text/plain');
    res.status(404);
    res.send('Cannot find '+url);
}

//this fucntion returns a string in other language.
function reachGoogleApi(Eng_text, res) {
    const APIrequest = require('request');
    const http = require('http');
    let respondObject = {}; 
    const APIkey = 'AIzaSyCes0zvoquPZaDRuNF07nBEl75Eiy7Umgw';  // ADD API KEY HERE
    const url = "https://translation.googleapis.com/language/translate/v2?key="+APIkey

    // An object containing the data expressing the query to the
    // translate API. 
    // Below, gets stringified and put into the body of an HTTP PUT request.
    let requestObject = 
    {
        "source": "en",
        "target": "fa",
        "q": [
            "example phrase" // the text goes here
            ]
    }

    console.log("English phrase: ", requestObject.q[0]);
	    
// The call that makes a request to the API
// Uses the Node request module, which packs up and sends off
// an HTTP message containing the request to the API server
APIrequest(
	{ // HTTP header stuff
	    url: url,
	    method: "POST",
	    headers: {"content-type": "application/json"},
	    // will turn the given object into JSON
	    json: requestObject	},
	// callback function for API request
	APIcallback
    );

    // callback function, called when data is received from API
function APIcallback(err, APIresHead, APIresBody) {
	// gets three objects as input
	if ((err) || (APIresHead.statusCode != 200)) {
	    // API is not working
	    console.log("Got API error");
	    console.log(APIresBody);
	} else {
	    if (APIresHead.error) {
		// API worked but is not giving you data
		console.log(APIresHead.error);
	    } else {

			// THIS IS WEHRE YOU SEND IT BACK TO THE BROWSER
			console.log("In Farsi: ", 
            APIresBody.data.translations[0].translatedText);
            respondObject.translation = APIresBody.data.translations[0].translatedText;

			console.log("\n\nJSON was:");
            console.log(JSON.stringify(APIresBody, undefined, 2));
            res.json(respondObject);
			// print it out as a string, nicely formatted
	    }
	}
} // end callback function
}

// put together the server pipeline
const app = express()
app.use(express.static('public'));  // can I find a static file? 
app.get('/query', queryHandler );   // if not, is it a valid query?
app.use( fileNotFound );            // otherwise not found
app.listen(port, function (){console.log('Listening...');} )


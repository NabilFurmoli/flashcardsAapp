

const express = require('express')
const port = 50612 // you need to put your port number here

const sqlite3 = require("sqlite3").verbose();  // use sqlite
const fs = require("fs"); // file system

const dbFileName = "Flashcards.db";
// makes the object that represents the database in our code
const db = new sqlite3.Database(dbFileName);  // object, not database.


// this fucntion is triggered if the request is not static.
function queryHandler(req, res, next) {
    let url = req.url;
    console.log(url);
    //let isQuery = url.substring(1, 6);
    // if query then reachgoogle api, else its an database request.
        let qObj = req.query; // query is an object 
        console.log(qObj);
        if (qObj.word != undefined) {
            
            // THIS IS WHERE i TAKE TEXT FROM BROWSER AND SEND IT TO THE API
            // ALSO HUNDLE IT WHEN TRANSLATION IS RECIEVED BACK FROM API SERVER
            // res.json() is triggered inside this fucntion.
            reachGoogleApi(qObj.word, res);
        }
        else {
            next();
        }
    
    
}


function storeHundler(req, res, next) {
    let url = req.url;
    console.log(url);
     // reach database to save information
        let qObj = req.query;
        console.log(qObj);
        if (qObj.english != undefined && qObj.other_language != undefined) {
            
            console.log("+++++before ging to database");// go to the database and save the information then send the result back to the browser
            reachDatabase(qObj.english, qObj.other_language, res);
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

let id = 1;
function reachDatabase(english_txt, other_language_txt, res) {
    let respondObject = {};
    // respondObject.status = "woohoo I saved it";
    // res.json(respondObject);
    // Initialize table.
    // If the table already exists, causes an error.
    // Fix the error by removing or renaming Flashcards.db

    ///////////PERFORM SANITIZATION //////////////
    // validate user input before usage
    // check to string is not too long
    let columns = 'uinqe_IdNum, EngTxt, trans_txt, shownCount, ansCorreclyCount';
    const cmdStr = 'INSERT INTO Flashcards ('+columns+') VALUES(' +id+', @0, @1, 0, 0)';
    id++;
    console.log(cmdStr);
    db.run(cmdStr,english_txt, other_language_txt, tableCreationCallback);

    // Always use the callback for database operations and print out any
    // error messages you get.
    // This database stuff is hard to debug, give yourself a fighting chance.
    function tableCreationCallback(err) {
        if (err) {
        console.log("data storing error",err);
        respondObject.status = "data storing error";
        res.json(respondObject);
        } else {
        console.log("data stored");
        respondObject.status = "data stored";
        res.json(respondObject);
        //db.close();
        }
    }
}

//this fucntion returns a string in other language.
function reachGoogleApi(eng_text, res) {
    // reaching to the api server initilaizations
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
                eng_text // the text goes here
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
app.get('/store', storeHundler );
app.use( fileNotFound );            // otherwise not found
app.listen(port, function (){console.log('Listening...');} )




//client id : 260336705111-3gd5jrmbnpleva3adsu8algk2udijfq6.apps.googleusercontent.com
//client secret: 8eRKb-V1bLAx8XBpi1ToyQ8S
const googleLoginData = {
    clientID: '696152743305-sojs7aqvlas0i0rec4kn7o7rpfbks6sf.apps.googleusercontent.com',
    clientSecret: '8I9sGihgElpHSVCZh7ll4fHD',
    callbackURL: '/auth/accepted'
};


const express = require('express')
const passport = require('passport');
const cookieSession = require('cookie-session');
const sqlite3 = require("sqlite3").verbose();  // use sqlite
const fs = require("fs"); // file system
const GoogleStrategy = require('passport-google-oauth20');

const port = 54522 // you need to put your port number here

const dbFileName = "Flashcards.db";
// makes the object that represents the database in our code
const db = new sqlite3.Database(dbFileName);  // object, not database.


/////////////////////////// Login server code ///////////////////////////////
/////////////////////////////////////////////////////////////////////////////

function printURL (req, res, next) {
    console.log("\n" + req.url + "\n");
    next();
}

// function to check whether user is logged when trying to access
// personal data
function isAuthenticated(req, res, next) {
    if (req.user) {
	//console.log("Req.session:",req.session);
	//console.log("Req.user:",req.user);
	next();
    } else {
	res.redirect('/login.html');  // send response telling
	// Browser to go to login page
    }
}


// function for end of server pipeline
function fileNotFound(req, res) {
    let url = req.url;
    res.type('text/plain');
    res.status(404);
    res.send('Cannot find '+url);
    }

// Some functions Passport calls, that we can use to specialize.
// This is where we get to write our own code, not just boilerplate. 
// The callback "done" at the end of each one resumes Passport's
// internal process. 

const userInsert = "INSERT INTO Users VALUES($id, $first_name, $last_name)";

// function called during login, the second time passport.authenticate
// is called (in /auth/redirect/),
// once we actually have the profile data from Google. 
function gotProfile(accessToken, refreshToken, profile, done) {
    
    respondObject = {};    

    function tableInsertionCallback(err) {
        if (err) {
	    console.log("error");
        } else {
	    console.log("inserted user");
        }
    }

    console.log("Google profile",profile);
	//console.log(profile.given_name);
	//console.log(profile.family_name);
    // here is a good place to check if user is in DB,
    // and to store him in DB if not already there. 
    // Second arg to "done" will be passed into serializeUser,
    // should be key to get user out of database.
    let sql = `SELECT google_ID id, first_name name FROM Users WHERE google_ID = ?`;
    db.get(sql, [profile.id], (err, row) => {
	if (err) {
	    return console.error(err.message);
	}

	return row
	    ? console.log(row.id, row.name)
	    : db.run(userInsert, {$id: profile.id, $first_name: profile.name.givenName, $last_name: profile.name.familyName}, tableInsertionCallback);
    });

    let dbRowID = profile.id;  // temporary! Should be the real unique
    // key for db Row for this user in DB table.
    // Note: cannot be zero, has to be something that evaluates to
    // True.  

    done(null, dbRowID); 
}

// Part of Server's sesssion set-up.  
// The second operand of "done" becomes the input to deserializeUser
// on every subsequent HTTP request with this session's cookie. 
passport.serializeUser((dbRowID, done) => {
//    console.log("SerializeUser. Input is",dbRowID);
    done(null, dbRowID);
});

// Called by passport.session pipeline stage on every HTTP request with
// a current session cookie. 
// Where we should lookup user database info. 
// Whatever we pass in the "done" callback becomes req.user
// and can be used by subsequent middleware.
passport.deserializeUser((dbRowID, done) => {
//    console.log("deserializeUser. Input is:", dbRowID);
    // here is a good place to look up user data in database using
    // dbRowID. Put whatever you want into an object. It ends up
    // as the property "user" of the "req" object. 
    let userData = {id: dbRowID};
    done(null, userData);
});


/////////////////////////// Normal Server Code /////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
// this fucntion is triggered if the request is not static.
function queryHandler(req, res, next) {
	console.log("query found");
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

function storeHandler(req, res, next) {
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



function reachDatabase(english_txt, other_language_txt, res) {
    let respondObject = {};
    const dbStore = "INSERT INTO Flashcards VALUES(1, $eng_txt, $other_lang_txt, 0, 0)";
    
    console.log(dbStore);
    db.run(dbStore, {$eng_txt: english_txt, $other_lang_txt: other_language_txt}, tableInsertionCallback);

    // Always use the callback for database operations and print out any
    // error messages you get.
    // This database stuff is hard to debug, give yourself a fighting chance.
    function tableInsertionCallback(err) {
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

passport.use( new GoogleStrategy(googleLoginData, gotProfile) );
const app = express()

// For debugging purposes only
app.use('/', printURL);

// Change the keys???
app.use(cookieSession({
    maxAge: 6 * 60 * 60 * 1000, // Six hours in milliseconds
    // meaningless random string used by encryption
    keys: ['hanger waldo mercy dance']  
}));

// Initializes request object for further handling by passport
app.use(passport.initialize()); 

// If there is a valid cookie, will call deserializeUser()
app.use(passport.session()); 

// Public static files
app.get('/*',express.static('public'));

// Checks if the user is trying to authenticate
app.get('/auth/google',
    passport.authenticate('google',{ scope: ['profile'] }) );
    
// When google redirects back    
app.get('/auth/accepted',
	// for educational purposes
	function (req, res, next) {
	    console.log("at auth/redirect");
	    next();
	},
	// This will issue Server's own HTTPS request to Google
	// to access the user's profile information with the 
	// temporary key we got in the request. 
	passport.authenticate('google'),
	// then it will run the "gotProfile" callback function,
	// set up the cookie, call serialize, whose "done" 
	// will come back here to send back the response
	// ...with a cookie in it for the Browser! 
	function (req, res) {
	    console.log('Logged in and using cookies!'); 
	    res.redirect('/User/flashcards.html');
    });

// static files in /user are only available after login
app.get('/user/*',
	isAuthenticated, // only pass on to following function if
	// user is logged in 
	// serving files that start with /user from here gets them from ./
	express.static('.') 
       ); 
    


//app.use(express.static('public'));  // can I find a static file? 
// queries and stores should only be sent if the user is authenticated
app.get('/User/query', queryHandler );   // if not, is it a valid query?
app.get('/User/store', storeHandler );
app.get('/User/hasCards', 
	function(req, res) {
		const checkForCards = `SELECT 	eng_txt english,
						trans_txt translation,
						shownCount shownCount,
						ansCorrectlyCount correctCount
					FROM Flashcards 
					WHERE unique_IdNum = ?`;
		let resCards = {};
		resCards.Cards = new Array();
		let count = 0;
		db.all(checkForCards, [req.user.id], (err, rows) => {
		    if (err) {
		        return console.error(err.message);
		    }
		    //console.log(`${row.english}, ${row.translation}, ${row.shownCount}, ${row.correctCount}`);
		    //resCards.Cards[1] = {eng_txt: row.english, trans_txt: row.translation, shownCount: row.shownCount, ansCorrectlyCount: row.correctCount};
		    //count++;
		    
		    rows.forEach((row) => {
			resCards.Cards[count] = row;
			count++;
		    });
		    resCards.Count = count;
		    res.json(resCards);
		});
		//resCards.Count = count;

		//console.log(JSON.stringify(resCards, undefined, 2));
		//res.json(resCards);
	});

// For logging out
app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/login.html');
});

app.use( fileNotFound );            // otherwise not found
app.listen(port, function (){console.log('Listening...');} )


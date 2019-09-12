
const express = require('express');
const passport = require('passport');
const cookieSession = require('cookie-session');
const GoogleStrategy = require('passport-google-oauth20');

const port = 50612 // you need to put your port number here

// database 
const sqlite3 = require("sqlite3").verbose();  // use sqlite
const fs = require("fs"); // file system
const dbFileName = "Flashcards.db";
// makes the object that represents the database in our code
const db = new sqlite3.Database(dbFileName);  // object, not database.

const googleLoginData = {
    clientID: '260336705111-3gd5jrmbnpleva3adsu8algk2udijfq6.apps.googleusercontent.com',
    clientSecret: '8eRKb-V1bLAx8XBpi1ToyQ8S',
    callbackURL: '/auth/accepted'
};


/*******************Server pipeline Starts***************/
/********************************************************/
/********************************************************/

passport.use( new GoogleStrategy(googleLoginData, gotProfile) );

const app = express()
app.use('/', printURL);

app.use(cookieSession({
    maxAge: 6 * 60 * 60 * 1000, // Six hours in milliseconds
    // meaningless random string used by encryption
    keys: ['hanger waldo mercy dance']  
}));

// Initializes request object for further handling by passport
app.use(passport.initialize()); 
// If there is a valid cookie, will call deserializeUser()
app.use(passport.session()); 

app.get('/*',express.static('public'));  // can I find a static file? 

app.get('/auth/google',
	passport.authenticate('google',{ scope: ['profile'] }) );
// passport.authenticate sends off the 302 response
// with fancy redirect URL containing request for profile, and
// client ID string to identify this app. 

// Google redirects here after user successfully logs in
// This route has three handler functions, one run after the other. 
app.get('/auth/accepted',
	// for educational purposes
	function (req, res, next) {
        console.log("at auth/accepted");
        console.log(res.user);
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
	function (req, res, next) {
	    console.log('Logged in and using cookies!')
	    res.redirect('/user/flashcards.html');
    });
    
    //app.get('/auth/accept', page_redirection_checking);
    app.get('/user/*',
	isAuthenticated, // only pass on to following function if
	// user is logged in 
	// serving files that start with /user from here gets them from ./
	express.static('.') 
       ); 

app.get('/user/query', queryHandler );   // if not, is it a valid query?
app.get('/user/store', storeHundler );
app.get('/user/page', page_redirection_checking );
app.get('/user/userName', fetch_userNmae );
// For logging out
app.get('/logout', function(req, res){
    //removeFrom_usertabele(req);
    req.logout();
    res.redirect('/login.html');
});
app.use( fileNotFound );            // otherwise not found
app.listen(port, function (){console.log('Listening...');} )



/*******************Function calls implementations are below***************/
/**************************************************************************/
/**************************************************************************/

// middleware functions

// print the url of incoming HTTP request
function printURL (req, res, next) {
    console.log(req.url);
    next();
}

// function to check whether user is logged when trying to access
// personal data
function isAuthenticated(req, res, next) {
    if (req.user) {
	console.log("Req.session:",req.session);
	console.log("Req.user:",req.user);
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

// function called during login, the second time passport.authenticate
// is called (in /auth/redirect/),
// once we actually have the profile data from Google. 


function gotProfile(accessToken, refreshToken, profile, done) {
    console.log("Google profile",profile);
    // here is a good place to check if user is in DB,
    // and to store him in DB if not already there.
    const dbCheck = "SELECT Google_id FROM user_data WHERE Google_id = "+profile.id+"";
    console.log("cheking if user exist");
    console.log(dbCheck);
    // to accces the user data user req.user. ...
    db.get(dbCheck, dataCallback);

    // Always use the callback for database operations and print out any
    // error messages you get.
    // This database stuff is hard to debug, give yourself a fighting chance.
    function dataCallback(err, dbData) {
        if (err) {
            console.log("data Selection error",err);
        } else {
            console.log("data selection success");
            
            if(dbData == undefined) {
                InsertNewUser(profile);
            }
        }
    }
   
    // Second arg to "done" will be passed into serializeUser,
    // should be key to get user out of database.
    // temporary! Should be the real unique
    // key for db Row for this user in DB table.
    // Note: cannot be zero, has to be something that evaluates to
    // True.  
    let dbRowData = {id: profile.id, name: profile.name.givenName +" "+ profile.name.familyName};
    done(null, dbRowData); 
    
}

// Part of Server's sesssion set-up.  
// The second operand of "done" becomes the input to deserializeUser
// on every subsequent HTTP request with this session's cookie. 
passport.serializeUser((dbRowData, done) => {
    console.log("SerializeUser. Input is",dbRowData);
    done(null, dbRowData);
});

// Called by passport.session pipeline stage on every HTTP request with
// a current session cookie. 
// Where we should lookup user database info. 
// Whatever we pass in the "done" callback becomes req.user
// and can be used by subsequent middleware.

passport.deserializeUser((dbRowData, done) => {
    console.log("deserializeUser. Input is:", dbRowData);
    // here is a good place to look up user data in database using
    // dbRowID. Put whatever you want into an object. It ends up
    // as the property "user" of the "req" object. 
    let userData = dbRowData;
    console.log(userData);
    done(null, userData);
});

///////////////////////end of middleware functions//////////////


function page_redirection_checking(req, res, next) {

    console.log(req.user);
    //check if user has a flashcard in database, if not
    //redirect to creation page, else redirect to review page.
    const dbCheck = "SELECT * FROM flashcards WHERE Google_id = "+req.user.id+" ";
    console.log("page_redirection_checking: cheking if user exist");
    console.log(dbCheck);
    // to accces the user data user req.user. ...
    db.all(dbCheck, dataCallback);

    // Always use the callback for database operations and print out any
    // error messages you get.
    // This database stuff is hard to debug, give yourself a fighting chance.
    function dataCallback(err, dbData) {
        let data_object= {};
        if (err) {
            console.log("page_redirection_checking: data Selection error",err);
            next();
        } else {
            console.log("page_redirection_checking: data selection success");
            console.log("displaying dpData");
            console.log(dbData);
            if(dbData.length == 0) {
                //redirect to creation page.
                data_object = {page: "creation", cardsArray: dbData};
                res.json(data_object);
            }else {
                data_object = {page: "Review", cardsArray: dbData};
                res.json(data_object);
            }
        }
    }


}


function fetch_userNmae (req, res, next) {
    res.json(req.user);
}


function InsertNewUser(profile) {

    const dbinsert = "INSERT INTO user_data VALUES($user_id, $f_name, $g_name)";
    
    console.log(dbinsert);
    // to accces the user data user req.user. ...
    db.run(dbinsert, {$user_id: profile.id ,$f_name: profile.name.familyName, $g_name: profile.name.givenName}, tableInsertionCallback);

    // Always use the callback for database operations and print out any
    // error messages you get.
    // This database stuff is hard to debug, give yourself a fighting chance.
    function tableInsertionCallback(err) {
        if (err) {
        console.log("userdb; new user insertion error",err);
        
        } else {
        console.log("userdb; new user insertion success");
    
        }
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
            reachDatabase(qObj.english, qObj.other_language,req, res);
        }
        else {
            next();
        }
    
}


function reachDatabase(english_txt, other_language_txt,req, res) {
    let respondObject = {};
    const dbStore = "INSERT INTO Flashcards VALUES($user_id, $eng_txt, $other_lang_txt, 0, 0)";
    
    console.log(dbStore);
    // to accces the user data user req.user. ...
    db.run(dbStore, {$user_id: req.user.id ,$eng_txt: english_txt, $other_lang_txt: other_language_txt}, tableInsertionCallback);

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

function fileNotFound(req, res) {
    let url = req.url;
    res.type('text/plain');
    res.status(404);
    res.send('Cannot find '+url);
}


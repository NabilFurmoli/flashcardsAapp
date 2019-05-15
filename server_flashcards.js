const express = require('express')
const port = 50612 // you need to put your port number here

function queryHandler(req, res, next) {
    let url = req.url;
    let qObj = req.query;
    console.log(qObj);
    if (qObj.word != undefined) {

        let respondObject = {};
        respondObject.pal = qObj.word;
        res.json(respondObject);
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


function palindrome(text) {
// Split, reverse and join string to get reversed text
var reversedText  = text.toLowerCase()
                    .split('').reverse().join('');

return text = text + reversedText;
}

// put together the server pipeline
const app = express()
app.use(express.static('public'));  // can I find a static file? 
app.get('/query', queryHandler );   // if not, is it a valid query?
app.use( fileNotFound );            // otherwise not found
app.listen(port, function (){console.log('Listening...');} )


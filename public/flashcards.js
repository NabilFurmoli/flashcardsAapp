
// created an http request
function createCORSRequest(method, url) {
  let xhr = new XMLHttpRequest();
  xhr.open(method, url, true);  // call its open method
  return xhr;
}

// make and http request and hundles when the respond is back.
function makeCorsRequest() {
    let url;
    let theWord = document.getElementById("word").value;
    
    url = "query?word=" + theWord;
    
    //console.log(url);
        let xhr = createCORSRequest('GET', url);

          // checking if browser does CORS
          if (!xhr) {
            alert('CORS not supported');
            return;
          }

          // Load some functions into response handlers.
          //runs when respond is back.
          xhr.onload = function() {
              let object = JSON.parse(xhr.responseText); 
              //console.log(JSON.stringify(object, undefined, 2));

              var content = document.getElementById("outputGoesHere");
              content.textContent = object.translation;
		          console.log(object);
	
              console.log("i am done");
          };

          xhr.onerror = function() {
            alert('Woops, there was an error making the request.');
          };

          // Actually send request to server
    xhr.send();
  return   
}

var textInput = document.getElementById('word');
// Init a timeout variable to be used below
var timeout = null;
// Listen for keystroke events
textInput.onkeyup = function (e) {

    // Clear the timeout if it has already been set.
    // This will prevent the previous task from executing
    // if it has been less than <MILLISECONDS>
    clearTimeout(timeout);

    // Make a new timeout set to go off in 800ms
    timeout = setTimeout(makeCorsRequest, 500);
};



function createCORSRequest(method, url) {
  let xhr = new XMLHttpRequest();
  xhr.open(method, url, true);  // call its open method
  return xhr;
}

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
          xhr.onload = function() {
              let object = JSON.parse(xhr.responseText); 
              //console.log(JSON.stringify(object, undefined, 2));

              var content = document.getElementById("outputGoesHere");
              content.textContent = object.pal;
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

makeCorsRequest();
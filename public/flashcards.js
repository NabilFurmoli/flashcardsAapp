


class Logo extends React.Component {

  render() {
    return (
      React.createElement("div", { className: "logo_div" },
      React.createElement("button", { id: "logo_butt_id" }, " Start Review "),
      React.createElement("h1", null, " Lango! ")));


  }}



class Text_components extends React.Component {
  render() {
    return (
      React.createElement("div", { className: "txtbox_div" },
      React.createElement("textarea", { id: "input_txtbox_id", placeholder: "English" }),
      React.createElement("p", { id: "output_txtbox_id" }, "....")));


  }}


class Save_button extends React.Component {
  render() {
    return (
      React.createElement("div", { className: "save_butt_div" },
      React.createElement("button", { onClick: RequestToSave, id: "save_butt_id" }, " Save ")));


  }}


class Footer extends React.Component {
  render() {
    return (
      React.createElement("div", { className: "username_div" },
      React.createElement("p", null, " UserName ")));


  }}


class MainPage extends React.Component {
  render() {
    return (
      React.createElement("div", { className: "page_div" },
      React.createElement(Logo, null),
      React.createElement(Text_components, null),
      React.createElement(Save_button, null),
      React.createElement(Footer, null)));


  }}


let parent = document.getElementById("root");
ReactDOM.render(React.createElement(MainPage, null), parent);

/* Browser operations' source code goes here */

let translated_txt = "default translation";
// created an http request
function createCORSRequest(method, url) {
  let xhr = new XMLHttpRequest();
  xhr.open(method, url, true);  // call its open method
  return xhr;
}

// make and http request and hundles when the respond is back.
// ajax request to translate
function requestToTranslate() {
    let url;
    let theWord = document.getElementById("input_txtbox_id").value;
    
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

              var content = document.getElementById("output_txtbox_id");
              content.textContent = object.translation;
              translated_txt = object.translation;
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

// AJAX request to save data into the database.
function RequestToSave() {
  let url;
  let Eng_text = document.getElementById("input_txtbox_id").value;
  
  url = "store?english=" + Eng_text + "&" + "other_language=" + translated_txt;
  
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
            // var content = document.getElementById("outputGoesHere");
            // content.textContent = object.translation;
            console.log(object.status); // object.status shoud = "saved!"

            //console.log("i am done");
        };

        xhr.onerror = function() {
          alert('Woops, there was an error to save.');
        };

        // Actually send request to server
  xhr.send();
return   
}

var textInput = document.getElementById('input_txtbox_id');
// Init a timeout variable to be used below
var timeout = null;
// Listen for keystroke events
textInput.onkeyup = function (e) {

    // Clear the timeout if it has already been set.
    // This will prevent the previous task from executing
    // if it has been less than <MILLISECONDS>
    clearTimeout(timeout);

    // Make a new timeout set to go off in 800ms
    timeout = setTimeout(requestToTranslate, 500);
};

Object.defineProperty(exports, "__esModule", { value: true });exports.Text_components = exports.translated_txt = void 0;function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}
let translated_txt = "default translation";

// created an http request
exports.translated_txt = translated_txt;function createCORSRequest(method, url) {
  let xhr = new XMLHttpRequest();
  xhr.open(method, url, true); // call its open method
  return xhr;
}


////////////// Main page codes /////////////////
////////////////////////////////////////////////
class Text_components extends React.Component {constructor(...args) {super(...args);_defineProperty(this, "state",
    { input_txt: "", trans_txt: "" });_defineProperty(this, "requestToTranslate1",

    event => {

      if (event.charCode == 13) {
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
        xhr.onload = () => {
          let object = JSON.parse(xhr.responseText);
          //console.log(JSON.stringify(object, undefined, 2));

          //var content = document.getElementById("output_txtbox_id");
          //content.textContent = object.translation;
          exports.translated_txt = translated_txt = object.translation;
          this.setState({ trans_txt: translated_txt });
          console.log(object);

          console.log("i am done");
        };

        xhr.onerror = function () {
          alert('Woops, there was an error making the request.');
        };

        // Actually send request to server
        xhr.send();
      }

    });}
  render() {
    return (
      React.createElement("div", { className: "txtbox_div" },
      React.createElement("textarea", { placeholder: "English", className: "textbox_1", id: "input_txtbox_id", onKeyPress: this.requestToTranslate1 }),
      React.createElement("p", { className: "textbox_2", id: "output_txtbox_id" }, " ", this.state.trans_txt, " ")));


  }}exports.Text_components = Text_components;
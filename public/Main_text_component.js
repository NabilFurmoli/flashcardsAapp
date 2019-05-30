function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;} ////// page file jsx

let translated_txt = "default translation";

// created an http request
function createCORSRequest(method, url) {
  let xhr = new XMLHttpRequest();
  xhr.open(method, url, true); // call its open method
  return xhr;
}

class Logo extends React.Component {

  constructor(props) {
    super(props);_defineProperty(this, "state", { butt_name: "" });
    this.state.butt_name = this.props.button_name;
  }
  render() {
    return (
      React.createElement("div", { className: "logo_div" },
      React.createElement("button", { className: "logo_butt", id: "start_review_butt_id" }, " ", this.state.butt_name, " "),
      React.createElement("h1", null, " Lango! ")));


  }}



class Text_components extends React.Component {constructor(...args) {super(...args);_defineProperty(this, "state",
    { input_txt: "", output_txt: "" });_defineProperty(this, "requestToTranslate1",

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
        xhr.onload = function () {
          let object = JSON.parse(xhr.responseText);
          //console.log(JSON.stringify(object, undefined, 2));

          var content = document.getElementById("output_txtbox_id");
          content.textContent = object.translation;
          translated_txt = object.translation;
          console.log(object);

          console.log("i am done");
        };

        xhr.onerror = function () {
          alert('Woops, there was an error making the request.');
        };

        // Actually send request to server
        xhr.send();

        this.setState({ output_txt: inp_txt });
      }

    });}
  render() {
    return (
      React.createElement("div", { className: "txtbox_div" },
      React.createElement("textarea", { placeholder: "English", className: "textbox_1", id: "input_txtbox_id", onKeyPress: this.requestToTranslate1 }),
      React.createElement("p", { className: "textbox_2", id: "output_txtbox_id" }, " ", this.state.output_txt, " ")));


  }}


class Lower_button extends React.Component {

  constructor(props) {
    super(props);_defineProperty(this, "state", { butt_name: "", id: "" });
    this.state.butt_name = this.props.button_name;
    this.state.id = this.props.id;
  }
  render() {
    return (
      React.createElement("div", { className: "lower_butt_div" },
      React.createElement("button", { id: this.state.id + "_butt_id" }, " ", this.state.butt_name, " ")));


  }}


class Footer extends React.Component {

  constructor(props) {
    super(props);_defineProperty(this, "state", { user_name: "deafault" });
    this.state.user_name = this.props.user_name;
  }
  render() {
    return (
      React.createElement("div", { className: "username_div" },
      React.createElement("p", null, " UserName ")));


  }}


class MainPage extends React.Component {

  render() {
    return (
      React.createElement("div", { className: "page_div" },
      React.createElement(Logo, { button_name: "Start Review" }),
      React.createElement(Text_components, null),
      React.createElement(Lower_button, { id: "save", button_name: "Save" }),
      React.createElement(Footer, { user_name: "deafult: Nabil Furmoli" })));


  }}


let parent = document.getElementById("root");
ReactDOM.render(React.createElement(MainPage, null), parent);


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
  xhr.onload = function () {
    let object = JSON.parse(xhr.responseText);
    //console.log(JSON.stringify(object, undefined, 2));
    // var content = document.getElementById("outputGoesHere");
    // content.textContent = object.translation;
    console.log(object.status); // object.status shoud = "saved!"
    //console.log("i am done");
  };

  xhr.onerror = function () {
    alert('Woops, there was an error to save.');
  };

  // Actually send request to server
  xhr.send();
  return;
}


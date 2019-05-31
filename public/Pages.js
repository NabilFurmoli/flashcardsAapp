
var _Main_text_component = require("./Main_text_component.js");

function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

function createCORSRequest(method, url) {
  let xhr = new XMLHttpRequest();
  xhr.open(method, url, true); // call its open method
  return xhr;
}


/////////  Reusable Shared components //////////////////
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


///////////////// Review Page codes ////////////////////////
////////////////////////////////////////////////////////////

class Review_txt_components extends React.Component {

  render() {
    return (
      React.createElement("div", { className: "rev_txtbox_div" },
      React.createElement("p", { className: "rev_textbox_2", id: "rev_output_txtbox_id" }, " "),
      React.createElement("textarea", { placeholder: "English", className: "rev_textbox_1", id: "rev_input_txtbox_id" })));


  }}



//////////// Pages component //////////////////
/////////////////////////////////////////////
class Pages extends React.Component {constructor(...args) {super(...args);_defineProperty(this, "state",
    { current_page: "Main" });_defineProperty(this, "changeToRevPage",

    () => {
      this.setState({ current_page: "Review" });
    });_defineProperty(this, "changeToMainPage",

    () => {
      this.setState({ current_page: "Main" });
    });_defineProperty(this, "RequestToSave",

    () => {
      let url;
      let Eng_text = document.getElementById("input_txtbox_id").value;

      url = "store?english=" + Eng_text + "&" + "other_language=" + _Main_text_component.translated_txt;

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
    });}

  render() {
    // Main page
    if (this.state.current_page === "Main") {
      return (

        React.createElement("div", { className: "page_div" },

        React.createElement("div", { className: "logo_div" },
        React.createElement("button", { className: "logo_butt", id: "start_review_butt_id", onClick: this.changeToRevPage }, " \"Start Review\" "),
        React.createElement("h1", null, " Lango! ")),

        React.createElement(_Main_text_component.Text_components, null),
        React.createElement("div", { className: "lower_butt_div" },
        React.createElement("button", { id: "save_butt_id", onClick: this.RequestToSave }, " \"Save\" ")),

        React.createElement(Footer, { user_name: "deafult: Nabil Furmoli" })));




    } // Review page
    else if (this.state.current_page === "Review") {
        return (

          React.createElement("div", { className: "page_div" },

          React.createElement("div", { className: "logo_div" },
          React.createElement("button", { className: "logo_butt", id: "add_butt_id", onClick: this.changeToMainPage }, " \"Add\" "),
          React.createElement("h1", null, " Lango! ")),

          React.createElement(Review_txt_components, null),
          React.createElement("div", { className: "lower_butt_div" },
          React.createElement("button", { id: "next_butt_id" }, " \"Next\" ")),

          React.createElement(Footer, { user_name: "deafult: Nabil Furmoli" })));




      }
  }}


let parent = document.getElementById("root");
ReactDOM.render(React.createElement(Pages, null), parent);
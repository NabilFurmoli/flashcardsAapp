

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
      React.createElement("button", { id: "save_butt_id" }, " Save ")));


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
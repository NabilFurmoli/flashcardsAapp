


class Welcome extends React.Component {
  render() {
    return (

      React.createElement("div", { className: "left_div" },
      React.createElement("h1", null, " Welcome to "),
      React.createElement("h1", null, " Lango "),
      React.createElement("h3", null, " Costumize your vocabulary ")));
  }}

class Login_Page extends React.Component {

  render() {
    return (
      React.createElement("div", { className: "login_page_div" },
      React.createElement(Welcome, null),
      React.createElement("div", { className: "right_div" },
      React.createElement("div", { className: "sign_in_div" },
      React.createElement("div", { className: "google_icon_div" },
      React.createElement("img", { src: "./search.png" })),
      React.createElement("button", null, " Log in with Google ")))));

  }}


let parent = document.getElementById("root");
ReactDOM.render(React.createElement(Login_Page, null), parent);
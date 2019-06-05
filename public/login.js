function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Welcome =
/*#__PURE__*/
function (_React$Component) {
  "use strict";

  _inherits(Welcome, _React$Component);

  function Welcome() {
    _classCallCheck(this, Welcome);

    return _possibleConstructorReturn(this, _getPrototypeOf(Welcome).apply(this, arguments));
  }

  _createClass(Welcome, [{
    key: "render",
    value: function render() {
      return React.createElement("div", {
        className: "left_div"
      }, React.createElement("h1", null, " Welcome to "), React.createElement("h1", null, " Lango "), React.createElement("h3", null, " Customize your vocabulary "));
    }
  }]);

  return Welcome;
}(React.Component);

var Login_Page =
/*#__PURE__*/
function (_React$Component2) {
  "use strict";

  _inherits(Login_Page, _React$Component2);

  function Login_Page() {
    _classCallCheck(this, Login_Page);

    return _possibleConstructorReturn(this, _getPrototypeOf(Login_Page).apply(this, arguments));
  }

  _createClass(Login_Page, [{
    key: "render",
    value: function render() {
      return React.createElement("div", {
        className: "login_page_div"
      }, React.createElement(Welcome, null), React.createElement("div", {
        className: "right_div"
      }, React.createElement("div", {
        className: "sign_in_div"
      }, React.createElement("div", {
        className: "google_icon_div"
      }, React.createElement("img", {
        src: "./search.png"
      })), React.createElement("button", {
        onClick: function onClick() {
          location.href = "auth/google";
        }
      }, " Log in with Google "))));
    }
  }]);

  return Login_Page;
}(React.Component);

function loginAJAX() {
  url = 'auth/google';
  xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);

  xhr.onload = function () {
    console.log('logged in!');
  };

  xhr.onerror = function () {
    console.log('browser sees error');
  };

  xhr.send();
}

var parent = document.getElementById("root");
ReactDOM.render(React.createElement(Login_Page, null), parent);
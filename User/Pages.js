function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var translated_txt = "default translation"; ////////////// Main page codes /////////////////
////////////////////////////////////////////////

var Text_components =
/*#__PURE__*/
function (_React$Component) {
  "use strict";

  _inherits(Text_components, _React$Component);

  function Text_components() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Text_components);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Text_components)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      input_txt: "",
      trans_txt: ""
    });

    _defineProperty(_assertThisInitialized(_this), "requestToTranslate1", function (event) {
      if (event.charCode == 13) {
        var url;
        var theWord = document.getElementById("input_txtbox_id").value;
        url = "query?word=" + theWord; //console.log(url);

        var xhr = createCORSRequest('GET', url); // checking if browser does CORS

        if (!xhr) {
          alert('CORS not supported');
          return;
        } // Load some functions into response handlers.
        //runs when respond is back.


        xhr.onload = function () {
          var object = JSON.parse(xhr.responseText); //console.log(JSON.stringify(object, undefined, 2));
          //var content = document.getElementById("output_txtbox_id");
          //content.textContent = object.translation;

          translated_txt = object.translation;

          _this.setState({
            trans_txt: translated_txt
          });

          console.log(object);
          console.log("i am done");
        };

        xhr.onerror = function () {
          alert('Woops, there was an error making the request.');
        }; // Actually send request to server


        xhr.send();
      }
    });

    return _this;
  }

  _createClass(Text_components, [{
    key: "render",
    value: function render() {
      return React.createElement("div", {
        className: "txtbox_div"
      }, React.createElement("textarea", {
        placeholder: "English",
        className: "textbox_1",
        id: "input_txtbox_id",
        onKeyPress: this.requestToTranslate1
      }), React.createElement("p", {
        className: "textbox_2",
        id: "output_txtbox_id"
      }, " ", this.state.trans_txt, " "));
    }
  }]);

  return Text_components;
}(React.Component); //import {Text_components, translated_txt} from './Main_text_component.js';


function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  xhr.open(method, url, true); // call its open method

  return xhr;
} /////////  Reusable Shared components //////////////////


var Footer =
/*#__PURE__*/
function (_React$Component2) {
  "use strict";

  _inherits(Footer, _React$Component2);

  function Footer(props) {
    var _this2;

    _classCallCheck(this, Footer);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(Footer).call(this, props));

    _defineProperty(_assertThisInitialized(_this2), "state", {
      user_name: "deafault"
    });

    _this2.state.user_name = _this2.props.user_name;
    return _this2;
  }

  _createClass(Footer, [{
    key: "render",
    value: function render() {
      return React.createElement("div", {
        className: "username_div"
      }, React.createElement("p", null, " UserName "));
    }
  }]);

  return Footer;
}(React.Component); ///////////////// Review Page codes ////////////////////////
////////////////////////////////////////////////////////////


var Review_txt_components =
/*#__PURE__*/
function (_React$Component3) {
  "use strict";

  _inherits(Review_txt_components, _React$Component3);

  function Review_txt_components() {
    _classCallCheck(this, Review_txt_components);

    return _possibleConstructorReturn(this, _getPrototypeOf(Review_txt_components).apply(this, arguments));
  }

  _createClass(Review_txt_components, [{
    key: "render",
    value: function render() {
      return React.createElement("div", {
        className: "rev_txtbox_div"
      }, React.createElement("p", {
        className: "rev_textbox_2",
        id: "rev_output_txtbox_id"
      }, " "), React.createElement("textarea", {
        placeholder: "English",
        className: "rev_textbox_1",
        id: "rev_input_txtbox_id"
      }));
    }
  }]);

  return Review_txt_components;
}(React.Component); //////////// Pages component //////////////////
/////////////////////////////////////////////


var Pages =
/*#__PURE__*/
function (_React$Component4) {
  "use strict";

  _inherits(Pages, _React$Component4);

  function Pages(props) {
    var _this3;

    _classCallCheck(this, Pages);

    _this3 = _possibleConstructorReturn(this, _getPrototypeOf(Pages).call(this, props)); // Don't call this.setState() here!
    //loginAJAX();

    _defineProperty(_assertThisInitialized(_this3), "changeToRevPage", function () {
      _this3.setState({
        current_page: "Review"
      });
    });

    _defineProperty(_assertThisInitialized(_this3), "changeToMainPage", function () {
      _this3.setState({
        current_page: "Main"
      });
    });

    _defineProperty(_assertThisInitialized(_this3), "RequestToSave", function () {
      var url;
      var Eng_text = document.getElementById("input_txtbox_id").value;
      url = "store?english=" + Eng_text + "&" + "other_language=" + translated_txt; //console.log(url);

      var xhr = createCORSRequest('GET', url); // checking if browser does CORS

      if (!xhr) {
        alert('CORS not supported');
        return;
      } // Load some functions into response handlers.
      //runs when respond is back.


      xhr.onload = function () {
        var object = JSON.parse(xhr.responseText); //console.log(JSON.stringify(object, undefined, 2));
        // var content = document.getElementById("outputGoesHere");
        // content.textContent = object.translation;

        console.log(object.status); // object.status shoud = "saved!"
        //console.log("i am done");
      };

      xhr.onerror = function () {
        alert('Woops, there was an error to save.');
      }; // Actually send request to server


      xhr.send();
      return;
    });

    _this3.state = {
      current_page: "Main"
    };
    _this3.changeToRevPage = _this3.changeToRevPage.bind(_assertThisInitialized(_this3));
    return _this3;
  }

  _createClass(Pages, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var url = '/User/hasCards';
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);

      xhr.onload = function () {
        var obj = JSON.parse(this.responseText);

        if (obj.Count > 0) {
          this.changeToRevPage(); //this.setState({current_page: "Review"});
        }
      }; //state = {current_page: "Main"};


      xhr.onerror = function () {
        console.log('browser sees error');
      };

      xhr.send();
    }
  }, {
    key: "render",
    value: function render() {
      // Main page
      if (this.state.current_page === "Main") {
        return React.createElement("div", {
          className: "page_div"
        }, React.createElement("div", {
          className: "logo_div"
        }, React.createElement("button", {
          className: "logo_butt",
          id: "start_review_butt_id",
          onClick: this.changeToRevPage
        }, " Start Review "), React.createElement("h1", null, " Lango! ")), React.createElement(Text_components, null), React.createElement("div", {
          className: "lower_butt_div"
        }, React.createElement("button", {
          id: "save_butt_id",
          onClick: this.RequestToSave
        }, " Save ")), React.createElement(Footer, {
          user_name: "deafult: Nabil Furmoli"
        }));
      } // Review page
      else if (this.state.current_page === "Review") {
          return React.createElement("div", {
            className: "page_div"
          }, React.createElement("div", {
            className: "logo_div"
          }, React.createElement("button", {
            className: "logo_butt",
            id: "add_butt_id",
            onClick: this.changeToMainPage
          }, " Add "), React.createElement("h1", null, " Lango! ")), React.createElement(Review_txt_components, null), React.createElement("div", {
            className: "lower_butt_div"
          }, React.createElement("button", {
            id: "next_butt_id"
          }, " Next ")), React.createElement(Footer, {
            user_name: "deafult: Nabil Furmoli"
          }));
        }
    }
  }]);

  return Pages;
}(React.Component);

var parent = document.getElementById("root");
ReactDOM.render(React.createElement(Pages, null), parent);
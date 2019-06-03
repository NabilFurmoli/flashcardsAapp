var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { Text_components, translated_txt } from './Main_text_component.js';

function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  xhr.open(method, url, true); // call its open method
  return xhr;
}

/////////  Reusable Shared components //////////////////

var Footer = function (_React$Component) {
  _inherits(Footer, _React$Component);

  function Footer(props) {
    _classCallCheck(this, Footer);

    var _this = _possibleConstructorReturn(this, (Footer.__proto__ || Object.getPrototypeOf(Footer)).call(this, props));

    _this.state = { user_name: "deafault" };

    _this.componentDidMount = function () {
      var url = "/user/userName";
      var xhr = createCORSRequest('GET', url);

      // checking if browser does CORS
      if (!xhr) {
        alert('CORS not supported');
        return;
      }
      // Load some functions into response handlers.
      //runs when respond is back.
      xhr.onload = function () {
        var object = JSON.parse(xhr.responseText);

        console.log(object.name);

        _this.setState({ user_name: object.name });

        //console.log("i am done");
      };

      xhr.onerror = function () {
        alert('Woops, there was an error to save.');
      };

      // Actually send request to server
      console.log("before sending user/username req");
      xhr.send();
    };

    return _this;
  }

  _createClass(Footer, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "username_div" },
        React.createElement(
          "p",
          null,
          this.state.user_name
        )
      );
    }
  }]);

  return Footer;
}(React.Component);

///////////////// Review Page codes ////////////////////////
////////////////////////////////////////////////////////////

var Review_txt_components = function (_React$Component2) {
  _inherits(Review_txt_components, _React$Component2);

  function Review_txt_components(props) {
    _classCallCheck(this, Review_txt_components);

    var _this2 = _possibleConstructorReturn(this, (Review_txt_components.__proto__ || Object.getPrototypeOf(Review_txt_components)).call(this, props));

    _this2.state = { current_output: "farsi", cardCount: 0 };

    _this2.flipToNextCard = function () {

      // if end of card start from zero index.
      if (_this2.state.cardCount == _this2.state.cards.length - 1) {
        _this2.setState({ cardCount: 0 });
      } else {
        _this2.setState({ cardCount: _this2.state.cardCount + 1 });
      }

      _this2.setState({ current_output: _this2.state.cards[_this2.state.cardCount].trans_txt });
    };

    _this2.checkForCorrection = function (event) {
      // might to make it more optimizez by case cheking and triming and staff.
      var user_ans = document.getElementById("rev_input_txtbox_id").value;
      console.log("event.charchode: " + event.charCode);
      if (event.charCode == 13) {
        console.log(user_ans.toLowerCase().trim() + " = " + _this2.state.cards[_this2.state.cardCount].EngTxt.toLowerCase().trim());
        if (user_ans.toLowerCase().trim() == _this2.state.cards[_this2.state.cardCount - 1].EngTxt.toLowerCase().trim()) {
          alert("Correct");
          console.log("correct");
        } else {
          alert("incorrect");
          console.log("incorrect");
        }
      }
    };

    console.log("rev_txt_comp, the array is:" + _this2.props.array);
    _this2.state.cards = _this2.props.array;
    _this2.state.current_output = _this2.state.cards[0].trans_txt;
    return _this2;
  }

  _createClass(Review_txt_components, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "rev_txtbox_div" },
        React.createElement(
          "p",
          { className: "rev_textbox_2", onClick: this.flipToNextCard, id: "rev_output_txtbox_id" },
          this.state.current_output
        ),
        React.createElement("textarea", { placeholder: "English", className: "rev_textbox_1", id: "rev_input_txtbox_id", onKeyPress: this.checkForCorrection })
      );
    }
  }]);

  return Review_txt_components;
}(React.Component);

//////////// Pages component //////////////////
/////////////////////////////////////////////


var Pages = function (_React$Component3) {
  _inherits(Pages, _React$Component3);

  function Pages() {
    var _ref;

    var _temp, _this3, _ret;

    _classCallCheck(this, Pages);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this3 = _possibleConstructorReturn(this, (_ref = Pages.__proto__ || Object.getPrototypeOf(Pages)).call.apply(_ref, [this].concat(args))), _this3), _this3.state = { current_page: "creation", cards_array: null }, _this3.changeToRevPage = function () {
      // when the user changes back to review page you want to refetch cards from database since
      // since maybe user has added new cards.
      // this call also changes current_page to review page.
      _this3.requestFor_CardsData();
    }, _this3.changeToCreationPage = function () {
      _this3.setState({ current_page: "creation" });
    }, _this3.requestFor_CardsData = function () {
      var url = "/user/page";
      var xhr = createCORSRequest('GET', url);

      // checking if browser does CORS
      if (!xhr) {
        alert('CORS not supported');
        return;
      }
      // Load some functions into response handlers.
      //runs when respond is back.
      xhr.onload = function () {
        var object = JSON.parse(xhr.responseText);

        console.log(object);
        _this3.setState({ current_page: "Review", cards_array: object.cardsArray });
        //console.log("i am done");
      };

      xhr.onerror = function () {
        alert('Woops, there was an error to save.');
      };

      // Actually send request to server
      console.log("before sending user/page req");
      xhr.send();
    }, _this3.RequestToSave = function () {
      var url = void 0;
      var Eng_text = document.getElementById("input_txtbox_id").value;

      url = "store?english=" + Eng_text + "&" + "other_language=" + translated_txt;

      //console.log(url);
      var xhr = createCORSRequest('GET', url);

      // checking if browser does CORS
      if (!xhr) {
        alert('CORS not supported');
        return;
      }
      // Load some functions into response handlers.
      //runs when respond is back.
      xhr.onload = function () {
        var object = JSON.parse(xhr.responseText);
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
    }, _temp), _possibleConstructorReturn(_this3, _ret);
  }

  _createClass(Pages, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this4 = this;

      var url = "/user/page";
      var xhr = createCORSRequest('GET', url);

      // checking if browser does CORS
      if (!xhr) {
        alert('CORS not supported');
        return;
      }
      // Load some functions into response handlers.
      //runs when respond is back.
      xhr.onload = function () {
        var object = JSON.parse(xhr.responseText);

        console.log(object);
        if (object.page == "creation") {
          _this4.setState({ current_page: object.page, cards_array: object.cardsArray });
        } else {
          _this4.setState({ current_page: object.page, cards_array: object.cardsArray });
        }
        //console.log("i am done");
      };

      xhr.onerror = function () {
        alert('Woops, there was an error to save.');
      };

      // Actually send request to server
      console.log("before sending user/page req");
      xhr.send();
    }
  }, {
    key: "render",
    value: function render() {
      // Main page
      if (this.state.current_page === "creation") {
        return React.createElement(
          "div",
          { className: "page_div" },
          React.createElement(
            "div",
            { className: "logo_div" },
            React.createElement(
              "button",
              { className: "logo_butt", id: "start_review_butt_id", onClick: this.changeToRevPage },
              " Start Review "
            ),
            React.createElement(
              "h1",
              null,
              " Lango! "
            )
          ),
          React.createElement(Text_components, null),
          React.createElement(
            "div",
            { className: "lower_butt_div" },
            React.createElement(
              "button",
              { id: "save_butt_id", onClick: this.RequestToSave },
              " Save "
            )
          ),
          React.createElement(Footer, null)
        );
      } // Review page
      else if (this.state.current_page === "Review") {
          return React.createElement(
            "div",
            { className: "page_div" },
            React.createElement(
              "div",
              { className: "logo_div" },
              React.createElement(
                "button",
                { className: "logo_butt", id: "add_butt_id", onClick: this.changeToCreationPage },
                " Add "
              ),
              React.createElement(
                "h1",
                null,
                " Lango! "
              )
            ),
            React.createElement(Review_txt_components, { array: this.state.cards_array }),
            React.createElement(
              "div",
              { className: "lower_butt_div" },
              React.createElement(
                "button",
                { id: "next_butt_id" },
                " Next "
              )
            ),
            React.createElement(Footer, null)
          );
        }
    }
  }]);

  return Pages;
}(React.Component);

var parent = document.getElementById("root");
ReactDOM.render(React.createElement(Pages, null), parent);
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

var translated_txt = "default translation";
var cardObject = {};
var cardIndex = 0;
var flipped = false; ////////////// Main page codes /////////////////
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

    _defineProperty(_assertThisInitialized(_this2), "componentDidMount", function () {
      var url = '/User/name';
      var newXhr = createCORSRequest('GET', url);

      if (!newXhr) {
        alert('CORS not supported');
      }

      newXhr.onload = function () {
        //cardObject = JSON.parse(this.responseText); 
        //console.log(JSON.parse(this.responseText));
        var nameObject = JSON.parse(newXhr.responseText);

        _this2.setState({
          user_name: nameObject.name
        }); //document.getElementById("username_div").text = cardObject.name;

      }; //state = {current_page: "Main"};


      newXhr.onerror = function () {
        console.log('browser sees error');
      };

      newXhr.send();
    });

    _this2.state.user_name = _this2.props.user_name;
    return _this2;
  }

  _createClass(Footer, [{
    key: "render",
    value: function render() {
      return React.createElement("div", {
        className: "username_div"
      }, React.createElement("p", null, " ", this.state.user_name, " "));
    }
  }]);

  return Footer;
}(React.Component); ///////////////// Review Page codes ////////////////////////
////////////////////////////////////////////////////////////


var CardFront =
/*#__PURE__*/
function (_React$Component3) {
  "use strict";

  _inherits(CardFront, _React$Component3);

  function CardFront() {
    _classCallCheck(this, CardFront);

    return _possibleConstructorReturn(this, _getPrototypeOf(CardFront).apply(this, arguments));
  }

  _createClass(CardFront, [{
    key: "render",
    value: function render(props) {
      return React.createElement("div", {
        className: "card-side side-front"
      }, React.createElement("div", {
        className: "card-side-container"
      }, React.createElement("p", {
        id: "cardFront_p_id"
      }, this.props.text)));
    }
  }]);

  return CardFront;
}(React.Component); // React component for the back side of the card


var CardBack =
/*#__PURE__*/
function (_React$Component4) {
  "use strict";

  _inherits(CardBack, _React$Component4);

  function CardBack() {
    _classCallCheck(this, CardBack);

    return _possibleConstructorReturn(this, _getPrototypeOf(CardBack).apply(this, arguments));
  }

  _createClass(CardBack, [{
    key: "render",
    value: function render(props) {
      return React.createElement("div", {
        className: "card-side side-back"
      }, React.createElement("div", {
        className: "card-side-container"
      }, React.createElement("p", {
        id: "cardBack_p_id"
      }, this.props.text)));
    }
  }]);

  return CardBack;
}(React.Component); // React component for the card (main component)


var Card =
/*#__PURE__*/
function (_React$Component5) {
  "use strict";

  _inherits(Card, _React$Component5);

  function Card() {
    var _getPrototypeOf3;

    var _this3;

    _classCallCheck(this, Card);

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    _this3 = _possibleConstructorReturn(this, (_getPrototypeOf3 = _getPrototypeOf(Card)).call.apply(_getPrototypeOf3, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this3), "flipCard", function () {
      if (flipped) {
        // skip alot of checking, just perform the visual flip until next card is gotten
        document.getElementById("card_body").classList.toggle("flipped");
        return;
      } // get answer


      var user_ans = document.getElementById("rev_input_txtbox_id").value;
      console.log(user_ans);
      console.log(cardObject.Cards[cardIndex]);
      var card = cardObject.Cards[cardIndex]; // check correct answer

      if (user_ans.toLowerCase().trim() == card.english.toLowerCase().trim()) {
        // set back of flipcard to correct
        document.getElementById('cardBack_p_id').textContent = "Correct!";
        cardObject.Cards[cardIndex].correctCount++; // update db entry

        var url = 'query?shownCount=' + card.shownCount + '&correctCount=' + cardObject.Cards[cardIndex].correctCount + '&english=' + card.english;
        var newXhr = createCORSRequest('GET', url);

        if (!newXhr) {
          alert('CORS not supported');
        }

        newXhr.onload = function () {
          // done
          console.log("updated db entry");
        };

        newXhr.onerror = function () {
          console.error("failed to update db entry");
        };

        newXhr.send();
      } else {
        // set back of flipcard to the answer 
        document.getElementById('cardBack_p_id').textContent = card.english;
      } // flip card


      document.getElementById("card_body").classList.toggle("flipped");
      flipped = true;
    });

    return _this3;
  }

  _createClass(Card, [{
    key: "render",
    value: function render(props) {
      return React.createElement("div", {
        className: "rev_textbox_2 card-container"
      }, React.createElement("div", {
        id: "card_body",
        className: "card-body",
        onClick: this.flipCard
      }, React.createElement(CardBack, {
        text: this.props.eng_txt
      }), React.createElement(CardFront, {
        text: this.props.trans_txt
      })));
    }
  }]);

  return Card;
}(React.Component);

var Review_txt_components =
/*#__PURE__*/
function (_React$Component6) {
  "use strict";

  _inherits(Review_txt_components, _React$Component6);

  function Review_txt_components() {
    var _getPrototypeOf4;

    var _this4;

    _classCallCheck(this, Review_txt_components);

    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    _this4 = _possibleConstructorReturn(this, (_getPrototypeOf4 = _getPrototypeOf(Review_txt_components)).call.apply(_getPrototypeOf4, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this4), "flipCard", function () {
      if (flipped) {
        // skip alot of checking, just perform the visual flip until next card is gotten
        document.getElementById("card_body").classList.toggle("flipped");
        return;
      } // get answer


      var user_ans = document.getElementById("rev_input_txtbox_id").value;
      console.log(user_ans);
      console.log(cardObject.Cards[cardIndex]);
      var card = cardObject.Cards[cardIndex]; // check correct answer

      if (user_ans.toLowerCase().trim() == card.english.toLowerCase().trim()) {
        // set back of flipcard to correct
        document.getElementById('cardBack_p_id').textContent = "Correct!";
        cardObject.Cards[cardIndex].correctCount++; // update db entry

        var url = 'query?shownCount=' + card.shownCount + '&correctCount=' + cardObject.Cards[cardIndex].correctCount + '&english=' + card.english;
        var newXhr = createCORSRequest('GET', url);

        if (!newXhr) {
          alert('CORS not supported');
        }

        newXhr.onload = function () {
          // done
          console.log("updated db entry");
        };

        newXhr.onerror = function () {
          console.error("failed to update db entry");
        };

        newXhr.send();
      } else {
        // set back of flipcard to the answer 
        document.getElementById('cardBack_p_id').textContent = card.english;
      } // flip card


      document.getElementById("card_body").classList.toggle("flipped");
      flipped = true;
    });

    _defineProperty(_assertThisInitialized(_this4), "checkAnswer", function (event) {
      if (event.charCode == 13 && flipped != true) {
        _this4.flipCard();
      }
    });

    return _this4;
  }

  _createClass(Review_txt_components, [{
    key: "render",
    value: function render() {
      return React.createElement("div", {
        className: "rev_txtbox_div"
      }, React.createElement(Card, {
        className: "rev_textbox_2",
        id: "rev_output_txtbox_id",
        eng_txt: "english",
        trans_txt: "translation"
      }), React.createElement("textarea", {
        placeholder: "English",
        className: "rev_textbox_1",
        id: "rev_input_txtbox_id",
        onKeyPress: this.checkAnswer
      }));
    }
  }]);

  return Review_txt_components;
}(React.Component); //////////// Pages component //////////////////
/////////////////////////////////////////////


var Pages =
/*#__PURE__*/
function (_React$Component7) {
  "use strict";

  _inherits(Pages, _React$Component7);

  function Pages(props) {
    var _this5;

    _classCallCheck(this, Pages);

    _this5 = _possibleConstructorReturn(this, _getPrototypeOf(Pages).call(this, props)); // Don't call this.setState() here!
    //loginAJAX();

    _defineProperty(_assertThisInitialized(_this5), "requestCards", function () {
      console.log("started fetch");
      var url = '/User/cards';
      var newXhr = createCORSRequest('GET', url);

      if (!newXhr) {
        alert('CORS not supported');
      }

      newXhr.onload = function () {
        cardObject = JSON.parse(newXhr.responseText);
        console.log(cardObject);

        if (cardObject.Count == 0) {
          alert("You have no saved Flashcards, please add some.");
        } else {
          _this5.setState({
            current_page: "Review"
          });

          _this5.getNextCard();
        }
      };

      newXhr.onerror = function () {
        console.error("request failed");
      };

      newXhr.send();
    });

    _defineProperty(_assertThisInitialized(_this5), "changeToMainPage", function () {
      _this5.setState({
        current_page: "Main"
      });
    });

    _defineProperty(_assertThisInitialized(_this5), "getNextCard", function () {
      // reset flip ///////////
      flipped = false;
      document.getElementById("card_body").classList.remove("flipped"); /////////////////////////

      cardIndex = getRandomInt(cardObject.Count);
      console.log(cardIndex);
      var card = cardObject.Cards[cardIndex];
      console.log(card);
      var score = Math.max(1, 5 - card.correctCount) + Math.max(1, 5 - card.shownCount) + 5 * ((card.shownCount - card.correctCount) / card.shownCount);
      var randomScoreVal = getRandomInt(15);

      if (score >= randomScoreVal) {
        // show card
        document.getElementById("cardFront_p_id").textContent = card.translation + " debug: " + card.english + ", " + card.shownCount; // update cardObject

        cardObject.Cards[cardIndex].shownCount++; // update db entry

        var url = 'query?shownCount=' + cardObject.Cards[cardIndex].shownCount + '&correctCount=' + card.correctCount + '&english=' + card.english;
        var newXhr = createCORSRequest('GET', url);

        if (!newXhr) {
          alert('CORS not supported');
        }

        newXhr.onload = function () {
          // done
          console.log("updated db entry");
        };

        newXhr.onerror = function () {
          console.error("failed to update db entry");
        };

        newXhr.send();
      } else {
        _this5.getNextCard();
      }
    });

    _defineProperty(_assertThisInitialized(_this5), "RequestToSave", function () {
      var url;
      var Eng_text = document.getElementById("input_txtbox_id").value;

      if (Eng_text == "") {
        alert("Please add a phrase to be saved");
        return;
      } else {
        url = "store?english=" + Eng_text + "&" + "other_language=" + translated_txt;
      } //console.log(url);


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
    });

    _this5.state = {
      current_page: "Main"
    }; //this.changeToRevPage = this.changeToRevPage.bind(this);
    //this.changeToMainPage = this.changeToMainPage.bind(this);
    //this.requestCards = this.requestCards.bind(this);

    return _this5;
  } //state = {current_page: "Main"};


  _createClass(Pages, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this6 = this;

      var url = '/User/cards';
      var newXhr = createCORSRequest('GET', url);

      if (!newXhr) {
        alert('CORS not supported');
      }

      newXhr.onload = function () {
        //cardObject = JSON.parse(this.responseText); 
        //console.log(JSON.parse(this.responseText));
        cardObject = JSON.parse(newXhr.responseText);
        console.log(cardObject);

        if (cardObject.Count > 0) {
          //this.changeToRevPage();
          _this6.setState({
            current_page: "Review"
          });

          _this6.getNextCard();
        } //document.getElementById("username_div").text = cardObject.name;

      }; //state = {current_page: "Main"};

        if (obj.Count > 0) {
          this.changeToRevPage(); //this.setState({current_page: "Review"});
        }
      }; //state = {current_page: "Main"};

      newXhr.onerror = function () {
        console.log('browser sees error');
      };

      newXhr.send();
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
          onClick: this.requestCards
        }, " Start Review "), React.createElement("h1", null, " Lango! ")), React.createElement(Text_components, null), React.createElement("div", {
          className: "lower_butt_div"
        }, React.createElement("button", {
          id: "save_butt_id",
          onClick: this.RequestToSave
        }, " Save ")), React.createElement(Footer, {
          user_name: "Default User"
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
            id: "next_butt_id",
            onClick: this.getNextCard
          }, " Next ")), React.createElement(Footer, {
            user_name: "Default User"
          }));
        }
    }
  }]);

  return Pages;
}(React.Component);

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

var parent = document.getElementById("root");
ReactDOM.render(React.createElement(Pages, null), parent);
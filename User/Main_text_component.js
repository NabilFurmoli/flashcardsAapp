var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.proto_ = superClass; }

export var translated_txt = "default translation";

// created an http request
function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  xhr.open(method, url, true); // call its open method
  return xhr;
}

////////////// Main page codes /////////////////
////////////////////////////////////////////////
export var Text_components = function (_React$Component) {
  _inherits(Text_components, _React$Component);

  function Text_components() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Text_components);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Text_components.proto_ || Object.getPrototypeOf(Text_components)).call.apply(_ref, [this].concat(args))), _this), _this.state = { input_txt: "", trans_txt: "" }, _this.requestToTranslate1 = function (event) {

      if (event.charCode == 13) {
        var url = void 0;
        var theWord = document.getElementById("input_txtbox_id").value;

        url = "query?word=" + theWord;

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

          //var content = document.getElementById("output_txtbox_id");
          //content.textContent = object.translation;
          translated_txt = object.translation;
          _this.setState({ trans_txt: translated_txt });
          console.log(object);

          console.log("i am done");
        };

        xhr.onerror = function () {
          alert('Woops, there was an error making the request.');
        };

        // Actually send request to server
        xhr.send();
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Text_components, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "txtbox_div" },
        React.createElement("textarea", { placeholder: "English", className: "textbox_1", id: "input_txtbox_id", onKeyPress: this.requestToTranslate1 }),
        React.createElement(
          "p",
          { className: "textbox_2", id: "output_txtbox_id" },
          " ",
          this.state.trans_txt,
          " "
        )
      );
    }
  }]);

  return Text_components;
}(React.Component);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Welcome = function (_React$Component) {
    _inherits(Welcome, _React$Component);

    function Welcome() {
        _classCallCheck(this, Welcome);

        return _possibleConstructorReturn(this, (Welcome.__proto__ || Object.getPrototypeOf(Welcome)).apply(this, arguments));
    }

    _createClass(Welcome, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "left_div" },
                React.createElement(
                    "h1",
                    null,
                    " Welcome to "
                ),
                React.createElement(
                    "h1",
                    null,
                    " Lango "
                ),
                React.createElement(
                    "h3",
                    null,
                    " Costumize your vocabulary "
                )
            );
        }
    }]);

    return Welcome;
}(React.Component);

var Login_Page = function (_React$Component2) {
    _inherits(Login_Page, _React$Component2);

    function Login_Page() {
        _classCallCheck(this, Login_Page);

        return _possibleConstructorReturn(this, (Login_Page.__proto__ || Object.getPrototypeOf(Login_Page)).apply(this, arguments));
    }

    _createClass(Login_Page, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "login_page_div" },
                React.createElement(Welcome, null),
                React.createElement(
                    "div",
                    { className: "right_div" },
                    React.createElement(
                        "div",
                        { className: "sign_in_div" },
                        React.createElement(
                            "div",
                            { className: "google_icon_div" },
                            React.createElement("img", { src: "./search.png" })
                        ),
                        React.createElement(
                            "button",
                            { onClick: function onClick() {
                                    location.href = "auth/google";
                                } },
                            " Log in with Google "
                        )
                    )
                )
            );
        }
    }]);

    return Login_Page;
}(React.Component);

var parent = document.getElementById("root");
ReactDOM.render(React.createElement(Login_Page, null), parent);
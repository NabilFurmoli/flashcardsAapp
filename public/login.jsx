


class Welcome extends React.Component {
    render () {
        return (

            <div className="left_div">
                <h1> Welcome to </h1>
                <h1> Lango </h1>
                <h3> Customize your vocabulary </h3>
            </div> 
        );
    }
}

class Login_Page extends React.Component {

    render () {
        return (
            <div className="login_page_div">
                <Welcome/>
                <div className="right_div">
                    <div className="sign_in_div">
                        <div className="google_icon_div">
                            <img src="./search.png"/>
                        </div>
                        <button onClick="loginAJAX"> Log in with Google </button>
                    </div>
                    
                </div> 
            </div>
        );
    }
}

function loginAJAX() {
    url = 'auth/google';
    xhr = new XMLHttpRequest();
    xhr.open('GET',url,true);
    xhr.onload = function () { console.log('logged in!'); };
    xhr.onerror = function () { console.log('browser sees error');}; 
    xhr.send();
}

let parent = document.getElementById("root");
ReactDOM.render(<Login_Page/>, parent)


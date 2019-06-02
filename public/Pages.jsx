
import {Text_components, translated_txt} from './Main_text_component.js';

function createCORSRequest(method, url) {
  let xhr = new XMLHttpRequest();
  xhr.open(method, url, true);  // call its open method
  return xhr;
 }


 /////////  Reusable Shared components //////////////////
class Footer extends React.Component {
state = {user_name: "deafault"};
constructor(props){
  super(props);
  this.state.user_name = this.props.user_name;
}
render() {
  return (
      <div className="username_div">
          <p> UserName </p> 
      </div>
    );
  }
}

///////////////// Review Page codes ////////////////////////
////////////////////////////////////////////////////////////

class Review_txt_components extends React.Component {

  render() {
    return (
      <div className="rev_txtbox_div">
        <p className="rev_textbox_2" id="rev_output_txtbox_id"> </p>
        <textarea placeholder="English" className="rev_textbox_1" id="rev_input_txtbox_id"/>
     </div>
    );
  }
}
 

//////////// Pages component //////////////////
/////////////////////////////////////////////
 class Pages extends React.Component {
    state = {current_page: "creation"};

    changeToRevPage = () => {
      this.setState({current_page: "Review"});
    }

    changeToCreationPage = () => {
      this.setState({current_page: "creation"});
    }

    componentDidMount() {
      let url = "/user/page";
      let xhr = createCORSRequest('GET', url);
     
            // checking if browser does CORS
            if (!xhr) {
              alert('CORS not supported');
              return;
            }
            // Load some functions into response handlers.
            //runs when respond is back.
            xhr.onload = () => {
                let object = JSON.parse(xhr.responseText); 
               
                console.log(object.page);
                if (object.page == "creation") {
                  this.setState({current_page: object.page});
                  
                } else {
                  this.setState({current_page: object.page});
                }
                //console.log("i am done");
            };
     
            xhr.onerror = function() {
              alert('Woops, there was an error to save.');
            };
     
            // Actually send request to server
            console.log("before sending user/page req");
      xhr.send();
    }
    
     RequestToSave = () => {
      let url;
      let Eng_text = document.getElementById("input_txtbox_id").value;
      
      url = "store?english=" + Eng_text + "&" + "other_language=" + translated_txt;
      
      //console.log(url);
          let xhr = createCORSRequest('GET', url);
     
            // checking if browser does CORS
            if (!xhr) {
              alert('CORS not supported');
              return;
            }
            // Load some functions into response handlers.
            //runs when respond is back.
            xhr.onload = function() {
                let object = JSON.parse(xhr.responseText); 
                //console.log(JSON.stringify(object, undefined, 2));
                // var content = document.getElementById("outputGoesHere");
                // content.textContent = object.translation;
                console.log(object.status); // object.status shoud = "saved!"
                //console.log("i am done");
            };
     
            xhr.onerror = function() {
              alert('Woops, there was an error to save.');
            };
     
            // Actually send request to server
      xhr.send();
     return   
     }

  render () {
    // Main page
    if (this.state.current_page === "creation") {
      return (

        <div className="page_div">

          <div className="logo_div">
            <button className="logo_butt" id="start_review_butt_id" onClick= {this.changeToRevPage}> Start Review </button>
            <h1> Lango! </h1>
          </div>
          <Text_components/>
          <div className="lower_butt_div">
              <button id="save_butt_id" onClick= {this.RequestToSave}> Save </button> 
          </div>
          <Footer user_name="deafult: Nabil Furmoli"/>

        </div>
        );

    } // Review page
    else if (this.state.current_page === "Review") {
      return (

        <div className="page_div">

           <div className="logo_div">
            <button className="logo_butt" id="add_butt_id" onClick={this.changeToCreationPage}> Add </button>
            <h1> Lango! </h1>
           </div>
           <Review_txt_components/>
           <div className="lower_butt_div">
              <button id="next_butt_id"> Next </button> 
           </div>
           <Footer user_name="deafult: Nabil Furmoli"/>

        </div>
     );

    }
  }
}

let parent = document.getElementById("root");
ReactDOM.render(<Pages/>, parent)

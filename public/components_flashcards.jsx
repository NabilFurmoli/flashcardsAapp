////// page file jsx

let translated_txt = "default translation";

// created an http request
function createCORSRequest(method, url) {
  let xhr = new XMLHttpRequest();
  xhr.open(method, url, true);  // call its open method
  return xhr;
 }

 /////////  Reusable Shared components //////////////////
class Logo extends React.Component {
  state = {butt_name: ""};
   constructor (props) {
     super(props);
     this.state.butt_name = this.props.button_name;
   }
 render () {
   return (
     <div className="logo_div">
       <button className="logo_butt" id="start_review_butt_id"> {this.state.butt_name} </button>
       <h1> Lango! </h1>
     </div>
   );
 }
}

class Lower_button extends React.Component {
  state = {butt_name: "", id: ""};
  constructor(props){
    super(props)
    this.state.butt_name = this.props.button_name;
    this.state.id = this.props.id;
  }
render() {
 return (
   <div className="lower_butt_div">
      <button id={this.state.id+"_butt_id"}> {this.state.butt_name} </button> 
   </div>
 );
}
}

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

////////////// Main page codes /////////////////
////////////////////////////////////////////////
class Text_components extends React.Component {
  state = {input_txt: "", output_txt: ""};

  requestToTranslate1 = (event) => {
    
    if (event.charCode == 13) {
            let url;
   let theWord = document.getElementById("input_txtbox_id").value;
   
   url = "query?word=" + theWord;
   
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

             var content = document.getElementById("output_txtbox_id");
             content.textContent = object.translation;
             translated_txt = object.translation;
             console.log(object);
 
             console.log("i am done");
         };

         xhr.onerror = function() {
           alert('Woops, there was an error making the request.');
         };

         // Actually send request to server
   xhr.send();
      
           this.setState({output_txt: this.inp_txt});
        }
   
  }
 render() {
   return (
     <div className="txtbox_div">
       <textarea placeholder="English" className="textbox_1" id="input_txtbox_id" onKeyPress = {this.requestToTranslate1}/>
       <p className="textbox_2" id="output_txtbox_id"> {this.state.output_txt} </p>
     </div>
   );
 }
}



// class MainPage extends React.Component {
 
//  render() {
//     return (
//        <div className="page_div">
//           <Logo button_name="Start Review"/>
//           <Text_components/>
//           <Lower_button id="save" button_name="Save"/>
//           <Footer user_name="deafult: Nabil Furmoli"/>
//        </div>
//     );
//  }
// }

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

// class ReviewPage extends React.Component {
 
//   render() {
//      return (
//         <div className="page_div">
//            <Logo button_name="Add"/>
//            <Review_txt_components/>
//            <Lower_button id="save" button_name="Next"/>
//            <Footer user_name="deafult: Nabil Furmoli"/>
//         </div>
//      );
//   }
//  }
 

 class Pages extends React.Component {
    state = {uper_butt_name: "Add"};
  render () {
    if (this.state.uper_butt_name === "Add") {
      return (
        <div className="page_div">
          <Logo button_name="Start Review"/>
          <Text_components/>
          <Lower_button id="save" button_name="Save"/>
          <Footer user_name="deafult: Nabil Furmoli"/>
        </div>
        );
    } 
    else if (this.state.uper_butt_name === "Start Review") {
      return (
        <div className="page_div">
           <Logo button_name="Add"/>
           <Review_txt_components/>
           <Lower_button id="save" button_name="Next"/>
           <Footer user_name="deafult: Nabil Furmoli"/>
        </div>
     );
    }
  }
}


let parent = document.getElementById("root");
ReactDOM.render(<Pages/>, parent)





// make and http request and hundles when the respond is back.
// ajax request to translate
// function requestToTranslate() {
//    let url;
//    let theWord = document.getElementById("input_txtbox_id").value;
   
//    url = "query?word=" + theWord;
   
//    //console.log(url);
//        let xhr = createCORSRequest('GET', url);

//          // checking if browser does CORS
//          if (!xhr) {
//            alert('CORS not supported');
//            return;
//          }

//          // Load some functions into response handlers.
//          //runs when respond is back.
//          xhr.onload = function() {
//              let object = JSON.parse(xhr.responseText); 
//              //console.log(JSON.stringify(object, undefined, 2));

//              var content = document.getElementById("output_txtbox_id");
//              content.textContent = object.translation;
//              translated_txt = object.translation;
//              console.log(object);
 
//              console.log("i am done");
//          };

//          xhr.onerror = function() {
//            alert('Woops, there was an error making the request.');
//          };

//          // Actually send request to server
//    xhr.send();
//  return   
// }

// AJAX request to save data into the database.
function RequestToSave() {
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

// var textInput = document.getElementById('input_txtbox_id');
// // Init a timeout variable to be used below
// var timeout = null;
// // Listen for keystroke events
// textInput.onkeyup = function (e) {

//    // Clear the timeout if it has already been set.
//    // This will prevent the previous task from executing
//    // if it has been less than <MILLISECONDS>
//    clearTimeout(timeout);

//    // Make a new timeout set to go off in 800ms
//    timeout = setTimeout(requestToTranslate, 500);
// };


/////////////////////////////////////////////////////////////////////////////

/// Review page jsx


// class Logo extends React.Component {
 
//   render () {
//     return (
//       <div className="logo_div">
//         <button className="logo_butt" id="add_butt_id"> Add </button>
//         <h1> Lango! </h1>
//       </div>
//     );
//   }
// }


// class Text_components extends React.Component {
//   render() {
//     return (
//       <div className="txtbox_div">
//         <textarea className="textbox_1" id="translation_txtbox_id"/>
//         <p className="textbox_2" id="english_txtbox_id"> .... </p>
//       </div>
//     );
//   }
// }

// class Next_button extends React.Component {
//   render() {
//     return (
//       <div className="lower_butt_div">
//          <button id="next_butt_id"> Next</button> 
//       </div>
//     );
//   }
// }

// class Footer extends React.Component {
//   render() {
//     return (
//       <div className="username_div">
//          <p> UserName </p> 
//       </div>
//     );
//   }
// }

// class Review_Page extends React.Component {
//   render() {
//      return (
//         <div className="page_div">
//            <Logo/>
//            <Text_components/>
//            <Next_button/>
//            <Footer/>
//         </div>
//      );
//   }
// }

// let parent = document.getElementById("root");
// ReactDOM.render(<Review_Page />, parent)
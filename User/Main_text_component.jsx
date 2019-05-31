
export let translated_txt = "default translation";

// created an http request
 function createCORSRequest(method, url) {
  let xhr = new XMLHttpRequest();
  xhr.open(method, url, true);  // call its open method
  return xhr;
 }


 ////////////// Main page codes /////////////////
////////////////////////////////////////////////
export class Text_components extends React.Component {
    state = {input_txt: "", trans_txt: ""};
  
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
                    xhr.onload = () => {
                        let object = JSON.parse(xhr.responseText); 
                        //console.log(JSON.stringify(object, undefined, 2));
  
                        //var content = document.getElementById("output_txtbox_id");
                        //content.textContent = object.translation;
                        translated_txt = object.translation;
                        this.setState({trans_txt: translated_txt});
                        console.log(object);
            
                        console.log("i am done");
                    };
  
                    xhr.onerror = function() {
                      alert('Woops, there was an error making the request.');
                    };
  
                    // Actually send request to server
              xhr.send();
          }
     
    }
   render() {
     return (
       <div className="txtbox_div">
         <textarea placeholder="English" className="textbox_1" id="input_txtbox_id" onKeyPress = {this.requestToTranslate1}/>
         <p className="textbox_2" id="output_txtbox_id"> {this.state.trans_txt} </p>
       </div>
     );
   }
  }
  

let translated_txt = "default translation";


let cardObject = {};
let cardIndex = 0;
let flipped = false;

 ////////////// Main page codes /////////////////
////////////////////////////////////////////////
class Text_components extends React.Component {
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
  

//import {Text_components, translated_txt} from './Main_text_component.js';

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

componentDidMount = () => {
  	let url = '/User/name';
    let newXhr = createCORSRequest('GET', url);
    
    if (!newXhr) {
      alert('CORS not supported'); 
    }
     
    newXhr.onload = () => { 
      	//cardObject = JSON.parse(this.responseText); 
      	//console.log(JSON.parse(this.responseText));
        let nameObject = JSON.parse(newXhr.responseText);
		this.setState({user_name: nameObject.name});
      
      	//document.getElementById("username_div").text = cardObject.name;
    }
    //state = {current_page: "Main"};

    newXhr.onerror = function () { console.log('browser sees error');};
    newXhr.send();
}

render() {
  return (
      <div className="username_div">
          <p> {this.state.user_name} </p> 
      </div>
    );
  }
}

///////////////// Review Page codes ////////////////////////
////////////////////////////////////////////////////////////

class CardFront extends React.Component {
  render(props) {
    return(
      <div className='card-side side-front'>
         <div className='card-side-container'>
              <p id='cardFront_p_id'>{this.props.text}</p>
        </div>
      </div>
    )
  }
}

 // React component for the back side of the card
class CardBack extends React.Component {
  render(props) {
    return(
      <div className='card-side side-back'>
         <div className='card-side-container'>
              <p id='cardBack_p_id'>{this.props.text}</p>
        </div>
      </div>
    )
  }
}

 // React component for the card (main component)
class Card extends React.Component {
  
  flipCard = () => {
    if (flipped) {
 	// skip alot of checking, just perform the visual flip until next card is gotten
      document.getElementById("card_body").classList.toggle("flipped");
      
      return;
    }
    
    // get answer
      	let user_ans = document.getElementById("rev_input_txtbox_id").value;
      	console.log(user_ans);
      	console.log(cardObject.Cards[cardIndex]);
      	let card = cardObject.Cards[cardIndex];
     	// check correct answer
      	if (user_ans.toLowerCase().trim() == card.english.toLowerCase().trim()) 		{
      	
        // set back of flipcard to correct
        document.getElementById('cardBack_p_id').textContent = "Correct!";
        
        cardObject.Cards[cardIndex].correctCount++;
        // update db entry
        let url = 'query?shownCount=' + card.shownCount + '&correctCount=' + cardObject.Cards[cardIndex].correctCount + '&english=' + card.english;	
      	let newXhr = createCORSRequest('GET', url);
    
        if (!newXhr) {
          alert('CORS not supported'); 
        }
        newXhr.onload = () => { 
      		// done
          	console.log("updated db entry");
    	}
        
        newXhr.onerror = function() {console.error("failed to update db entry");}
        
        newXhr.send();
        }
      	else {
         	// set back of flipcard to the answer 
          	document.getElementById('cardBack_p_id').textContent = card.english;
        }
      
        // flip card
      	document.getElementById("card_body").classList.toggle("flipped");
    flipped = true;
      	
  }
  
  render(props) {
    return(
      <div className='rev_textbox_2 card-container'>
        <div id="card_body" className='card-body' onClick={this.flipCard}>
          <CardBack text={this.props.eng_txt} />

           <CardFront text={this.props.trans_txt} />
        </div>
      </div>
    )
  }
}

class Review_txt_components extends React.Component {

  flipCard = () => {
    if (flipped) {
 	// skip alot of checking, just perform the visual flip until next card is gotten
      document.getElementById("card_body").classList.toggle("flipped");
      
      return;
    }
    
    // get answer
      	let user_ans = document.getElementById("rev_input_txtbox_id").value;
      	console.log(user_ans);
      	console.log(cardObject.Cards[cardIndex]);
      	let card = cardObject.Cards[cardIndex];
     	// check correct answer
      	if (user_ans.toLowerCase().trim() == card.english.toLowerCase().trim()) 		{
      	
        // set back of flipcard to correct
        document.getElementById('cardBack_p_id').textContent = "Correct!";
        
        cardObject.Cards[cardIndex].correctCount++;
        // update db entry
        let url = 'query?shownCount=' + card.shownCount + '&correctCount=' + cardObject.Cards[cardIndex].correctCount + '&english=' + card.english;	
      	let newXhr = createCORSRequest('GET', url);
    
        if (!newXhr) {
          alert('CORS not supported'); 
        }
        newXhr.onload = () => { 
      		// done
          	console.log("updated db entry");
    	}
        
        newXhr.onerror = function() {console.error("failed to update db entry");}
        
        newXhr.send();
        }
      	else {
         	// set back of flipcard to the answer 
          	document.getElementById('cardBack_p_id').textContent = card.english;
        }
      
        // flip card
      	document.getElementById("card_body").classList.toggle("flipped");
    flipped = true;
      	
  }
  
  checkAnswer = (event) => {
    if (event.charCode == 13 && flipped != true) {
      	this.flipCard();
    }
  }
  
  render() {
    return (
      <div className="rev_txtbox_div">
        	<Card className="rev_textbox_2" id="rev_output_txtbox_id" eng_txt={"english"} trans_txt={"translation"}></Card>
        <textarea placeholder="English" className="rev_textbox_1" id="rev_input_txtbox_id" onKeyPress={this.checkAnswer}/>
     </div>
    );
  }
}
 

//////////// Pages component //////////////////
/////////////////////////////////////////////

 class Pages extends React.Component {
   constructor(props) {
  	super(props);
  // Don't call this.setState() here!
  //loginAJAX();
    
  this.state = { current_page: "Main" };
  //this.changeToRevPage = this.changeToRevPage.bind(this);
  //this.changeToMainPage = this.changeToMainPage.bind(this);
     //this.requestCards = this.requestCards.bind(this);
  }
   //state = {current_page: "Main"};
   
   componentDidMount() {
    let url = '/User/cards';
    let newXhr = createCORSRequest('GET', url);
    
    if (!newXhr) {
      alert('CORS not supported'); 
    }
     
    newXhr.onload = () => { 
      	//cardObject = JSON.parse(this.responseText); 
      	//console.log(JSON.parse(this.responseText));
        cardObject = JSON.parse(newXhr.responseText);
        console.log(cardObject);
      	if (cardObject.Count > 0) {
          //this.changeToRevPage();
          this.setState({current_page: "Review"});
          this.getNextCard();
        }
      
      	//document.getElementById("username_div").text = cardObject.name;
    }
    //state = {current_page: "Main"};

    newXhr.onerror = function () { console.log('browser sees error');};
    newXhr.send();
   }
   
    requestCards = () => {
      console.log("started fetch");
      
		let url = '/User/cards';
      	let newXhr = createCORSRequest('GET', url);
    
        if (!newXhr) {
          alert('CORS not supported'); 
        }
        newXhr.onload = () => { 
      		cardObject = JSON.parse(newXhr.responseText);
          	console.log(cardObject);
			if(cardObject.Count == 0){
                  alert("You have no saved Flashcards, please add some.");
                }else {
                  this.setState({current_page: "Review"});
                  this.getNextCard();
                }
    	}
        
        newXhr.onerror = function() {console.error("request failed");}
        
        newXhr.send();
    }

    changeToMainPage = () => {
      this.setState({current_page: "Main"});
    }
    
    getNextCard = () => {
      // reset flip ///////////
      flipped = false;
      document.getElementById("card_body").classList.remove("flipped");
      /////////////////////////
      
       cardIndex = getRandomInt(cardObject.Count);
      console.log(cardIndex);
       let card = cardObject.Cards[cardIndex];
      console.log(card);
       let score = ( Math.max(1,5 - card.correctCount) + Math.max(1, 5 -card.shownCount) + 5 * ( (card.shownCount - card.correctCount ) / card.shownCount) );
      
      let randomScoreVal = getRandomInt(15);
      if (score >= randomScoreVal) {
      	// show card
        document.getElementById("cardFront_p_id").textContent = card.translation + " debug: " + card.english + ", " + card.shownCount;
        
        // update cardObject
        cardObject.Cards[cardIndex].shownCount++;
        
        // update db entry
        let url = 'query?shownCount=' + cardObject.Cards[cardIndex].shownCount + '&correctCount=' + card.correctCount + '&english=' + card.english;
      	let newXhr = createCORSRequest('GET', url);
    
        if (!newXhr) {
          alert('CORS not supported'); 
        }
        newXhr.onload = () => { 
      		// done
          	console.log("updated db entry");
    	}
        
        newXhr.onerror = function() {console.error("failed to update db entry");}
        
        newXhr.send();
      }
      else {
        this.getNextCard(); 
      }
    }
    
     RequestToSave = () => {
       
      let url;
      let Eng_text = document.getElementById("input_txtbox_id").value;
      
      if (Eng_text == ""){
        alert("Please add a phrase to be saved");
        return;
      } else {
        url = "store?english=" + Eng_text + "&" + "other_language=" + translated_txt;
      }
      
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
      }

  render () {
    // Main page
    if (this.state.current_page === "Main") {
      return (

        <div className="page_div">

          <div className="logo_div">
            <button className="logo_butt" id="start_review_butt_id" onClick= {this.requestCards}> Start Review </button>
            <h1> Lango! </h1>
          </div>
          <Text_components/>
          <div className="lower_butt_div">
              <button id="save_butt_id" onClick= {this.RequestToSave}> Save </button> 
          </div>
          <Footer user_name="Default User" />

        </div>
        );

    } // Review page
    else if (this.state.current_page === "Review") {
      return (

        <div className="page_div">

           <div className="logo_div">
            <button className="logo_butt" id="add_butt_id" onClick={this.changeToMainPage}> Add </button>
            <h1> Lango! </h1>
           </div>
           <Review_txt_components/>
           <div className="lower_butt_div">
              <button id="next_butt_id" onClick={this.getNextCard}> Next </button> 
           </div>
           <Footer user_name="Default User"/>

        </div>
     );

    }
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

let parent = document.getElementById("root");
ReactDOM.render(<Pages/>, parent)

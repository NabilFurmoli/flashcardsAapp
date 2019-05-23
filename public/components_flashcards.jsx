
class Logo extends React.Component {
  
  render () {
    return (
      <div className="log_div">
        <button id="logo_butt_id"> Start Review </button>
        <h1> Lango! </h1>
      </div>
    );
  }
}


class Text_components extends React.Component {
  render() {
    return (
      <div className="txtbox_div">
        <textarea id="input_txtbox_id"/>
        <p id="output_txtbox_id"> .... </p>
      </div>
    );
  }
}

class Save_button extends React.Component {
  render() {
    return (
      <div className="save_butt_div">
         <button onClick= {RequestToSave} id="save_butt_id"> Save </button> 
      </div>
    );
  }
}

class Footer extends React.Component {
  render() {
    return (
      <div className="username_div">
         <p> UserName </p> 
      </div>
    );
  }
}

class MainPage extends React.Component {
  render() {
     return (
        <div className="page_div">
           <Logo/>
           <Text_components/>
           <Save_button/>
           <Footer/>
        </div>
     );
  }
}

let parent = document.getElementById("root");
ReactDOM.render(<MainPage/>, parent)
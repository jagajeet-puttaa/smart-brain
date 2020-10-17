import React, {Component} from 'react';
import './App.css';
import Navigation from './Components/Navigation/Navigation';
import SignIn from './Components/SignIn/SignIn';
import Register from './Components/Register/Register';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Particles from 'react-particles-js';
import Logo from './Components/Logo/Logo';
import Rank from './Components/Rank/Rank';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import 'tachyons';

const particlesOptions = {
  particles: {
    number: {
      value : 100,
      density : {
        enable : true,
        value_area : 800}
        }
      }
};

const initialState = {
    input : '',
    imageUrl : '',
    box : {},
    route : 'signin',
    isSignedIn : false,
    user : {
      id : '',
      name : '',
      email : '',
      entries : 0,
      joined : ''
  }
}

class App extends Component{
  constructor(){
    super()
    this.state = initialState;
  }

  loadUser=(data)=>{
    this.setState({
      user : {
        id : data.id,
        name : data.name,
        email : data.email,
        entries : data.entries,
        joined : data.joined
      }
    })
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace =  data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol : clarifaiFace.left_col * width,
      topRow : clarifaiFace.top_row * height,
      rightCol : width - (clarifaiFace.right_col * width),
      bottomRow : height - (clarifaiFace.bottom_row * height)
      
    }
  }


  displayFacebox = (box) => {
    this.setState({box : box});
  }


  onInputChange = (event) => {
    this.setState({
      input : event.target.value
    })
  }

  onButtonSubmit = () => 
  {
    console.log('click');
    this.setState({
      imageUrl : this.state.input
    })
      fetch("https://warm-escarpment-95792.herokuapp.com/imageUrl",
      {
        method : 'post',
        headers : {"Content-Type":"application/json"},
        body : JSON.stringify({input : this.state.input})
      })
      .then(response=>response.json())
      .then(response => 
      {
        if (response){
          fetch("https://warm-escarpment-95792.herokuapp.com/image",
          {
            method : 'put',
            headers : {"Content-Type":"application/json"},
            body : JSON.stringify({id : this.state.user.id})
          })
            .then(response=>response.json())
            .then(count=>{this.setState(Object.assign(this.state.user,{entries : count}))})
            .catch(console.log)
      }
        var concepts = this.displayFacebox(this.calculateFaceLocation(response));
        console.log(concepts);
        })
      .catch(err=>console.log(err))
  }

  onRouteChange = (route) => {
    if (route === 'signout'){
      this.setState(initialState)
    }
    else if (route === 'home'){
      this.setState({isSignedIn : true})
    }
    this.setState({route : route})
  }

  render(){
    const {imageUrl,box,isSignedIn,route} = this.state 
    return (
      <div className="App">
        <Particles 
                className = 'particles'
                params={particlesOptions} 
                style={{width: '100%'}} 
        />
        <Navigation isSignedIn = {isSignedIn} onRouteChange = {this.onRouteChange}/>

        {route==='home' 
        ? <div>
              <Logo/>
              <Rank name = {this.state.user.name} entries={this.state.user.entries}/>
              <ImageLinkForm onInputChange = {this.onInputChange} 
                            onButtonSubmit={this.onButtonSubmit} 
              />
              <FaceRecognition 
                              imageUrl = {imageUrl}
                              box = {box}
              />
          </div>
        : 
        (
          route === 'signin' 
          ? <SignIn loadUser = {this.loadUser} onRouteChange = {this.onRouteChange}/>
          : <Register loadUser = {this.loadUser} onRouteChange = {this.onRouteChange}/>
        )
        }
      </div>
    );
  }
} 

export default App;

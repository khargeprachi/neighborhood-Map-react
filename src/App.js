import React, { Component } from 'react';
import {GoogleApiWrapper} from 'google-maps-react';
import ReactDOM from 'react-dom';

import './App.css';
import List from './list.js';
import OurMap from './map.js';

class App extends Component {
  state={
    locations:[
      {
        title:'Indian Institute of Technology, Bombay',
        location: {lat: 19.1334302, lng: 72.91326789999994}
      },
      {
        title:'Mithibai College',
        location: {lat: 19.1028892, lng: 72.83743030000005}
      },
      {
        title:'Veermata Jijabai Technological Institute',
        location: {lat: 19.0222181, lng: 72.85612119999996}
      },
      {
        title:'H.R. College of Commerce & Economics',
        location: {lat: 18.9299474, lng: 72.82676319999996}
      },
      {
        title:'Jai Hind College',
        location: {lat: 18.9345444, lng: 72.8252053}
      },
      {
        title:'Ramnarain Ruia College Of Arts And Science',
        location: {lat: 19.023554, lng: 72.85005679999995}
      },
      {
        title:'SIES College of Management Studies (SIESCOMS)',
        location: {lat: 19.0423729, lng: 73.02298339999993}
      },
      {
        title:'K. J. Somaiya Institute of Management Studies and Research',
        location: {lat: 19.0728088, lng: 72.8978032}
      },
    ],
    map:{},
    markers:[],
    infowindow:new this.props.google.maps.InfoWindow()

  }
  componentDidMount() {
    const maps = this.props.google.maps;
  }
  loadMap=() => {
var markers=[];
    if (this.props && this.props.google) { // checks to make sure that props have been passed
   const {google} = this.props; // sets props equal to google
   const maps = google.maps; // sets maps to google maps props

//   this.mapRef = React.createRef();
//const node = ReactDOM.findDOMNode(this.mapRef.current);
   const mapRef = this.refs.map; // looks for HTML div ref 'map'. Returned in render below.
//  const node = ReactDOM.findDOMNode(mapRef); // finds the 'map' div in the React DOM, names it node

   const mapConfig = Object.assign({}, {
     center: {lat:19.0759837, lng: 72.87765590000004}, // sets center of google map to NYC.
     zoom: 11, // sets zoom. Lower numbers are zoomed further out.
     mapTypeId: 'roadmap' // optional main map layer. Terrain, satellite, hybrid or roadmap--if unspecified, defaults to roadmap.
   })


   this.map = new maps.Map(document.getElementById('map'), mapConfig);
   //var Infowindow = new google.maps.InfoWindow();

   //markers
   var self=this;
//console.log(self);
//self.props=this.props;
  this.state.locations.forEach( location => { // iterate through locations saved in state
     const marker = new google.maps.Marker({ // creates a new Google maps Marker object.
       position: {lat: location.location.lat, lng: location.location.lng}, // sets position of marker to specified location
       map: this.map, // sets markers to appear on the map we just created on line 35
       title: location.title // the title of the marker is set to the name of the location
     });
     markers.push(marker);
     marker.addListener('click', function() {
        //  console.log(marker);
               self.populateInfoWindow(this,this.map);

             });
   })
   //console.log(markers);
   this.setState({
     map:this.map,
     markers:markers
   })
  }



}

  populateInfoWindow=(marker,map)=> {
  //console.log(marker);
  var infowindow=this.state.infowindow
  if (infowindow.marker != marker) {
          // Clear the infowindow content to give the streetview time to load.
          infowindow.setContent(marker.title);
          infowindow.marker = marker;
          // Make sure the marker property is cleared if the infowindow is closed.
          infowindow.addListener('closeclick', function() {
            infowindow.marker = null;
          });

          infowindow.open(map, marker);
          this.setState({
            infowindow:infowindow
          })
    }
  }
  render() {
    return (
      <div className="App">

           <OurMap loadMap={this.loadMap} locations={this.state.locations} google={this.props.google} maps={this.state.maps} populateInfoWindow={this.populateInfoWindow}/>
           <List locations={this.state.locations} markers={this.state.markers} infowindow={this.state.infowindow} map={this.state.map} google={this.props.google} populateInfoWindow={this.populateInfoWindow}/>


      </div>
    );
  }
}
export default GoogleApiWrapper({
   apiKey: 'AIzaSyBBCQlQh8WUvSGTWW3OIMlrdTLQsNmzkLU',
   libraries: ['geometry']
 })(App)

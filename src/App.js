import React, { Component } from 'react';
import {GoogleApiWrapper} from 'google-maps-react';
import * as InfoAPI from './InfoAPI.js';
import './App.css';
import List from './list.js';
import OurMap from './map.js';
import HamburgerMenu from 'react-hamburger-menu';
class App extends Component {
  state={
    open:true,
    locations:[
      {
        name:'Indian Institute of Technology, Bombay',
        location: {lat: 19.1334302, lng: 72.91326789999994}
      },
      {
        name:'Mithibai College',
        location: {lat: 19.1028892, lng: 72.83743030000005}
      },
      {
        name:'Veermata Jijabai Technological Institute',
        location: {lat: 19.0222181, lng: 72.85612119999996}
      },
      {
        name:'H.R. College of Commerce & Economics',
        location: {lat: 18.9299474, lng: 72.82676319999996}
      },
      {
        name:'Jai Hind College',
        location: {lat: 18.9345444, lng: 72.8252053}
      },
      {
        name:'Ramnarain Ruia College Of Arts And Science',
        location: {lat: 19.023554, lng: 72.85005679999995}
      },
      {
        name:'SIES College of Management Studies (SIESCOMS)',
        location: {lat: 19.0423729, lng: 73.02298339999993}
      },
      {
        name:'K. J. Somaiya Institute of Management Studies and Research',
        location: {lat: 19.0728088, lng: 72.8978032}
      },
    ],
    map:{},
    markers:[],
    infowindow:new this.props.google.maps.InfoWindow()

  }

  toggleBounce = (marker) => {
          if (marker.getAnimation() != null) {
              marker.setAnimation(null);
          } else {
              marker.setAnimation(this.props.google.maps.Animation.BOUNCE);
          }
      }

  loadMap=() => {
    if (this.props && this.props.google) { // checks to make sure that props have been passed
   const {google} = this.props; // sets props equal to google
   const maps = google.maps; // sets maps to google maps props

//   this.mapRef = React.createRef();
//const node = ReactDOM.findDOMNode(this.mapRef.current);
//  const node = ReactDOM.findDOMNode(mapRef); // finds the 'map' div in the React DOM, names it node

   const mapConfig = Object.assign({}, {
     center: {lat:19.0759837, lng: 72.87765590000004}, // sets center of google map to NYC.
     zoom: 11, // sets zoom. Lower numbers are zoomed further out.
     mapTypeId: 'roadmap' // optional main map layer. Terrain, satellite, hybrid or roadmap--if unspecified, defaults to roadmap.
   })


   var map = new maps.Map(document.getElementById('map'), mapConfig);



   this.setState({
     map:map
   })


//query results places apikey

   var self=this;
   google.maps.event.addListener(map, 'tilesloaded', function() {

    self.searchPlaces(map);
    google.maps.event.clearListeners(map, 'tilesloaded');
      });

  }


}

searchPlaces= (map)=> {
   const {google} = this.props;
  var bounds = map.getBounds();

    var self=this;
    var placesService = new google.maps.places.PlacesService(map);
    placesService.textSearch({
      //query: document.getElementById('places-search').value,
      query:'college',
      bounds: bounds
    }, function(results, status) {


      self.setState({locations:results})
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        //console.log(results);
      self.makeMarkers(results,map);
      }
    });

}
makeMarkers=(locations,map)=>{
  //console.log(locations)
  var markers=[];
  this.state.markers.forEach((marker)=> {
    marker.setMap(null)
  })
  locations.forEach(location => { // iterate through locations saved in state
     const marker = new this.props.google.maps.Marker({ // creates a new Google maps Marker object.
       position: {lat: location.geometry.location.lat(), lng: location.geometry.location.lng()}, // sets position of marker to specified location
       map: map, // sets markers to appear on the map we just created on line 35
       animation: this.props.google.maps.Animation.DROP,
       //title: location.name+'<br>'+location.formatted_address // the title of the marker is set to the name of the location
       title: location.name ,
       address:location.formatted_address// the title of the marker is set to the name of the location
     });
     markers.push(marker);
     var self=this;
     marker.addListener('click', function() {
        //  console.log(marker);
        //self.toggleBounce(marker);

            //  setTimeout(self.toggleBounce(marker), 3000);
               self.populateInfoWindow(this,this.map);

             });
   })
   //console.log(markers);
   this.setState({

     markers:markers
  })
}

  populateInfoWindow=(marker,map)=> {
  //console.log(marker);
  this.toggleBounce(marker);

      setTimeout(this.toggleBounce(marker), 1500);
  var infowindow=this.state.infowindow
  if (infowindow.marker !== marker) {
          // Clear the infowindow content to give the streetview time to load.
          infowindow.marker = marker;
          // Make sure the marker property is cleared if the infowindow is closed.
          infowindow.addListener('closeclick', function() {
            infowindow.marker = null;
          });

          InfoAPI.foursquareGet(marker.position.lat(),marker.position.lng(),marker.title)
          .then((venue_id)=> {
          //  if(venue_id){
              InfoAPI.getPhoto(venue_id)
              .then(url=>
                {var html
                  if(url){
                    html=`<img src="${url}" alt=${marker.title}>`
                  }
                  else {
                    html=`<h4>Image not available</h4>`
                  }
                infowindow.setContent(html+`<div>${marker.title}<br> ${marker.address}</div>`)

              })
            //  .catch((error)=>window.alert(error))
          //  }

        });
          infowindow.open(map, marker);
          this.setState({
            infowindow:infowindow
          })
    }
  }
handleClick= () => {
  this.setState({
    open:!this.state.open
  })
}
  render() {
    return (
      <div className="App">

<div id="navbar">
<div id="menu">
  <HamburgerMenu color='white' width={20} height={20} isOpen={this.state.open}
  menuClicked={this.handleClick.bind(this)}></HamburgerMenu>
</div><h2>Colleges in Mumbai</h2></div>
<OurMap loadMap={this.loadMap} open={this.state.open} locations={this.state.locations} google={this.props.google} maps={this.state.maps} populateInfoWindow={this.populateInfoWindow}/>
{this.state.open && (
<div>
  <List handleClick={this.handleClick} open={this.state.open} makeMarkers={this.makeMarkers} locations={this.state.locations} markers={this.state.markers} infowindow={this.state.infowindow} map={this.state.map} google={this.props.google} populateInfoWindow={this.populateInfoWindow}>
  </List>
  </div>
)}


</div>
)}








}
export default GoogleApiWrapper({
   apiKey: 'AIzaSyBBCQlQh8WUvSGTWW3OIMlrdTLQsNmzkLU',
   libraries: ['geometry','places']
 })(App)

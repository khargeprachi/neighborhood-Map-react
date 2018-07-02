import React, { Component } from 'react';
import {GoogleApiWrapper} from 'google-maps-react';
import * as InfoAPI from './InfoAPI.js';
import './App.css';
import List from './list.js';
import OurMap from './map.js';
import HamburgerMenu from 'react-hamburger-menu';
const fetchGoogleMaps = require('fetch-google-maps');
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
  gm_authFailure(){
      window.alert("Google Maps error!")
  }
  componentDidMount = () => {
    window.gm_authFailure = this.gm_authFailure;
    const {google} = this.props; // sets props equal to google
    fetchGoogleMaps({
      apiKey: 'YOUR-API-KEY',
    	language: 'en',
    	libraries: ['geometry','places']
    })
    .then(( Maps ) => {
      const map = new Maps.Map(document.getElementById('map'), {
    	   zoom: 11,
    		 center: new Maps.LatLng(19.0759837,72.87765590000004)
    	});

      this.setState({map})
      var self=this;
      google.maps.event.addListener(map, 'tilesloaded', function() {
        self.searchPlaces(map);
        google.maps.event.clearListeners(map, 'tilesloaded');
      });
    })
    .catch((error)=> this.setState({map:{}}))
  }
  toggleBounce = (marker) => {
      if (marker.getAnimation() != null) {
          marker.setAnimation(null);
      } else {
          marker.setAnimation(this.props.google.maps.Animation.BOUNCE);
      }
  }

  searchPlaces= (map)=> {
    const {google} = this.props;
    var self=this;
    var placesService = new google.maps.places.PlacesService(map);
    placesService.textSearch({
        query:'college',
        bounds: map.getBounds()
      },
        function(results, status) {
          self.setState({locations:results})
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            self.makeMarkers(results,map);
          }
        }
    );

  }

  makeMarkers = (locations,map) => {
    var markers=[]; //array to store all the markers
    this.state.markers.forEach((marker)=> {
      marker.setMap(null)
    })
    locations.forEach(location => {
      const marker = new this.props.google.maps.Marker({ //  new Google maps Marker
        position: {lat: location.geometry.location.lat(), lng: location.geometry.location.lng()},
        map: map,
        animation: this.props.google.maps.Animation.DROP,
        title: location.name ,
        address:location.formatted_address
      });
      markers.push(marker);
      var self=this;
      marker.addListener('click', function() {
        self.populateInfoWindow(this,this.map);//open infowindow on Click event
      });
    })
    this.setState({
      markers:markers
    })
  }

  populateInfoWindow=(marker,map)=> {
    this.toggleBounce(marker);
    setTimeout(this.toggleBounce(marker), 1500);
    var infowindow=this.state.infowindow
    if (infowindow.marker !== marker) {
      infowindow.marker = marker;
      infowindow.addListener('closeclick', function() {
        infowindow.marker = null;
      });
      var html=`<h4>Image not available</h4>`;
    InfoAPI.foursquareGet(marker.position.lat(),marker.position.lng(),marker.title)
      .then((venue_id)=> {
        InfoAPI.getPhoto(venue_id)
        .then(url=>
          {
            if(url){
              html=`<img src="${url}" alt=${marker.title}>`
            }
            else {
              html=`<h4>Image not available</h4>`
            }
            infowindow.setContent(html+`<div>${marker.title}<br> ${marker.address}</div>`)

          })
          infowindow.open(map, marker);
      })
      .catch((error)=>{
        infowindow.setContent(html+`<div>${marker.title}<br> ${marker.address}</div>`)
        infowindow.open(map, marker);

      });
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
          <div id="menu" tabIndex="1">
            <HamburgerMenu  aria-label='Menu'
              aria-controls='navigation'  color='white' width={20} height={20} isOpen={this.state.open}
            menuClicked={this.handleClick.bind(this)}></HamburgerMenu>
          </div>
          <h2>Colleges in Mumbai</h2>
        </div>
        <OurMap open={this.state.open} locations={this.state.locations} google={this.props.google}  populateInfoWindow={this.populateInfoWindow}/>
        {this.state.open && (
          <div>
          <List handleClick={this.handleClick} open={this.state.open} makeMarkers={this.makeMarkers} locations={this.state.locations} markers={this.state.markers} infowindow={this.state.infowindow} map={this.state.map} google={this.props.google} populateInfoWindow={this.populateInfoWindow}>
          </List>
          </div>
        )}
        <div className="footer">
        <h5>Images in this page are retrived from Foursquare.com</h5>
        </div>
      </div>
    )
  }
}
export default GoogleApiWrapper({
   apiKey: 'YOUR-API-KEY',
   libraries: ['geometry','places']
 })(App)

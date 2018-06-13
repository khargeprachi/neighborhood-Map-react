import React, { Component } from 'react';

import './App.css';

export default class OurMap extends Component {

  componentDidMount() {

    console.log("hello");
      this.props.loadMap();

  }
  /*  loadMap() {

      if (this.props && this.props.google) { // checks to make sure that props have been passed
     const {google} = this.props; // sets props equal to google
     const maps = google.maps; // sets maps to google maps props

  //   this.mapRef = React.createRef();
//const node = ReactDOM.findDOMNode(this.mapRef.current);
     const mapRef = this.refs.map; // looks for HTML div ref 'map'. Returned in render below.
    const node = ReactDOM.findDOMNode(mapRef); // finds the 'map' div in the React DOM, names it node

     const mapConfig = Object.assign({}, {
       center: {lat:19.0759837, lng: 72.87765590000004}, // sets center of google map to NYC.
       zoom: 11, // sets zoom. Lower numbers are zoomed further out.
       mapTypeId: 'roadmap' // optional main map layer. Terrain, satellite, hybrid or roadmap--if unspecified, defaults to roadmap.
     })
     //const maps=this.props.maps
     this.map = new maps.Map(node, mapConfig);
     var Infowindow = new google.maps.InfoWindow();

     //markers
     var self=this;
  console.log(self);
//self.props=this.props;
    this.props.locations.forEach( location => { // iterate through locations saved in state
       const marker = new google.maps.Marker({ // creates a new Google maps Marker object.
         position: {lat: location.location.lat, lng: location.location.lng}, // sets position of marker to specified location
         map: this.map, // sets markers to appear on the map we just created on line 35
         title: location.title // the title of the marker is set to the name of the location
       });
       marker.addListener('click', function() {
          //  console.log(marker);
                 self.populateWindow(this, Infowindow);

               });
     })
    }



  }*/
populateWindow=(marker, infowindow)=> {
  console.log(this);
  this.props.populateInfoWindow(marker,infowindow,this.map);
}
render () {

  const style = { // MUST specify dimensions of the Google map or it will not work. Also works best when style is specified inside the render function and created as an object
       width: '80vw', // 90vw basically means take up 90% of the width screen. px also works.
       height: '100vh' ,
       float:'right' // 75vh similarly will take up roughly 75% of the height of the screen. px also works.
     }
  return (

    <div id="map" ref="map" style={style}>

    </div>
  );
}
}

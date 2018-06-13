import React, { Component } from 'react';
import {GoogleApiWrapper} from 'google-maps-react';
import OurMap from './map.js';



class OurMapContainer extends Component {
  render() {
    return (
      <div><OurMap locations={this.props.locations} google={this.props.google} populateInfoWindow={this.props.populateInfoWindow}/></div>
    )
}
}
export default GoogleApiWrapper({
   apiKey: 'AIzaSyBBCQlQh8WUvSGTWW3OIMlrdTLQsNmzkLU',
   libraries: ['geometry']
 })(OurMapContainer)

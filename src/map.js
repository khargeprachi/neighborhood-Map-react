import React, { Component } from 'react';

import './App.css';

export default class OurMap extends Component {

  render () {
    var width,left;
        if(this.props.open===true && window.screen.availWidth<=770 && window.screen.availWidth>=450){
          width=60;
          left=40;
        } else if (this.props.open===true && window.screen.availWidth<450){
          width=40;
          left=60;
        }
          else if (this.props.open===true && window.screen.availWidth>770) {
            width=80;
            left=20;
        }

      else {
        width=100;
        left=0;
      }
    

    const style = {
       width: `${width}vw`,
       height: '90vh' ,
       position:'absolute',
       float:'right',
       top:'5vh',
       left:`${left}vw` ,
    }

    return (
      <div id="map" aria-label="location"  role="application" ref="map" style={style}>
        <h4>Map not Available</h4>
      </div>
    );
  }
}

import React, { Component } from 'react';

import './App.css';

export default class OurMap extends Component {

  componentDidMount() {

    console.log("hello");
      this.props.loadMap();


  }


render () {
  var width,left;
{if(this.props.open===true){

  if(window.screen.availWidth<=770 && window.screen.availWidth>=450){

    width=60;
    left=40;
  } else if (window.screen.availWidth<450){
    width=40;
    left=60;
  }
  else if (window.screen.availWidth>770) {
    width=80;
    left=20;
  }
  }
  else {
    width=100;
    left=0;
  }
}

  const style = { // MUST specify dimensions of the Google map or it will not work. Also works best when style is specified inside the render function and created as an object
       width: `${width}vw`, // 90vw basically means take up 90% of the width screen. px also works.
       height: '95vh' ,
       position:'absolute',
       float:'right',
       top:'5vh',
       left:`${left}vw` ,
       // 75vh similarly will take up roughly 75% of the height of the screen. px also works.
     }

  return (
    <div id="map" ref="map" style={style}>

    </div>
  );
}
}

import React, { Component } from 'react';

class List extends Component {
  handleClick=(title)=> {
    var clickedMarker=this.props.markers.filter((marker)=> (
      marker.title==title
    ))
    //console.log(clickedMarker[0]);
    this.props.populateInfoWindow(clickedMarker[0],this.props.map);
  }
render() {
  return (
    <div id="listView">
    <div id="searchBox">
    <input type="text" placeholder="Search by College Name"></input>
    <input type="submit" value="filter"/>
    </div>
    <ul id="list">

    {  this.props.locations.map((location)=>(
      <li>
      <button key={location.title}  onClick={(event)=>{this.handleClick(event.target.textContent)}} >
    <div id="list-entry" >{location.title}</div>
      </button>
      </li>
    ))
  }
    </ul>
    </div>
  )
}
}
export default List

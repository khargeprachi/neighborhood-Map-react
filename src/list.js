import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp'

class List extends Component {
  state = {
    query:''
  }

  handleClick=(title)=> {
    var clickedMarker=this.props.markers.filter((marker)=> (
      marker.title===title
    ))

    this.props.populateInfoWindow(clickedMarker[0],this.props.map);
  }

  filter=(showingLocations) => {
this.props.makeMarkers(showingLocations,this.props.map)
  }
  handleInput=(event) => {
    this.setState({query:event.target.value})

  }
render() {
let showingLocations
  if(this.state.query) {
const match=new RegExp(escapeRegExp(this.state.query),'i')
showingLocations=this.props.locations.filter((location)=>match.test(location.name))

} else {
  showingLocations=this.props.locations
}


var width

  if(this.props.open===true && window.screen.availWidth<=770 && window.screen.availWidth>=450){
    width=40;
  } else if (this.props.open===true && window.screen.availWidth<450){
    width=60;
  } else if (this.props.open===true && window.screen.availWidth>770){
    width=20;
  }

 else {
  width=0;
}

const style={
  width:`${width}vw`
}
  return (
    <div id="listView" style={style}>

    <div id="searchBox">
    <form id="inputForm"  >
    <input type="text" id="inputValue" value={this.state.query} onInput={(event)=>this.handleInput(event) } aria-label="Filter by College Name" placeholder="Search by College Name"></input>
    <input type="button" value="filter" onClick={()=>this.filter(showingLocations)}/>
    </form>
    </div>


      <ul id="list" role="group">
      {
        showingLocations.map((location,i)=>(
          <li key={i}>
            <button key={location.place_id}  onClick={(event)=>{this.handleClick(event.target.textContent)}} >
            <div key={location.name} id="list-entry" >{location.name}</div>
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

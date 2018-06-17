//const api = "https://wikipedia.org/wiki"

 const api = "https://en.wikipedia.org/w/api.php?formatversion=2&action=query&prop=pageimages&format=json&titles=";
 //search=Belgium&limit=5
// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'images/svg',
  //'Authorization': token,
  //'origin': 'http://localhost:3000',
  //'wildcard'                         : "*",
  'Access-Control-Allow-Origin': '*'

}
export const foursquareGet=(title)=> {
const url = 'https://api.foursquare.com/v2/venues/explore'

const params = {
  client_id:'CLIENT_ID',
  client_secret:'CLIENT_SECRET',
  v:'20180323',
  ll:'40.7243,-74.0018',
  query:title,
  limit:1
}

fetch( 'http://api.foursquare.com/v2/venues/explore?client_id=QDK5GSIUVAY2KJUPFM3EYARFN41L5ICUURJ43YAJLRIJ3HUR&client_secret=VGADTUQYVH5YNVK3YTG0VA0LRVH0ONYJXR22N0WJX4TN2J5J&query=Mithibai_College',{headers})
.then((res)=> {
  console.log(res);
})
}


export const get = (bookId) =>
  fetch(`${api}${bookId}`, { headers})
  //.then((res)=>{console.log(res.json())})
  .then(res => res.json())
  .then(data =>
  // data.query.pages[14705941]
   //`<img src="${data.query.pages}">`
console.log(data.query.pages[0])
).catch ((error)=> console.log(error))

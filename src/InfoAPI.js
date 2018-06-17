

 const api = "https://en.wikipedia.org/w/api.php?formatversion=2&action=query&prop=pageimages&format=json&titles=";
 //search=Belgium&limit=5
// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'text/html',
  //'Authorization': token,
  //'origin': 'http://localhost:3000',
  //'wildcard'                         : "*",
  'Access-Control-Allow-Origin': '*'

}
const url = 'http://api.foursquare.com/v2/venues'
export const foursquareGet = (lat,lng,name) =>

/*const params = {
  client_id:'CLIENT_ID',
  client_secret:'CLIENT_SECRET',
  v:'20180323',
  ll:'40.7243,-74.0018',
  //query:title,
  limit:1
}*/


fetch(`${url}/search?client_id=QDK5GSIUVAY2KJUPFM3EYARFN41L5ICUURJ43YAJLRIJ3HUR&client_secret=VGADTUQYVH5YNVK3YTG0VA0LRVH0ONYJXR22N0WJX4TN2J5J&intent=match&name=${name}&v=20180617&ll=${lat},${lng}`)
.then(res=>  res.json())
.then(data=>
{
  if(data.response.venues.length>0){

    return (data.response.venues[0].id)
  }
}

)
//.catch((error)=> window.alert('error'));

export const getPhoto=(id) =>

  fetch (`${url}/${id}/photos?client_id=QDK5GSIUVAY2KJUPFM3EYARFN41L5ICUURJ43YAJLRIJ3HUR&client_secret=VGADTUQYVH5YNVK3YTG0VA0LRVH0ONYJXR22N0WJX4TN2J5J&v=20180617`)
  .then(res=> res.json())
//  .then(data=>console.log(data.response.photos.items[0].prefix))
  .then((data)=>
  {
    var photos=data.response.photos;

    if(photos && photos.items.length>=1){
       return (photos.items[0].prefix+'100x100'+photos.items[0].suffix)
    }
  }
)

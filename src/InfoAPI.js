//InfoAPI for all promises


const url = 'http://api.foursquare.com/v2/venues';
const client_id='QDK5GSIUVAY2KJUPFM3EYARFN41L5ICUURJ43YAJLRIJ3HUR';
const client_secret='VGADTUQYVH5YNVK3YTG0VA0LRVH0ONYJXR22N0WJX4TN2J5J'
export const foursquareGet = (lat,lng,name) =>

  fetch(`${url}/search?client_id=${client_id}&client_secret=${client_secret}&intent=match&name=${name}&v=20180617&ll=${lat},${lng}`)
  .then(res=>  res.json())
  .then(data=>
    {
      if(data.response.venues.length>0) {
        return (data.response.venues[0].id)
      }
    }
   )

export const getPhoto=(id) =>
  fetch (`${url}/${id}/photos?client_id=${client_id}&client_secret=${client_secret}&v=20180617`)
  .then(res=> res.json())
  .then((data)=>
    {
      var photos=data.response.photos;

      if(photos && photos.items.length>=1){
         return (photos.items[0].prefix+'100x100'+photos.items[0].suffix)
      }
    }
  )

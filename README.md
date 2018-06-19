This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).



##Neighborhood Map (react)
This project used create-react-app to create a listing of all Colleges in the specified neighborhood and highlight their location on the map . On clicking on every marker and the list option, an infoWindow pops up which display information about the current location. This information includes The college name, address and an image.

#Dependencies and How to start
This is uses create-react-app, npm install and npm run build to begin.
Maps are loaded using Google Maps API. We install 'google-maps-react' and 'fetch-google-maps'.
We need to register, create a project and get a Maps Javascript API key from google.


In order to enable cors, we need to install a chrome extension given below https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi

The image to be displayed in the infowindow is retrieved from a non-googel third party API called Foursquare.
So we need to client-id and client-secret key by registering with Foursquare and creating a project.

This projects also includes a hamburger menu.
So we install react-hamburger-menu.

other dependencies are:
'escape-string-regexp'

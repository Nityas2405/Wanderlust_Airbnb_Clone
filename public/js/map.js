
maptilersdk.config.apiKey = mapToken;
        const map = new maptilersdk.Map({
      container: 'map', // container's id or the HTML element in which the SDK will render the map
      style: maptilersdk.MapStyle.STREETS,
      center: coordinates, // starting position [lng, lat]
      zoom: 9 // starting zoom
    });

    console.log(coordinates);

const marker = new maptilersdk.Marker({color:"red"})
.setLngLat(coordinates) //Listing latitude and longtitude
.setPopup(new maptilersdk.Popup({offset: 25}).setHTML(`<h4>${listing.title}</h4><p>Exact Location will be provided after booking</p>`)) // add popup
.addTo(map);

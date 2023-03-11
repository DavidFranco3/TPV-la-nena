import React, { useState, useEffect } from "react";
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";

const Map = withGoogleMap(props => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  
  return (
    <GoogleMap
      defaultZoom={10}
      defaultCenter={{ lat: 20.4033876, lng: -100.0084915 }}
      onClick={(event) => {
        setSelectedLocation({
          lat: event.latLng.lat(),
          lng: event.latLng.lng()
        });
      }}
      options={{
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
        zoomControl: true,
        gestureHandling: "cooperative",
        clickableIcons: false,
        styles: [
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }]
          },
          {
            featureType: "transit",
            elementType: "labels",
            stylers: [{ visibility: "off" }]
          }
        ]
      }}
      mapContainerStyle={{ height: "400px", width: "100%" }}
    >
      {selectedLocation && (
        <Marker
          position={{ lat: selectedLocation.lat, lng: selectedLocation.lng }}
          onClick={() => {
            setSelectedLocation(null);
          }}
        >
          <InfoWindow>
            <div>Ubicación seleccionada</div>
          </InfoWindow>
        </Marker>
      )}
    </GoogleMap>
  );
});

function Mapa() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (window.google && window.google.maps) {
      setIsLoaded(true);
    } else {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDPLUhWt9MegTITmwnDMNyHrvZes58wSOo`;
      script.onload = () => setIsLoaded(true);
      document.head.appendChild(script);
    }
  }, []);

  return (
    <div>
      {isLoaded && (
        <Map
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      )}
    </div>
  );
}

export default Mapa;

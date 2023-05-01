"use client";
import { useLoadScript, GoogleMap, DirectionsRenderer } from "@react-google-maps/api";
import { useState, useEffect, ReactElement } from "react";

const mapOptions = {
  disableDefaultUI: true,
  clickableIcons: true,
  scrollwheel: false,
};

const Map = ({ destination }: { destination: google.maps.LatLngLiteral }): ReactElement => {
  const [origin, setOrigin] = useState({ lat: 1, lng: 1 });
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  // const [distance, setDistance] = useState<google.maps.DistanceMatrixResponse | null>(null);

  // const googleMapsApiKey: string = process.env.GOOGLE_MAPS_KEY ? process.env.GOOGLE_MAPS_KEY : "";

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCfFOABtRpwkquUomSFilfx41tMw1wRL84",
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setOrigin({ lat, lng });
        },
        (error) => {
          alert(error);
        },
      );
    } else {
      alert("La geolocalización no está disponible.");
    }
  }, []);

  useEffect(() => {
    if (!window.google) {
      return;
    }

    const DirectionsService = new google.maps.DirectionsService();

    DirectionsService.route(
      {
        origin,
        destination,
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          setDirections(result);
        } else {
          alert(`error fetching directions ${result}`);
        }
      },
    );

    /*MatrixService.getDistanceMatrix(
      const MatrixService = new google.maps.DistanceMatrixService();
      
      {
        origins: [origin],
        destinations: [destination],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC,
      },
      (result, status) => {
        if (status === google.maps.DistanceMatrixStatus.OK) {
          setDistance(result);
        }
      },
    );*/
  }, [isLoaded, origin]);

  return (
    <>
      {isLoaded ? (
        <GoogleMap
          options={mapOptions}
          zoom={14}
          center={origin}
          mapTypeId={google.maps.MapTypeId.ROADMAP}
          mapContainerStyle={{ width: "800px", height: "800px" }}
          // onLoad={() => console.log("Map Component Loaded...")}
        >
          {directions ? <DirectionsRenderer options={{ directions }} /> : <p>Calculando Ruta...</p>}
        </GoogleMap>
      ) : (
        <p>Cargando Mapa...</p>
      )}
    </>
  );
};

export default Map;

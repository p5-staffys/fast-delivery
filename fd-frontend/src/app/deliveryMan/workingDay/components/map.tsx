"use client";
import { useLoadScript, GoogleMap, DirectionsRenderer } from "@react-google-maps/api";
import { useState, useEffect, ReactElement } from "react";

const mapOptions = {
  disableDefaultUI: true,
  clickableIcons: true,
  scrollwheel: false,
};

const googleMapsApiKey: string = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || "";

const Map = ({ destination }: { destination: google.maps.LatLngLiteral }): ReactElement => {
  const [origin, setOrigin] = useState({ lat: 1, lng: 1 });
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  // const [distance, setDistance] = useState<google.maps.DistanceMatrixResponse | null>(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setOrigin({ lat, lng });
        },
        () => {
          alert("Necesita habilitar la geolocaclización en su dispositivo.");
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
          alert("No pudo planificarse la ruta.");
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

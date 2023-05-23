"use client";
import { Box } from "@mui/material";
import { useLoadScript, GoogleMap, DirectionsRenderer } from "@react-google-maps/api";
import { useState, useEffect, ReactElement } from "react";
import { alert, toast } from "@/utils/alerts/alerts";

const mapOptions = {
  disableDefaultUI: true,
  clickableIcons: true,
  scrollwheel: false,
};

const googleMapsApiKey: string = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || "";

const Map = ({ destination }: { destination: google.maps.LatLngLiteral }): ReactElement => {
  const [origin, setOrigin] = useState<google.maps.LatLngLiteral | null>(null);
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
          alert.fire({ icon: "warning", text: "Necesita habilitar la geolocaclización en su dispositivo." });
        },
      );
    } else {
      toast.fire({ icon: "error", text: "La geolocalización no está disponible." });
    }
  }, []);

  useEffect(() => {
    if (!window.google || !origin) {
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
          toast.fire({ icon: "error", text: "No pudo planificarse la ruta." });
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
          center={origin ? origin : { lat: -34.60376, lng: -58.38162 }}
          mapTypeId={google.maps.MapTypeId.ROADMAP}
          mapContainerStyle={{ width: "640px", height: "640px" }}
        >
          {directions ? <DirectionsRenderer options={{ directions }} /> : <p>Calculando Ruta...</p>}
        </GoogleMap>
      ) : (
        <Box width="640px" height="640px" sx={{ backgroundColor: "primary" }}></Box>
      )}
    </>
  );
};

export default Map;

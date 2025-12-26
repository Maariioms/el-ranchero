import { useState, useEffect, useMemo } from 'react'
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet'
import { User, Building2, Phone, Mail, ArrowRight, Loader2, CheckCircle, MessageSquare, MapPin, Search } from 'lucide-react';
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { Pin } from 'lucide-react'

// Fix iconos rotos
const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})

// COMPONENTE AUXILIAR: Mueve la cámara cuando cambian las props
function MapController({ coords }: { coords: { lat: number, lng: number } | null }) {
  const map = useMap();
  
  useEffect(() => {
    if (coords) {
      map.flyTo(coords, 16, { duration: 1.5 }); // Zoom 16 para ver calle
    }
  }, [coords, map]);

  return null;
}

function DraggableMarker({ position, onLocationSelect }: { position: {lat: number, lng: number}, onLocationSelect: (lat: number, lng: number) => void }) {
  
  const eventHandlers = useMemo(
    () => ({
      dragend(e: any) { // Tipo any para evitar error rápido de TS en evento
        const marker = e.target
        if (marker != null) {
          const { lat, lng } = marker.getLatLng()
          onLocationSelect(lat, lng)
        }
      },
    }),
    [onLocationSelect],
  )

  return (
    <Marker
      draggable={true}
      eventHandlers={eventHandlers}
      position={position}
      icon={icon}
    />
  )
}

interface MapPickerProps {
  onLocationSelect: (lat: number, lng: number) => void;
  externalCoords: { lat: number, lng: number } | null; // Nueva prop
}

export default function MapPicker({ onLocationSelect, externalCoords }: MapPickerProps) {
  // Estado local para el marcador
  const [markerPos, setMarkerPos] = useState({ lat: 19.4326, lng: -99.1332 });

  // Si llegan coordenadas externas (del buscador), actualizamos el marcador local
  useEffect(() => {
    if (externalCoords) {
      setMarkerPos(externalCoords);
    }
  }, [externalCoords]);

  return (
    <div className="h-[300px] w-full rounded-lg overflow-hidden border border-white/10 relative z-0">
      <MapContainer 
        center={[19.4326, -99.1332]} 
        zoom={13} 
        scrollWheelZoom={false} 
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Controlador de Cámara */}
        <MapController coords={externalCoords} />

        {/* Marcador */}
        <DraggableMarker 
            position={markerPos} 
            onLocationSelect={(lat, lng) => {
                setMarkerPos({ lat, lng });
                onLocationSelect(lat, lng);
            }} 
        />
      </MapContainer>

      <div className="absolute bottom-2 left-2 bg-black/80 text-white text-[10px] px-2 py-1 rounded z-1000 pointer-events-none flex items-center gap-1">
        <MapPin className="w-3 h-3 text-[#FD6A02]" /> 
        <span>Ajusta el pin si es necesario</span>
      </div>
    </div>
  )
}
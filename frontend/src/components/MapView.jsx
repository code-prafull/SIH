import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useMemo } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

const customIcon = L.divIcon({
  className: 'custom-map-marker-wrapper',
  html: `
    <div class="relative flex items-center justify-center">
      <div class="absolute w-7 h-7 bg-emerald-500 rounded-full opacity-75 animate-ping"></div>
      <div class="relative w-4 h-4 bg-emerald-600 border-2 border-white rounded-full shadow-lg shadow-emerald-600"></div>
    </div>
  `,
  iconSize: [28, 28],
  iconAnchor: [14, 14],
  popupAnchor: [0, -10],
});

const MapView = ({ opportunities = [] }) => {
  const bounds = useMemo(() => {
    if (!opportunities.length) return [[22.5726, 88.3639], [22.5726, 88.3639]];

    const latitudes = opportunities.map((item) => item.position[0]);
    const longitudes = opportunities.map((item) => item.position[1]);

    return [
      [Math.min(...latitudes), Math.min(...longitudes)],
      [Math.max(...latitudes), Math.max(...longitudes)],
    ];
  }, [opportunities]);

  return (
    <div className="overflow-hidden rounded-3xl border border-zinc-700 bg-zinc-800 shadow-xl">
      <div className="bg-zinc-800 text-white px-5 py-4 flex items-center justify-between border-b border-zinc-700">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-zinc-700 flex items-center justify-center text-emerald-400 border border-zinc-600 shadow-sm font-bold text-xs">
            GIS
          </div>
          <span className="text-sm font-bold tracking-wide">GIS Regional Infrastructure & Opportunities Map</span>
        </div>
        <div className="text-xs bg-emerald-950 text-emerald-300 border border-emerald-700 px-3 py-1 rounded-full font-bold shadow-sm">
          {opportunities.length} Active Locations
        </div>
      </div>

      <MapContainer
        bounds={bounds}
        boundsOptions={{ padding: [28, 28] }}
        scrollWheelZoom={true}
        zoomControl={true}
        className="h-[460px] w-full z-0"
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors &amp; Data by OSM'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {opportunities.map((opportunity) => (
          <Marker key={opportunity.id} position={opportunity.position} icon={customIcon}>
            <Popup className="custom-leaflet-popup">
              <div className="p-2 min-w-[210px] text-zinc-900">
                <span className="inline-block px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 rounded-lg border border-emerald-300 mb-2">
                  {opportunity.type}
                </span>

                <h4 className="font-bold text-zinc-900 text-sm leading-snug mb-1">
                  {opportunity.title}
                </h4>

                <div className="flex items-center gap-1.5 text-xs text-zinc-600 mb-3 font-semibold">
                  <svg className="w-3.5 h-3.5 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  <span>{opportunity.location}</span>
                </div>

                <button
                  onClick={() => console.log('Viewing details for:', opportunity.id)}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold py-2 px-3 rounded-xl transition-colors shadow-md"
                >
                  View Scheme Details
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapView;

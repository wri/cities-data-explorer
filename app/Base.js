"use client";

import {
  createContext,
  useState
} from "react";
import Map from "./components/map/Map";
import { TableOfContent } from "./components/map/TableOfContent";
import Browser from "./components/s3/Browser";
export const MapContext = createContext();

export default function Base() {
  const [rasterList, setRasterList] = useState([
    // { id: "1", name: "Landcover", url: "https://wri-cities-heat.s3.amazonaws.com/ZAF-Cape_town/processed/citycentre_landcover_rgb.pmtiles", type: "raster", visibility: "visible", opacity: 100 },
    // { id: "2", name: "UTCI", url: "https://wri-cities-heat.s3.amazonaws.com/ZAF-Cape_town/processed/utci/UTCI_2022_22_1200.pmtiles", type: "raster", visibility: "visible", opacity: 100 },
    // { id: "3", name: "Buildings", url: "https://wri-cities-heat.s3.amazonaws.com/ZAF-Cape_town/processed/ZAF-Cape_Town-overture_buildings.pmtiles", type: "vector", visibility: "visible", opacity: 100 }
  ]);
  const [map, setMap] = useState();

  return (
    <MapContext.Provider
      value={{
        map,
        setMap,
        rasterList,
        setRasterList
      }}
    >
      <div className="pr-3 flex flex-col gap-4 p-2" style={{ width: "16vw" }}>
        <div className="flex-1 my-0 p-0 relative bg-white grow border overflow-y-auto h-48">
          <Browser />
        </div>
        <div className="flex-1 my-0 p-0 relative bg-white grow border">
          <TableOfContent />
        </div>
      </div>
      <div className="flex-1 my-0 p-0 relative">
        <Map />
      </div>
    </MapContext.Provider>
  );
}

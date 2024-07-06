"use client";

import {
  createContext,
  useState
} from "react";
import Map from "./components/map/Map";
import { TableOfContent } from "./components/map/TableOfContent";
export const MapContext = createContext();

export default function Home() {
  const [rasterList, setRasterList] = useState([]);
  const [map, setMap] = useState();

  return (
    <main className="flex min-h-screen bg-white">
      <MapContext.Provider
        value={{
          map,
          setMap,
          rasterList,
          setRasterList
        }}
      >
        <div className="pr-3 flex flex-col gap-4 p-2" style={{ width: "16vw" }}>
          <div className="flex-1 my-0 p-0 relative bg-white grow border">

          </div>
          <div className="flex-1 my-0 p-0 relative  bg-white grow border">
            <TableOfContent rasterList={rasterList} />
          </div>
        </div>
        <div className="flex-1 my-0 p-0 relative">
          <Map />
        </div>
      </MapContext.Provider>
    </main>
  );
}

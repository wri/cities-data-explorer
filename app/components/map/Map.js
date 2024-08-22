"use client";

import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { Protocol } from "pmtiles";
import {
    useContext,
    useEffect,
    useRef
} from "react";
import { Layer, Map as RMap, Source } from 'react-map-gl';
import { MapContext } from "../../Base";

const INITIAL_VIEW_STATE = {
    longitude: -122.41669,
    latitude: 37.7853,
    zoom: 13
};

function Map() {
    const mapRef = useRef();
    const ctx = useContext(MapContext);
    const setMap = ctx?.setMap;
    const rasterList = ctx?.rasterList;

    useEffect(() => {
        let protocol = new Protocol();
        maplibregl.addProtocol("pmtiles", protocol.tile);
        return () => {
            maplibregl.removeProtocol("pmtiles");
        }
    }, []);


    return (
        <RMap
            mapStyle="https://api.maptiler.com/maps/dataviz/style.json?key=ur6Yh3ULc6QjatOYBgln"
            mapLib={maplibregl}

        >
            {rasterList.map((r, i) => {
                return <Source key={r.id} id={`source-${r.id}`} type={r.type} url={`pmtiles://${r.url}`}>
                    <Layer id={`layer-${r.id}`} type={r.type} source={`source-${r.id}`} layout={{ visibility: r.visibility }} paint={{ "raster-opacity": r.opacity / 100 }} />
                </Source>
            })

            }

        </RMap>
    )
}

export default Map;

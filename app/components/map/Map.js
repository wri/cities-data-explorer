"use client";

import { Map as OlMap } from "ol";
import { defaults as defaultControls, FullScreen } from "ol/control";
import { Tile as TL } from "ol/layer";

import "ol/ol.css";
import { useGeographic } from "ol/proj";
import XYZ from "ol/source/XYZ";
import View from "ol/View";
import {
    useContext,
    useEffect,
    useRef
} from "react";
import { MapContext } from "../../page";


function Map() {
    const mapRef = useRef();
    const ctx = useContext(MapContext);
    const setMap = ctx?.setMap;
    useGeographic();

    useEffect(() => {
        const hybrid = new TL({
            title: "Hybrid",
            type: "base",
            source: new XYZ({
                url: "https://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}",
            }),
        });


        const fs = defaultControls().extend([new FullScreen()]);
        let options = {
            view: new View({
                center: [18.4235, -33.9218],
                zoom: 14,
                maxZoom: 28,
            }),
            layers: [
                hybrid,

            ],
            controls: fs,
            overlays: [],

        };
        let mapObject = new OlMap(options);
        mapObject.setTarget(mapRef.current);
        setMap(mapObject);
        return () => {
            mapObject.setTarget(undefined);
        };
    }, []);

    return (

        <div
            id="map-div"
            ref={mapRef}
            className="w-full h-[100vh]"
        >
        </div>
    )
}

export default Map;

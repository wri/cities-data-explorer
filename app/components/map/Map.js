"use client";

import { Map as OlMap } from "ol";
import { defaults as defaultControls, FullScreen } from "ol/control";
import { Tile as TL } from "ol/layer";
// import TileLayer from 'ol/layer/WebGLTile.js';
import { MapContext } from "@/app/page";
import "ol/ol.css";
import { useGeographic } from "ol/proj";
import XYZ from "ol/source/XYZ";
import View from "ol/View";
import {
    useContext,
    useEffect,
    useRef
} from "react";


function Map() {
    const mapRef = useRef();
    const ctx = useContext(MapContext);
    const map = ctx?.map;
    const setMap = ctx?.setMap;
    const setRasterList = ctx?.setRasterList
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

    useEffect(() => {
        if (map && setRasterList) {
            let PuneObj = {
                id: 1,
                url: "http://localhost:3000/tiles/pune_lulc/{z}/{x}/{y}.png",
                name: "Pune Lulc",
                is_visible: true,
                center: [73.7571, 18.4326]
            }
            let CapeTown1200Obj = {
                id: 2,
                url: "http://localhost:3000/tiles/Capetown_UTCI_2022_22_1200/{z}/{x}/{y}.png",
                name: "CapeTown UTCI 2022_22 12:00",
                is_visible: true,
                center: [18.4235, -33.9218]
            }
            let CapeTown1500Obj = {
                id: 3,
                url: "http://localhost:3000/tiles/Capetown_UTCI_2022_22_1500/{z}/{x}/{y}.png",
                name: "CapeTown UTCI 2022_22 12:00",
                is_visible: true,
                center: [18.4235, -33.9218]
            }
            let CapeTown1800Obj = {
                id: 4,
                url: "http://localhost:3000/tiles/Capetown_UTCI_2022_22_1800/{z}/{x}/{y}.png",
                name: "CapeTown UTCI 2022_22 12:00",
                is_visible: true,
                center: [18.4235, -33.9218]
            }
            let CapeTownLulcObj = {
                id: 5,
                url: "http://localhost:3000/tiles/Capetown_LULC/{z}/{x}/{y}.png",
                name: "CapeTown Lulc",
                is_visible: true,
                center: [18.4235, -33.9218]
            }
            let CapeTownTreeCanopyObj = {
                id: 6,
                url: "http://localhost:3000/tiles/Capetown_tree_canopy/{z}/{x}/{y}.png",
                name: "CapeTown Tree Canopy",
                is_visible: true,
                center: [18.4235, -33.9218]
            }
            let CapeTownBuildingObj = {
                id: 6,
                url: "http://localhost:3000/tiles/capetown_buildings_raster/{z}/{x}/{y}.png",
                name: "CapeTown Buildings",
                is_visible: true,
                center: [18.4235, -33.9218]
            }
            setRasterList([CapeTownBuildingObj])
        }

    }, [map, setRasterList])

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

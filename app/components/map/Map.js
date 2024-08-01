"use client";

import { DeckGL } from "deck.gl";
import {
    useContext,
    useRef
} from "react";
import { Map as RMap } from 'react-map-gl';
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


    return (
        <DeckGL
            initialViewState={INITIAL_VIEW_STATE}
            controller
        >
            <RMap
                mapStyle="mapbox://styles/mapbox/light-v9"
                mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_KEY}
            />
        </DeckGL>
    )
}

export default Map;

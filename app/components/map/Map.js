"use client";

import { DeckGL } from "deck.gl";
import {
    useContext,
    useEffect,
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

    useEffect(() => {
    }, []);

    return (
        <DeckGL
            initialViewState={INITIAL_VIEW_STATE}
            controller
        >
            <RMap
                mapStyle="mapbox://styles/mapbox/light-v9"
                mapboxAccessToken="pk.eyJ1IjoicmVzb3VyY2V3YXRjaCIsImEiOiJjbHo4dWU5NnMwNHpzMmlvanJtODBma2Y4In0.bXap405a9vR6BLcTpaTdZA"
            />
        </DeckGL>
    )
}

export default Map;

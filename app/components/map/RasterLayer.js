import { MapContext } from "@/app/page";
import { Tile as TL } from "ol/layer";
import XYZ from "ol/source/XYZ";
import { useContext } from "react";

export const RasterLayer = ({ rasterObj }) => {
    const ctx = useContext(MapContext);
    const map = ctx?.map;

    const source = new XYZ({
        url: rasterObj.url,

    })
    const layer = new TL({
        source: source,
    });
    map?.addLayer(layer)


    return (<div>
        {rasterObj.name}
    </div>)

}
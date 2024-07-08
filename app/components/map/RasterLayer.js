import { MapContext } from "@/app/page";
import { Tile as TL } from "ol/layer";
import XYZ from "ol/source/XYZ";
import { useContext, useEffect, useState } from "react";

export const RasterLayer = ({ rasterObj }) => {
    const ctx = useContext(MapContext);
    const map = ctx?.map;
    const [layer, setLayer] = useState(null)
    const [opacity, setOpacity] = useState(1)

    useEffect(() => {
        const source = new XYZ({
            url: rasterObj.url,

        })
        const layer = new TL({
            source: source,
        });
        setLayer(layer)
        map?.addLayer(layer)
    }, [])


    const handleCheckbox = (e) => {
        let checked = e.target.checked;
        layer.setVisible(checked);
    };


    const handleOpacity = (e) => {
        let opacity = e.target.value;
        setOpacity(parseFloat(opacity))
        layer.setOpacity(parseFloat(opacity));
    };

    return (
        <div >
            <div className="flex align-middle">
                <label className="inline-flex items-center checkbox-container">
                    <input
                        type="checkbox"
                        id={`show-raster-${rasterObj.id}`}
                        name={`show-shp-${rasterObj.id}`}
                        defaultChecked
                        onChange={handleCheckbox}
                        className="hidden peer"
                    />
                    <span className="checkbox peer-checked:bg-slate-600 peer-checked:after:block"></span>
                </label>
                {rasterObj.name}
            </div>
            <div>
                <label>
                    <input id="opacity-input" type="range" min="0" max="1" step="0.01"
                        onChange={handleOpacity}
                        value={opacity}
                    />
                    <span id="opacity-output"></span>
                </label>
            </div>
        </div>)

}
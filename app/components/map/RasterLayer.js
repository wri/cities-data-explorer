import { MapContext } from "../../Base";

// import XYZ from "ol/source/XYZ";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import TileLayer from 'ol/layer/WebGLTile.js';
import GeoTIFF from 'ol/source/GeoTIFF.js';
import { useContext, useEffect, useState } from "react";
export const RasterLayer = ({ rasterObj }) => {
    const ctx = useContext(MapContext);
    const map = ctx?.map;
    const [layer, setLayer] = useState(null)
    const [opacity, setOpacity] = useState(1)
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id: rasterObj.id });
    let t = null;
    if (transform) {
        t = CSS.Transform.toString(transform);
    }
    const style = {
        transform: t,
        transition,
    };

    useEffect(() => {
        async function init() {
            let url = `https://${process.env.NEXT_PUBLIC_BUCKET}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/` + rasterObj.path
            const source = new GeoTIFF({
                convertToRGB: true,
                sources: [
                    {
                        bands: [1, 2, 3],
                        nodata: 0,
                        url: url,
                        min: 1,
                        max: 7,
                    },
                ],
                // normalize: false,

            })
            const layer = new TileLayer({
                source: source,
                maxZoom: 22,
                minZoom: 12,
                cacheSize: 512
                // style: {
                //     color: [
                //         'case',
                //         ['>', ['band', 2], 0],
                //         [
                //             'interpolate',
                //             ['linear'],
                //             ['band', 1],
                //             0, [0, 89, 179, 0.01],
                //             90, [255, 234, 0, 5.0],
                //         ],
                //         [0, 0, 0, 0],
                //     ],
                // },
            });
            setLayer(layer)
            map?.addLayer(layer)
            let v = await source.getView()
            map.getView().setCenter(v.center)
        }
        init()
    }, [])


    const handleCheckbox = (e) => {
        let checked = e.target.checked;
        layer.setVisible(checked);
    };


    const handleOpacity = (e) => {
        let opacity = e.target.value;
        layer.setOpacity(parseFloat(opacity));
        setOpacity(parseFloat(opacity))
    };

    return (
        <div style={style} ref={setNodeRef}>
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
                <span {...attributes} {...listeners}>{rasterObj.name}</span>
            </div>
            <div>
                <label>
                    <input id="opacity-input" type="range" min="0" max="1" step="0.01"
                        onChange={handleOpacity}
                        value={opacity}
                    />
                    <span id="opacity-output"
                    ></span>
                </label>
            </div>
        </div>)

}
import { MapContext } from "../../Base";

// import XYZ from "ol/source/XYZ";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import TileLayer from 'ol/layer/WebGLTile.js';
import GeoTIFFSource from 'ol/source/GeoTIFF.js';
import { useContext, useEffect, useState } from "react";
export const RasterLayer = ({ rasterObj }) => {
    const ctx = useContext(MapContext);
    const map = ctx?.map;
    const [layer, setLayer] = useState(null)
    const [opacity, setOpacity] = useState(1)
    const [max, setMax] = useState(100)
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

    function getVariables() {
        // const variables = {};
        // for (const channel of channels) {
        //   const selector = document.getElementById(channel);
        //   variables[channel] = parseInt(selector.value, 10);

        //   const inputId = `${channel}Max`;
        //   const input = document.getElementById(inputId);
        //   variables[inputId] = parseInt(input.value, 10);
        // }
        return { "redMax": max, "greenMax": max, "blueMax": max, "red": 1, "green": 1, "blue": 1 };
    }

    useEffect(() => {
        async function init() {
            let url = `https://${process.env.NEXT_PUBLIC_BUCKET}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/` + rasterObj.path
            const source = new GeoTIFFSource({
                sources: [
                    {
                        nodata: 0,
                        url: url
                    },
                ],
                normalize: false,

            })
            const layer = new TileLayer({
                source: source,
                maxZoom: 22,
                minZoom: 8,
                cacheSize: 512,
                style: {
                    variables: getVariables(),
                    color: [
                        'case',
                        ['==', ['band', 2], 0],
                        '#00000000',
                        [
                            'array',
                            ['/', ['band', ['var', 'red']], ['var', 'redMax']],
                            ['/', ['band', ['var', 'green']], ['var', 'greenMax']],
                            ['/', ['band', ['var', 'blue']], ['var', 'blueMax']],
                            1,
                        ]
                    ],
                    // variables: getVariables(),
                    // color: [
                    //     'array',
                    //     ['/', ['band', ['var', 'red']], ['var', 'redMax']],
                    //     ['/', ['band', ['var', 'green']], ['var', 'greenMax']],
                    //     ['/', ['band', ['var', 'blue']], ['var', 'blueMax']],
                    //     // ['/', ['band', 4], 0],
                    //     1
                    // ],
                },
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
        setMax(parseInt(e.target.value))
        layer.updateStyleVariables(getVariables());
        // let sf = layer.getSource().sourceInfo_[0]
        // layer.getSource().sourceInfo_ = [{ ...sf, min: 1, max: 7 }]
        // // layer.getSource().updateParams({ "min": 1, "max": 7 })
        // layer.unvrender();
        // layer.render();
        // layer.getSource().refresh();
        // console.log(sf.getAttributions())
        // layer.source.min = 10
        // let opacity = e.target.value;
        // layer.setOpacity(parseFloat(opacity));
        // setOpacity(parseFloat(opacity))
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
                    <input id="opacity-input" type="range" min="1" max="255" step="1"
                        onChange={handleOpacity}
                        value={max}
                    />
                    <span id="opacity-output"
                    ></span>
                </label>
            </div>
        </div>)

}
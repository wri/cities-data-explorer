import { IoMdEye } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import { MapContext } from "../../Base";

// import XYZ from "ol/source/XYZ";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useContext, useState } from "react";
export const RasterLayer = ({ rasterObj }) => {
    const ctx = useContext(MapContext);
    const map = ctx?.map;
    const setRasterList = ctx?.setRasterList;
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


    const handleCheckbox = (e) => {
        let visibility = "none";
        if (e.target.checked) visibility = "visible"

        setRasterList(prev => {
            let newList = []
            prev.forEach(l => {
                if (l.id == rasterObj.id) l.visibility = visibility
                newList.push(l)
            })
            return newList
        })
    };


    const handleOpacity = (e) => {
        setMax(parseInt(e.target.value))

        setRasterList(prev => {
            let newList = []
            prev.forEach(l => {
                if (l.id == rasterObj.id) l.opacity = parseInt(e.target.value)
                newList.push(l)
            })
            return newList
        })
    };

    return (
        <div style={style} ref={setNodeRef} className="flex justify-between align-items">
            <div>
                <div className="flex align-middle gap-4">
                    <label className="inline-flex items-center checkbox-container">
                        <input
                            type="checkbox"
                            id={`show-raster-${rasterObj.id}`}
                            name={`show-raster-${rasterObj.id}`}
                            defaultChecked
                            onChange={handleCheckbox}
                            className="hidden peer"
                        />
                        <span className="checkbox peer-checked:bg-slate-600 peer-checked:after:block"></span>
                    </label>
                    <span className="my-auto cursor-pointer"><IoMdEye className="text-lg" onClick={() => {
                    }} /></span>
                    <span className="cursor-move" {...attributes} {...listeners}>{rasterObj?.name}</span>
                </div>
                <div>
                    <label>
                        <input id="opacity-input" type="range" min="1" max="100" step="1"
                            onChange={handleOpacity}
                            value={max}
                        />
                        <span id="opacity-output"
                        ></span>
                    </label>
                </div>
            </div>
            <span className="my-auto"><IoCloseSharp className="text-2xl" onClick={() => {
                setRasterList(prev => {
                    return prev.filter(l => {
                        return l.id !== rasterObj.id
                    })
                })
            }} /></span>
        </div>)

}
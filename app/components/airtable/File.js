'use client'
import { useContext } from "react";
import { FaRegFile } from "react-icons/fa";
import { v4 as uuidv4 } from 'uuid';
import { MapContext } from "../../Base";


export default function File({ file }) {
    const ctx = useContext(MapContext);
    const setRasterList = ctx?.setRasterList;
    return (
        <div className="hover:cursor-pointer">
            <span onClick={() => { setRasterList(prev => [...prev, { ...file, id: uuidv4() }]) }} className="flex gap-2">
                <FaRegFile />{file?.fields?.Name}</span>
        </div>
    );
}
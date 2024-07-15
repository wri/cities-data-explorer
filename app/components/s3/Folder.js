

'use client'
import { FaFolder } from "react-icons/fa";


export default function Folder({ folder, setPrefix, setPrev }) {
    return (
        <div className="hover:cursor-pointer flex flex-row items-center">
            <span className="flex gap-2" onClick={() => setPrefix(prev => {
                setPrev(prev)
                return folder.path
            })}>
                <FaFolder />{folder.name}</span>
        </div>
    );
}

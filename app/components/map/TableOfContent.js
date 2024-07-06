import { RasterLayer } from "./RasterLayer";

export const TableOfContent = ({ rasterList }) => {
    return <div className="p-4 overflow-auto flex-1 text-black">
        {rasterList.map((r, i) => {
            return < RasterLayer
                key={`tbc-${i}-${r.id}`}
                rasterObj={r}
            />
        })


        }
    </div>
}
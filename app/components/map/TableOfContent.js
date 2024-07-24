import {
    closestCenter,
    DndContext,
    DragOverlay,
    PointerSensor,
    TouchSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useContext, useEffect, useState } from "react";
import { MapContext } from "../../Base";
import { RasterLayer } from "./RasterLayer";

export const TableOfContent = () => {
    const [sortedLayers, setSortedLayers] = useState([]);
    const [activeLayerId, setActiveLayerId] = useState(null);
    const ctx = useContext(MapContext);
    const rasterList = ctx?.rasterList
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        }),
        useSensor(TouchSensor, {
            activationConstraint: {
                distance: 8,
            },
        })
    );
    useEffect(() => {
        const sorted = rasterList.sort(
            (a, b) => a.position - b.position
        );
        setSortedLayers(sorted);
    }, [rasterList]);

    function handleDragStart(event) {
        const { active } = event;
        setActiveLayerId(active.id);
    }
    function handleDragEnd(event) {
        const { active, over } = event;
        if (active && over) {
            if (active?.id !== over?.id) {
                setSortedLayers((prev) => {
                    const oldIndex = prev.findIndex(
                        (item) =>
                            item.id === active?.id
                    );
                    const newIndex = prev.findIndex(
                        (item) =>
                            item.id === over.id
                    );
                    return arrayMove(prev, oldIndex, newIndex);
                });
            }
            setActiveLayerId(null);
        }
    }
    return <div className="p-4 overflow-auto flex-1 text-black flex flex-col gap-6">
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <SortableContext
                items={sortedLayers.map((item) => {
                    return item.id;
                })}
                strategy={verticalListSortingStrategy}
            >
                {sortedLayers.map((r, i) => {
                    return <RasterLayer
                        key={`tbc-${i}-${r.id}`}
                        id={`tbc-${i}-${r.id}`}
                        rasterObj={r}
                    />
                })

                }
            </SortableContext>
            <DragOverlay>{activeLayerId ? <span></span> : null}</DragOverlay>

        </DndContext>

    </div>
}
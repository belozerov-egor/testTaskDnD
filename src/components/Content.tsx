import { useState } from "react";
import { styled } from "styled-components";
import { ControlBlock } from "./ControlBlock";
import { TableBlock } from "./TableBlock";
import {
    DragDropContext,
    Droppable,
    Draggable,
    DropResult,
} from "react-beautiful-dnd";

type BlockType = {
    id: string;
    content: JSX.Element;
};

export const Content = () => {
    const [workBlocks, setWorkBlocks] = useState<BlockType[]>([]);
    const [menuBlocks, setMenuBlocks] = useState<BlockType[]>([
        { id: "control", content: <ControlBlock /> },
        { id: "table", content: <TableBlock /> },
    ]);

    const handleDragEnd = (result: DropResult) => {
        if (!result.destination) {
            return;
        }

        const sourceIndex = result.source.index;

        if (
            result.source.droppableId === "menuBlock" &&
            result.destination.droppableId === "workBlock"
        ) {
            const block = menuBlocks[sourceIndex];
            setMenuBlocks((blocks) => [
                ...blocks.slice(0, sourceIndex),
                ...blocks.slice(sourceIndex + 1),
            ]);
            setWorkBlocks((blocks) => [...blocks, block]);
        }
    };

    return (
        <ContentBlock>
            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="workBlock">
                    {(provided) => (
                        <ul
                            className="workBlock"
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {workBlocks.map((block, index) => (
                                <Draggable
                                    key={block.id}
                                    draggableId={block.id}
                                    index={index}
                                >
                                    {(provided) => (
                                        <li
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            {block.content}
                                        </li>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </ul>
                    )}
                </Droppable>
                <Droppable droppableId="menuBlock">
                    {(provided) => (
                        <ul
                            className="menuBlock"
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {menuBlocks.map((block, index) => (
                                <Draggable
                                    key={block.id}
                                    draggableId={block.id}
                                    index={index}
                                >
                                    {(provided) => (
                                        <li
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            {block.content}
                                        </li>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </ul>
                    )}
                </Droppable>
            </DragDropContext>
        </ContentBlock>
    );
};

const ContentBlock = styled.div`
    display: flex;
    padding: 20px 20px;
    width: 100%;
    background-color: lightgray;

    .workBlock {
        width: 80%;
        display: flex;
        gap: 15px;
        flex-wrap: wrap;
        li {
            width: 389px;
            height: 389px;
            border: 1px solid black;
        }
    }
    .menuBlock {
        width: 296px;
        height: 827px;
        background-color: white;
        li {
            width: 252px;
            height: 252px;
            background-color: green;
            list-style: none;
            border: 1px solid black;
        }
    }
`;

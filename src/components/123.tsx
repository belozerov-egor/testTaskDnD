import React, { useState } from "react";
import { styled } from "styled-components";
import { ControlBlock } from "./ControlBlock";
import { TableBlock } from "./TableBlock";
import {
    DragDropContext,
    Droppable,
    Draggable,
    DropResult,
} from "react-beautiful-dnd";

 const Content = () => {
    const [workBlocks, setWorkBlocks] = useState([
        { id: "1", content: <div>Work Block 1</div> },
        { id: "2", content: <div>Work Block 2</div> },
        { id: "3", content: <div>Work Block 3</div> },
        { id: "4", content: <div>Work Block 4</div> },
    ]);
    const [menuBlocks, setMenuBlocks] = useState([
        { id: "control", content: <ControlBlock /> },
        { id: "table", content: <TableBlock /> },
    ]);

    const handleDragEnd = (result: DropResult) => {
        if (!result.destination) {
            return;
        }

        const sourceIndex = result.source.index;
        const destinationIndex = result.destination.index;

        if (
            result.source.droppableId === "workBlock" &&
            result.destination.droppableId === "menuBlock"
        ) {
            const block = workBlocks[sourceIndex];
            setWorkBlocks((blocks) => [
                ...blocks.slice(0, sourceIndex),
                ...blocks.slice(sourceIndex + 1),
            ]);
            setMenuBlocks((blocks) => [...blocks, block]);
        } else if (
            result.source.droppableId === "menuBlock" &&
            result.destination.droppableId === "workBlock"
        ) {
            const block = menuBlocks[sourceIndex];
            setMenuBlocks((blocks) => [
                ...blocks.slice(0, sourceIndex),
                ...blocks.slice(sourceIndex + 1),
            ]);
            setWorkBlocks((blocks) => [
                ...blocks.slice(0, destinationIndex),
                block,
                ...blocks.slice(destinationIndex),
            ]);
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
                                            <div>{block.content}</div>
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
                                            <div>{block.content}</div>
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
    width: 100%;
    background-color: lightgray;

    .workBlock {
        width: 80%;
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
        li {
            width: 500px;
            height: 500px;
            border: 1px solid black;
        }
    }
    .menuBlock {
        width: 20%;

        li {
            width: 50%%;
            height: 50%;
            background-color: green;
            list-style: none;
            border: 1px solid black;
        }
    }
`;

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
import {TableWidget} from "./widget/TableWidget.tsx";
import {ControlWidget} from "./widget/ControlWidget.tsx";



type BlockType = {
    id: string;
    content?: JSX.Element;
};

export const Content = () => {
    const [workBlocks, setWorkBlocks] = useState<BlockType[]>([ ]);
    const [menuBlocks, setMenuBlocks] = useState<BlockType[]>([
        { id: "control", content: <ControlWidget/> },
        { id: "table", content: <TableWidget/> },
    ]);

    const handleDragEnd = (result: DropResult) => {
        if (!result.destination) {
            return;
        }

        const sourceIndex = result.source.index;
        const destinationIndex = result.destination.index;

        if (
            result.source.droppableId === 'menuBlock' &&
            result.destination.droppableId === 'workBlock'
        ) {
            const block = menuBlocks[sourceIndex];

            setMenuBlocks((blocks) => [
                ...blocks.slice(0, sourceIndex),
                ...blocks.slice(sourceIndex + 1),
            ]);

            const updatedBlock: BlockType = { id: block.id };

            if (block.id === 'control') {
                updatedBlock.content = <ControlBlock />;
            } else if (block.id === 'table') {
                updatedBlock.content = <TableBlock />;
            }

            setWorkBlocks((blocks) => [
                ...blocks.slice(0, destinationIndex),
                updatedBlock,
                ...blocks.slice(destinationIndex),
            ]);
        } else if (
            result.source.droppableId === 'workBlock' &&
            result.destination.droppableId === 'menuBlock'
        ) {
            const block = workBlocks[sourceIndex];

            setWorkBlocks((blocks) => [
                ...blocks.slice(0, sourceIndex),
                ...blocks.slice(sourceIndex + 1),
            ]);

            const updatedBlock: BlockType = { id: block.id };

            if (block.id === 'control') {
                updatedBlock.content = <ControlWidget />;
            } else if (block.id === 'table') {
                updatedBlock.content = <TableWidget />;
            }

            setMenuBlocks((blocks) => [
                ...blocks.slice(0, destinationIndex),
                updatedBlock,
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
            width: 550px;
            height: 550px;
            border: 1px solid black;
        }
    }
    .menuBlock {
        width: 296px;
        height: 827px;
        background-color: white;
        align-items: center;
        li {
            list-style: none;
        }
    }
`;

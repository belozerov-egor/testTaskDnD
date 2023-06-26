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
import {GraphWidget} from "./widget/GraphWidget.tsx";
import {GraphBlock} from "./GraphBlock.tsx";
import button from "../img/menu.svg"



type BlockType = {
    id: string;
    content?: JSX.Element;
};

export const Content = () => {
    const [workBlocks, setWorkBlocks] = useState<BlockType[]>([ ]);
    const [menuBlocks, setMenuBlocks] = useState<BlockType[]>([
        { id: "control", content: <ControlWidget/> },
        { id: "table", content: <TableWidget/> },
        { id: "graph", content: <GraphWidget/> },
    ]);
    const [visible, setVisible ] = useState<boolean>(true);

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
            } else if (block.id === 'graph') {
                updatedBlock.content = <GraphBlock />;
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
            }else if (block.id === 'graph') {
                updatedBlock.content = <GraphWidget />;
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
                {visible && <Droppable droppableId="menuBlock">
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
                </Droppable>}
            </DragDropContext>
            <button onClick={()=> setVisible(!visible)}><img src={button}/></button>
        </ContentBlock>
    );
};

const ContentBlock = styled.div`
  display: flex;
  padding: 20px 20px;
  width: 100%;
  background-color: #E0F1FF;
  position: relative;

  .workBlock {
    flex: 1;
    width: 100%;
    display: flex;
    gap: 15px;
    flex-wrap: wrap;
  }

  .menuBlock {
    width: 296px;
    height: 827px;
    border-radius: 15px;
    background-color: #FFF;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    top: 83px;
    right: 20px;
  }
  button {
    position: absolute;
    top: 20px;
    right: 20px;
    cursor: pointer;
    background-color: transparent;
  }
`;

import { styled } from 'styled-components';
import { ControlBlock } from './ControlBlock';
import { TableBlock } from './TableBlock';

export const Test = () => {
    return (
            <ContentBlock>
                <ul className='workBlock'>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
                <ul className='menuBlock'>
                    <li><ControlBlock /></li>
                   <li> <TableBlock /></li>
                </ul>
            </ContentBlock>
    );
};


const ContentBlock = styled.div`
display: flex;
    width: 100%;
    background-color: lightgray;
    & .workBlock {
        display: flex;
        flex-wrap: wrap;
        gap: 15px;
        width: 80%;
        background-color: white;
        div {
            width: 45%;
            height: 50%;
            background-color: green;
        }
    }
`
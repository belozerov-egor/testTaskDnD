import table from "../../img/table.svg";
import {styled} from "styled-components";



export const TableWidget = () => {
    return (
    <ContentBlock>
        <img src={table} alt=""/>
    </ContentBlock>
    );
};

const ContentBlock = styled.div`
width: 100%;
`





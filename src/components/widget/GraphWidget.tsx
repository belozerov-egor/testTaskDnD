import graph from "../../img/graph.svg";
import {styled} from "styled-components";



export const GraphWidget = () => {
    return (
    <ContentBlock>
        <img src={graph} alt=""/>
    </ContentBlock>
    );
};

const ContentBlock = styled.div`
width: 100%;
  height: 100%;
`





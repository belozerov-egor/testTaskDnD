import control from "../../img/control.svg";
import {styled} from "styled-components";


export const ControlWidget = () => {
    return (
    <ContentBlock>
        <img src={control} alt=""/>
    </ContentBlock>
    );
};

const ContentBlock = styled.div`
width: 100%;
  img {
    width: 100%;
  }
`




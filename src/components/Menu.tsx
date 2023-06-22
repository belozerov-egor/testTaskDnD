import { styled } from "styled-components";
import { ControlBlock } from "./ControlBlock";
import { TableBlock } from "./TableBlock";



export const Menu = () => {
  return(
<MenuBlock>
<ControlBlock/>
<TableBlock/>
 </MenuBlock>
  ) 
};

const MenuBlock = styled.div`
  width: 30%;
  height: 100%;
  background-color: white;
`;

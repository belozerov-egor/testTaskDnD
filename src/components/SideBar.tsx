import { styled } from "styled-components";
import panelIcon from "../img/panelIcon.svg"

export const SideBar = () => {
    return (
        <SideBarBlock>
            <div className="menuIconBlock">
                <img src={panelIcon} alt="panelIcon" />
                <span>Панель</span>
            </div>
        </SideBarBlock>
    );
};

const SideBarBlock = styled.div`
padding-top: 40px;
padding-left: 44px;
width: 17%;
height: 100vh;
.menuIconBlock {
    display: flex;
    img {
        margin-right: 21px;  
     }
}
 
`

import { NavLink } from "react-router-dom";
import { styled } from "styled-components";
import panelIcon from "../img/panelIcon.svg";

export const SideBar = () => {
    return (
        <SideBarBlock>
            <NavLink  to="/panel"  className={'menuIconBlock'}>
                <img src={panelIcon} alt="panelIcon" />
                <span>Панель</span>
            </NavLink>
        </SideBarBlock>
    );
};

const SideBarBlock = styled.div`
  padding-top: 40px;
  width: 17%;
  height: 100vh;

  .menuIconBlock {
    padding: 10px 0 10px 44px;
    display: flex;
    width: 100%;

    img {
      margin-right: 21px;
    }
  }
  a.active {
    background: #E0F1FF;
    border-left: 1px solid #005FB8;
  }
`;

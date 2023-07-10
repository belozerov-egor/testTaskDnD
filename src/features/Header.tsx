import styled from "styled-components";
import logo from "../common/img/logo.svg"

export const Header = () => {
    return (
        <HeaderBlock>
            <img src={logo} alt="logo"/>
            <span>Энергия</span>
        </HeaderBlock>
    );
};


const HeaderBlock = styled.div`
  padding: 23px 24px;
  display: flex;
  align-items: center;

  img {
    margin-right: 10px;
  }

  span {
    font-size: 20px;
    font-weight: 600;
  }
`

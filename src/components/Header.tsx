import styled from "styled-components";
import logo from "../img/logo.svg"

export const Header = () => {
    return (
        <HeaderBlock>
            <img src={logo} alt="logo"/>
        </HeaderBlock>
    );
};


const HeaderBlock = styled.div`
    padding: 23px 24px;
`

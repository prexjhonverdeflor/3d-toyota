import React, { useState } from "react";
import styled from "styled-components";
import { MenuRounded, Search } from "@mui/icons-material";
import Image from "./img/initial.png";


const Nav = styled.div`

  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: sticky;
  top: 0;
  z-index: 10;
  color: white;
  padding: 20px 0;
  font-size: 24px;
  letter-spacing: 1px;
  color: #464646;
  font-weight: 900;
  font-family: 'Monument Extended', sans-serif;
`;

const NavbarContainer = styled.div`
  color: ${({ theme }) => theme.black};
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1rem;
  
`;


const NavLogo = styled.div`
  width: 80%;
  padding: 0 6px;
  font-weight:900;
  font-size: 24px;
  text-decoration: none;
  color: ${({ theme }) => theme.text_primary};
  @media screen and (max-width: 768px) {
    margin:0;
  }
`;

const NavItems = styled.ul`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  
  @media screen and (max-width: 952px) {
    display: none;
  }
`;

const NavLink = styled.a`
  position: relative;
  color: ${({ theme }) => theme.text_primary};
  cursor: pointer;
  transition: color 0.2s ease-in-out;
  text-decoration: none;
  padding: 0 6px;
  font-weight: 900;
  font-size: 16px;

  &::after {
    content: '';
    position: absolute;
    bottom: -5px; /* Adjust as needed */
    left: 50%;
    width: 0;
    height: 3px;
    background-color: currentColor;
    transition: width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), left 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  }

  &:hover::after {
    width: 100%;
    left: 0;
  }

`;

const ButtonContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 0;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const GithubButton = styled.a`
  color: ${({ theme }) => theme.text_primary};
  justify-content: center;
  display: flex;
  align-items: center;
  border-radius: 50px;
  cursor: pointer;
  padding: 0;
  font-size: 20px;
  font-weight: 900;
  transition: all 0.6s ease-in-out;
  text-decoration: none;
  margin-left: auto; /* This will push the button to the right end */

  @media screen and (max-width: 640px) {
    border: none;
    background: none;
    font-size: 18px;
  }

  @media screen and (max-width: 952px) {
    display:none;
  }

`;







const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (

    <Nav >
      <NavbarContainer>
          <NavLogo href="" >
            <MenuRounded fontSize="large" style={{ color: "inherit", cursor: "pointer" }} />
          </NavLogo>
    
          <NavItems>
            <img src={Image} style={{ width: '100px', height: 'auto', }}/>
          </NavItems>

          <ButtonContainer>
            <GithubButton  target="_Blank">
                <Search fontSize="large"  style={{ color: "inherit"}} />
            </GithubButton>
          </ButtonContainer>
      </NavbarContainer>

    </Nav>

  );
};

export default Navbar;

// Navbar.js
import React from "react";
import { Navbar, NavbarBrand, Nav, NavbarText } from "reactstrap";
import { LogOut } from "lucide-react";

function AppNavbar({ isLoggedIn, handleLogoutClick }) {
  return (
    <div>
      {isLoggedIn ? (
        <Navbar color="dark" dark className="mb-5">
          <NavbarBrand href="/">Steth Up</NavbarBrand>
          <Nav className="ml-auto" navbar>
            <NavbarText onClick={handleLogoutClick}>
              <LogOut /> Logout
            </NavbarText>
          </Nav>
        </Navbar>
      ) : null}
    </div>
  );
}

export default AppNavbar;

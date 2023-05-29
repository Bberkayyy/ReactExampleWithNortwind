import React from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import CartSummary from "../cart/CartSummary";
import { Link } from "react-router-dom";

export default class Navi extends React.Component {
  constructor(props) {
    super(props);
    this.toogle = this.toogle.bind(this);
    this.state = { isOpen: false };
  }
  toogle() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand>
            <Link to="/">Nortwind App</Link>
          </NavbarBrand>
          <NavbarToggler onClick={this.toogle}></NavbarToggler>
          <Collapse isOpen={this.state.isOpen} navbar></Collapse>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink>
                <Link to="/saveproduct">Ürün Ekle</Link>
              </NavLink>
            </NavItem>
            <CartSummary></CartSummary>
          </Nav>
        </Navbar>
      </div>
    );
  }
}

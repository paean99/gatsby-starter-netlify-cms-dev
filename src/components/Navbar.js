import { Link } from "gatsby";
import React from "react";
import amazingview from "../img/amazingview.svg";

const Navbar = class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      navBarActiveClass: "",
    };
  }

  render() {
    return (
      <nav
        className="navbar is-transparent"
        role="navigation"
        aria-label="main-navigation"
      >
        <div className="container">
          <div className="navbar-brand">
            <Link to="/" className="navbar-item" title="Logo">
              <img
                src={amazingview}
                alt="AmazingView"
                style={{ width: "150px", "max-height": "3rem" }}
              />
            </Link>
          </div>
        </div>
      </nav>
    );
  }
};

export default Navbar;

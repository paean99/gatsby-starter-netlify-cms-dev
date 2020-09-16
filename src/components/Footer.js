import React from "react";
import amazingview from "../img/amazingview.svg";

const Footer = class extends React.Component {
  render() {
    return (
      <footer className="footer has-background-black has-text-white-ter">
        <div className="content has-text-centered">
          <img
            src={amazingview}
            alt="amazingview"
            style={{ width: "14em", height: "10em" }}
          />
        </div>
      </footer>
    );
  }
};

export default Footer;

import PropTypes from "prop-types";
import React from "react";
import PreviewCompatibleImage from "../components/PreviewCompatibleImage";

const FeatureGrid = ({ gridItems }) => {
  console.log("FeatureGrid: ", gridItems);
  return (
    <div className="columns is-multiline">
      {gridItems.map((image) => (
        <section key={image.src} className="section">
          <div
            style={{
              width: "240px",
              display: "inline-block",
            }}
          >
            <PreviewCompatibleImage imageInfo={image} />
          </div>
        </section>
      ))}
    </div>
  );
};

FeatureGrid.propTypes = {
  gridItems: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
      text: PropTypes.string,
    })
  ),
};

export default FeatureGrid;

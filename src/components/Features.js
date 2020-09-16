import PropTypes from "prop-types";
import React from "react";
import PreviewCompatibleImage from "../components/PreviewCompatibleImage";

const FeatureGrid = ({ gridItems }) => {
  console.log("FeatureGrid: ", gridItems);
  return (
    <div className="columns is-multiline">
      {gridItems.map((image) => (
        <div key={image.src} className="column is-6">
          <section className="section">
            <div className="has-text-centered">
              <div
                style={{
                  width: "240px",
                  display: "inline-block",
                }}
              >
                <PreviewCompatibleImage imageInfo={image} />
              </div>
            </div>
            {/* <p>{image.text}</p> */}
          </section>
        </div>
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

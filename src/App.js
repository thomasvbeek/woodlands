import React, { useRef, useState } from "react";
import Woodlands from "./maps/woodlands";
import Lsd from "./maps/lsd";
import Geometry from "./maps/geometry";

import "./styles.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: false,
      map: "geometry"
    };
  }

  setMap = e => {
    this.setState({
      menu: false,
      map: e
    });
  };

  render() {
    const { menu, map } = this.state;
    return (
      <div className="canvas">
        <div className={`control ${map ? "center" : ""}`}>
          <svg width="50" height="35" viewBox="0 0 100 71" fill="none">
            <path
              d="M15.3737 0H6.70835C3.36255 0 0.960799 3.22237 1.91681 6.42868L20.0881 67.3724C20.7199 69.4913 22.6685 70.9437 24.8796 70.9437H31.8676C35.1605 70.9437 37.5542 67.816 36.694 64.6375L20.2001 3.69378C19.6101 1.51385 17.6321 0 15.3737 0Z"
              fill="white"
            />
            <path
              d="M55.3333 0H46.6679C43.3221 0 40.9204 3.22237 41.8764 6.42868L60.0477 67.3724C60.6795 69.4913 62.6281 70.9437 64.8392 70.9437H71.8272C75.1201 70.9437 77.5138 67.816 76.6536 64.6375L60.1596 3.69378C59.5697 1.51385 57.5916 0 55.3333 0Z"
              fill="white"
            />
            <path
              d="M43.806 0H52.4713C55.8171 0 58.2189 3.22237 57.2629 6.42868L39.0916 67.3724C38.4598 69.4913 36.5112 70.9437 34.3001 70.9437H27.3121C24.0192 70.9437 21.6255 67.816 22.4857 64.6375L38.9796 3.69378C39.5696 1.51385 41.5476 0 43.806 0Z"
              fill="url(#paint0_linear)"
              className="fader"
            />
            <path
              d="M84.6263 0H93.2917C96.6374 0 99.0392 3.22237 98.0832 6.42868L79.9119 67.3724C79.2801 69.4913 77.3315 70.9437 75.1204 70.9437H68.1324C64.8395 70.9437 62.4458 67.816 63.306 64.6375L79.7999 3.69378C80.3899 1.51385 82.3679 0 84.6263 0Z"
              fill="url(#paint1_linear)"
              className="fader"
            />
            <defs>
              <linearGradient
                id="paint0_linear"
                x1="39.9793"
                y1="0"
                x2="39.9793"
                y2="70.9437"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="white" stop-opacity="0" />
                <stop offset="1" stop-color="white" />
              </linearGradient>
              <linearGradient
                id="paint1_linear"
                x1="80.7996"
                y1="0"
                x2="80.7996"
                y2="70.9437"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="white" stop-opacity="0" />
                <stop offset="1" stop-color="white" />
              </linearGradient>
            </defs>
          </svg>
          <strong>Woodlands</strong>
          <ul>
            <li onClick={e => this.setMap("woodlands")}>Woodlands</li>
            <li onClick={e => this.setMap("lsd")}>LSD</li>
            <li onClick={e => this.setMap("geometry")}>Geometry</li>
          </ul>
        </div>
        {!menu && map === "woodlands" && <Woodlands />}
        {!menu && map === "lsd" && <Lsd />}
        {!menu && map === "geometry" && <Geometry />}
      </div>
    );
  }
}

export default App;

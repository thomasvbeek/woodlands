import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "react-three-fiber";

import "../styles.css";
import { PerspectiveCamera } from "three";

class Geometry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      map: []
    };
  }

  componentDidMount() {
    this.generateMap();
  }

  generateMap = () => {
    let mapData = [];
    $i = 0;
    for (let row = 0; row < 12; row++) {
      mapData[row] = [];
      for (let block = 0; block < 12; block++) {
        let high = $i + 0.5;
        let low = $i - 0.5;
        calculatedHeight = Math.random() * (0 + high - low + low);
        $i = calculatedHeight;
        mapData[row].push(calculatedHeight);
      }
    }

    this.setState({ map: mapData });
  };

  Box(props) {
    // This reference will give us direct access to the mesh
    const mesh = useRef();

    // Set up state for the hovered and active state
    const [hovered, setHover] = useState(false);
    const [active, setActive] = useState(false);

    // Rotate mesh every frame, this is outside of React without overhead
    useFrame(() => (hovered ? (mesh.current.scale.y += 0.1) : true));

    return (
      <mesh
        {...props}
        ref={mesh}
        scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
        onClick={e => setActive(!active)}
        onPointerOver={e => setHover(true)}
        onPointerOut={e => setHover(false)}
      >
        <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
        <meshStandardMaterial
          attach="material"
          color={hovered ? 0xff0000 : 0xdddddd}
        />
      </mesh>
    );
  }

  row(row, z) {
    return row.map((y, x) => {
      return <this.Box position={[x - 5.5, y - 4, z - 12]} />;
    });
  }

  generateMiniMap = () => {
    return (
      <div>
        {this.state.map.map((row, z) => {
          return (
            <div className="mini-map-row">
              {row.map((y, x) => {
                calc = y;
                number = y > 0.99 ? 1 : calc;
                return (
                  <div
                    className="mini-map-block"
                    style={{ backgroundColor: "rgba(255,255,255," + number }}
                  >
                    {Math.floor(y * 100)}
                  </div>
                );
              })}
            </div>
          );
        })}
        <div className="mini-map-action" onClick={() => this.generateMap()}>
          Regenerate
        </div>
      </div>
    );
  };

  render() {
    return (
      <div className="container">
        <div className="mini-map">{this.generateMiniMap()}</div>
        <div className="map">
          <Canvas>
            <ambientLight intensity={1} />
            {/* <pointLight intensity={0.25} position={[0, 50, 0]} /> */}
            <pointLight intensity={0.5} position={[0, 10, -128]} />
            <pointLight
              intensity={0.5}
              position={[-12, 5, -6]}
              color="yellow"
            />
            <spotLight intensity={0.2} position={[0, -8, 0]} color="blue" />
            {this.state.map.map((row, z) => this.row(row, z))}
          </Canvas>
        </div>
      </div>
    );
  }
}

export default Geometry;

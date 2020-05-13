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
    let mapData = [];
    $i = 0;
    for (let row = 0; row < 128; row++) {
      mapData[row] = [];
      for (let block = 0; block < 128; block++) {
        let high = $i + 0.5;
        let low = $i - 0.5;
        calculatedHeight = Math.random() * (0 + high - low + low);
        $i = calculatedHeight;
        mapData[row].push(calculatedHeight);
      }
    }

    this.setState({ map: mapData });
  }

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
          color={hovered ? "hotpink" : 0x1a171a}
        />
      </mesh>
    );
  }

  row(row, z) {
    return row.map((y, x) => {
      return <this.Box position={[x - 64, y - 8, z - 128]} />;
    });
  }

  roof(row, z) {
    return row.map((y, x) => {
      return <this.Box position={[x - 64, y + 8, z - 128]} />;
    });
  }

  render() {
    return (
      <Canvas>
        <ambientLight intensity={1} />
        {/* <pointLight intensity={0.25} position={[0, 50, 0]} /> */}
        <pointLight intensity={0.5} position={[0, 10, -128]} />
        <pointLight intensity={0.1} position={[-26, 5, -62]} color={0xff007a} />
        {this.state.map.map((row, z) => this.row(row, z))}
      </Canvas>
    );
  }
}

export default Geometry;

import React from 'react';
import {useRef, Suspense, useState} from 'react';
import './App.scss';
import {Canvas} from '@react-three/fiber';
import {useGLTF} from '@react-three/drei';
import {useSpring, animated} from '@react-spring/three';

const CaseBox = ({position, args, color}) => {
  const meshRef = useRef();
  return (
    <group>
      <mesh
        castShadow
        position={position}
        ref={meshRef}
      >
        <boxBufferGeometry
          attach='geometry'
          args={args}
        />
        <animated.meshStandardMaterial
          attach='material'
          color={color}
        />
      </mesh>
    </group>
  );
}

const KeyCap = () => {
  const keyRef = useRef();
  const gltf = useGLTF('/keyCap.gltf', true);
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);
  const props = useSpring({
    position: active ? [0,4,0]:[0,0,0],
    color: hovered ? "red": "blue"
  });

  return (
    <group>
      <animated.mesh
        position={props.position}
        scale={[50,50,50]}
        ref={keyRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => setActive(!active)}
        castShadow
      >
        <primitive object={gltf.scene} geometry='geometry'/>
        <animated.meshPhysicalMaterial
          attach="material"
          color={props.color}
        />
      </animated.mesh>
    </group>
  );
}

function App() {

  return (
    <>
      <Canvas
        colorManagement
        shadows
        camera={{position: [-5, 10, 10], fov: 60}}
      >
        <ambientLight intensity={0.3}/>
        <pointLight position={[-10,0,-20]} intensity={0.5}/>
        <pointLight position={[0,-10,0]} intensity={1.5}/>
        <directionalLight
          castShadow
          position={[0,10,0]}
          intensity={1.5}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />

        <group>
          <mesh receiveShadow rotation={[-Math.PI/2,0,0]} position={[0,-3,0]}>
            <planeBufferGeometry attach='geometry' args={[100,100]}/>
            <shadowMaterial attach='material' opacity={0.3}/>
          </mesh>
        </group>

        <Suspense fallback={<CaseBox position={[0,1,0]} args={[3, 2, 1]} color='lightblue'/>}>
          <KeyCap/>
          <CaseBox position={[-2,1,-5]} args={[1,1,1]} color='pink'/>
          <CaseBox position={[5,1,-2]} args={[1,1,1]} color='green'/>
        </Suspense>


      </Canvas>
    </>
  );
}

export default App;

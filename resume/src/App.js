import React from 'react';
import {Suspense} from 'react';
import './App.scss';
import {Canvas} from '@react-three/fiber';
import KeyCap from './KeyCap.js';
import Controls from './Controls.js';

function App() {

  return (
    <>
      <Canvas
        colorManagement
        shadows
        camera={{position: [-5, 10, 10], fov: 60}}
      >
        <Controls/>
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
            <meshPhysicalMaterial attach="material" color="#eba4f7" />
          </mesh>
        </group>

        <Suspense fallback={null}>
          <KeyCap/>
        </Suspense>

      </Canvas>
    </>
  );
}

export default App;

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import React, {useRef} from 'react';
import {useThree, extend, useFrame} from '@react-three/fiber';

extend({OrbitControls});

export default function Controls() {
  const orbitRef = useRef()
  const { camera, gl } = useThree()

  useFrame(() => {
    orbitRef.current.update()
  })

  return (
    <orbitControls
      autoRotate
      maxPolarAngle={Math.PI / 2}
      minPolarAngle={Math.PI / 6}
      args={[camera, gl.domElement]}
      ref={orbitRef}
    />
  )
}
'use client';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sky } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Full day/night cycle — updates every frame.
 * One in-game day = 4 real minutes (240 seconds).
 * Cycle: Dawn → Day → Dusk → Night → Dawn
 */
export default function DayNightCycle() {
  const sunRef   = useRef<THREE.DirectionalLight>(null);
  const moonRef  = useRef<THREE.DirectionalLight>(null);
  const ambRef   = useRef<THREE.AmbientLight>(null);
  const hemiRef  = useRef<THREE.HemisphereLight>(null);
  const skyRef   = useRef<any>(null);

  // Normalized time 0-1 (0 = midnight, 0.25 = dawn, 0.5 = noon, 0.75 = dusk)
  const timeRef = useRef(0.3); // start at dawn

  useFrame((_, delta) => {
    const DAY_DURATION = 240; // seconds for full cycle
    timeRef.current = (timeRef.current + delta / DAY_DURATION) % 1;
    const t = timeRef.current;

    // Sun angle: rises at t=0.25, sets at t=0.75
    const sunAngle  = (t - 0.25) * Math.PI * 2;
    const moonAngle = sunAngle + Math.PI;

    const sunX = Math.cos(sunAngle) * 60;
    const sunY = Math.sin(sunAngle) * 60;
    const sunZ = 30;

    if (sunRef.current) {
      sunRef.current.position.set(sunX, sunY, sunZ);
      // Sun intensity: 0 at night, max at noon
      const si = Math.max(0, Math.sin(sunAngle));
      sunRef.current.intensity = si * 2.4;
      sunRef.current.color.setHSL(0.1, 0.3, 0.5 + si * 0.5);
    }

    if (moonRef.current) {
      moonRef.current.position.set(
        Math.cos(moonAngle) * 60, Math.sin(moonAngle) * 60, 30,
      );
      const mi = Math.max(0, Math.sin(moonAngle));
      moonRef.current.intensity = mi * 0.5;
      // Azul claro para mantener visibilidad en la noche
      moonRef.current.color.set('#b3d7ff');
    }

    // Ambient: warm at day, cool at night
    if (ambRef.current) {
      const isDay = sunY > 0;
      const dayK  = Math.max(0, sunY / 60);
      const rawIntensity = 0.15 + dayK * 0.55;
      // Mínimo para que en "noche" no quede a oscuras absolutas
      ambRef.current.intensity = Math.max(0.2, rawIntensity);
      ambRef.current.color.setHSL(isDay ? 0.1 : 0.6, 0.3, isDay ? 0.7 : 0.3);
    }

    // Sky turbidity / rayleigh follow sun height
    if (skyRef.current) {
      const dayK = Math.max(0, sunY / 60);
      skyRef.current.material.uniforms.turbidity.value = 2 + dayK * 8;
      skyRef.current.material.uniforms.rayleigh.value = 0.5 + dayK * 2;
      skyRef.current.material.uniforms.mieCoefficient.value = 0.003 + dayK * 0.012;
      skyRef.current.material.uniforms.sunPosition.value.set(sunX, sunY, sunZ);
    }
  });

  return (
    <>
      {/* Sky sphere */}
      <Sky ref={skyRef} distance={450000} inclination={0.49} azimuth={0.25}/>

      {/* Sun directional light */}
      <directionalLight
        ref={sunRef}
        castShadow
        position={[20, 40, 30]}
        intensity={2.2}
        color="#fff8f0"
        shadow-mapSize={[2048, 2048]}
        shadow-camera-near={0.5}
        shadow-camera-far={120}
        shadow-camera-left={-65}
        shadow-camera-right={65}
        shadow-camera-top={65}
        shadow-camera-bottom={-65}
      />

      {/* Moon directional light */}
      <directionalLight
        ref={moonRef}
        position={[-20, 40, -30]}
        intensity={0.35}
        color="#b0c4de"
      />

      {/* Ambient */}
      <ambientLight ref={ambRef} intensity={0.45} color="#d8c4f0"/>

      {/* Hemisphere */}
      <hemisphereLight ref={hemiRef} args={['#9333ea', '#14532d', 0.5]}/>

      {/* Accent point lights (always on) */}
      <pointLight position={[0, 10, 0]}   color="#a78bfa" intensity={2.5} distance={40}/>
      <pointLight position={[22, 6, -14]} color="#f87171" intensity={1.5} distance={25}/>
      <pointLight position={[-22, 6, -8]} color="#86efac" intensity={1.5} distance={25}/>
    </>
  );
}

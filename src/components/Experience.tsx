'use client';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Suspense, useRef, useState, useEffect } from 'react';
import { Physics } from '@react-three/rapier';
import { Stars, Sky, Cloud, useProgress, Html } from '@react-three/drei';
import * as THREE from 'three';
import { useGameStore } from '@/store/useGameStore';

import Player        from './Player';
import World         from './World';
import NPCCharacters from './NPCCharacters';
import Particles     from './Particles';
import Zones         from './Zones';


/* ── 3D LOADING SCREEN ──────────────────────────────────── */
function Loader3D() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div style={{ width:260, textAlign:'center', fontFamily:'"DM Sans",sans-serif' }}>
        <div style={{ fontSize:52, marginBottom:14, filter:'drop-shadow(0 0 16px rgba(167,139,250,0.9))', animation:'spin 2s linear infinite' }}>🌸</div>
        <p style={{ color:'#c4b5fd', fontSize:'0.9rem', marginBottom:12 }}>Cargando jardín mágico…</p>
        <div style={{ height:4, background:'rgba(139,92,246,0.2)', borderRadius:2, overflow:'hidden' }}>
          <div style={{ height:'100%', width:`${progress}%`, background:'linear-gradient(90deg,#7c3aed,#be185d)', borderRadius:2, transition:'width 0.3s ease' }}/>
        </div>
        <p style={{ color:'rgba(196,181,253,0.4)', fontSize:'0.72rem', marginTop:8 }}>{Math.round(progress)}%</p>
        <style>{`@keyframes spin{0%{transform:scale(1) rotate(0deg)}50%{transform:scale(1.15) rotate(180deg)}100%{transform:scale(1) rotate(360deg)}}`}</style>
      </div>
    </Html>
  );
}

/* ── CAMERA INTRO ANIMATION ─────────────────────────────── */
function CameraIntro({ onDone }: { onDone: () => void }) {
  const { camera } = useThree();
  const t = useRef(0);
  const done = useRef(false);
  const startPos = useRef(new THREE.Vector3(0, 80, 60));
  const endPos   = useRef(new THREE.Vector3(0, 18, 28));
  const startLook= useRef(new THREE.Vector3(0, 60, 0));
  const endLook  = useRef(new THREE.Vector3(0, 2, 0));

  useEffect(() => {
    camera.position.copy(startPos.current);
    camera.lookAt(startLook.current);
  }, [camera]);

  useFrame((_, delta) => {
    if (done.current) return;
    t.current += delta * 0.38;
    const k = Math.min(t.current, 1);
    const ease = k < 0.5 ? 2*k*k : -1+(4-2*k)*k;
    camera.position.lerpVectors(startPos.current, endPos.current, ease);
    const lk = new THREE.Vector3().lerpVectors(startLook.current, endLook.current, ease);
    camera.lookAt(lk);
    if (k >= 1 && !done.current) { done.current = true; onDone(); }
  });

  return null;
}

/* ── MAIN EXPERIENCE ────────────────────────────────────── */
export default function Experience() {
  const { hasStarted, setIntroComplete, introComplete } = useGameStore();
  const isNight = useGameStore(s => s.isNight);
  const [showIntro, setShowIntro] = useState(false);

  useEffect(() => {
    if (hasStarted && !introComplete) setShowIntro(true);
  }, [hasStarted, introComplete]);

  return (
    <Canvas shadows camera={{ position: [0, 5, 8], fov: 50 }}
      gl={{ antialias:true, toneMapping:THREE.ACESFilmicToneMapping, toneMappingExposure:1.1, outputColorSpace:THREE.SRGBColorSpace, powerPreference:'high-performance' }}
      dpr={[1,1.5]}
      style={{ width:'100vw', height:'100vh' }}
      performance={{ min:0.5 }}
    >
      <Suspense fallback={<Loader3D/>}>
        {isNight ? (
          <>
            <color attach="background" args={['#020617']} />
            <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
            <ambientLight intensity={0.2} color="#4b5563" />
            <directionalLight position={[-50, 50, -50]} intensity={0.5} color="#7fa1ff" castShadow />
          </>
        ) : (
          <>
            <color attach="background" args={['#ff9e7a']} />
            <Sky sunPosition={[100, 20, 100]} turbidity={0.1} rayleigh={2} />
            <Cloud position={[10, 30, -20]} opacity={0.5} speed={0.1} />
            <Cloud position={[-20, 25, 30]} opacity={0.4} speed={0.1} />
            <ambientLight intensity={0.8} color="#ffffff" />
            <directionalLight position={[50, 50, 50]} intensity={1.5} color="#ffd2a6" castShadow />
          </>
        )}


        <Physics gravity={[0, -30, 0]} timeStep="vary" debug={false}>
          <World/>
          <Player/>
          <Zones/>
        </Physics>
        <NPCCharacters/>
        <Particles/>
      </Suspense>

      {showIntro && (
        <CameraIntro onDone={() => { setShowIntro(false); setIntroComplete(); }}/>
      )}


    </Canvas>
  );
}

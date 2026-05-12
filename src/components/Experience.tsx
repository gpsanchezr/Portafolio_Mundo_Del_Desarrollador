 'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Physics, RigidBody } from '@react-three/rapier';
import { Suspense, useEffect, useRef, useState } from 'react';
import { Sky, Stars, useProgress } from '@react-three/drei';
import * as THREE from 'three';

import { useGameStore } from '@/store/useGameStore';

import Player from './Player';
import World from './World';
import NPCCharacters from './NPCCharacters';
import Particles from './Particles';
import Zones from './Zones';

function MagicLoader() {
  const { progress } = useProgress();
  const hasStarted = useGameStore((s) => s.hasStarted);
  const [isDone, setIsDone] = useState(false);

  // Cuando llega a 100, esperamos un milisegundo y marcamos como terminado
  useEffect(() => {
    if (progress >= 100) {
      const timer = setTimeout(() => setIsDone(true), 500);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  // 🚀 Si ya terminó la carga O si el juego ya inició, desaparece por completo
  if (isDone || hasStarted) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 40, // Z-index menor que la IntroScreen
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'rgba(10,4,21,1)',
        backdropFilter: 'blur(10px)',
        pointerEvents: 'none', // Esto permite que los clics pasen a través del cargador
      }}
    >
      <div style={{ marginTop: '290px', width: '260px', textAlign: 'center' }}>
        <p
          style={{
            color: '#c4b5fd',
            fontSize: '0.85rem',
            marginBottom: 8,
            fontWeight: 500,
            fontFamily: 'sans-serif',
          }}
        >
          Cargando jardín mágico… {Math.round(progress)}%
        </p>
        <div
          style={{
            height: 4,
            width: '100%',
            background: 'rgba(139,92,246,0.3)',
            borderRadius: 2,
            overflow: 'hidden',
            marginBottom: 14,
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${progress}%`,
              background: 'linear-gradient(90deg,#7c3aed,#be185d)',
              borderRadius: 2,
              transition: 'width 0.3s ease',
            }}
          />
        </div>
        <div style={{ fontSize: 38, animation: 'spin 2s linear infinite' }}>🌸</div>
      </div>
    </div>
  );
}

function CameraIntro({ onDone }: { onDone: () => void }) {
  const { camera } = useThree();

  const t = useRef(0);
  const done = useRef(false);

  const startPos = useRef(new THREE.Vector3(0, 80, 60));
  const endPos = useRef(new THREE.Vector3(0, 18, 28));
  const startLook = useRef(new THREE.Vector3(0, 60, 0));
  const endLook = useRef(new THREE.Vector3(0, 2, 0));

  useFrame((_, delta) => {
    if (done.current) return;
    t.current += delta * 0.38;
    const k = Math.min(t.current, 1);
    const ease = k < 0.5 ? 2 * k * k : -1 + (4 - 2 * k) * k;

    camera.position.lerpVectors(startPos.current, endPos.current, ease);
    camera.lookAt(new THREE.Vector3().lerpVectors(startLook.current, endLook.current, ease));

    if (k >= 1 && !done.current) {
      done.current = true;
      onDone();
    }
  });

  return null;
}

export default function Experience() {
  const { hasStarted, setIntroComplete, introComplete, isNight } = useGameStore();
  const [showIntro, setShowIntro] = useState(false);

  useEffect(() => {
    if (hasStarted && !introComplete) setShowIntro(true);
  }, [hasStarted, introComplete]);

  return (
    <>
      <MagicLoader />

      <Canvas
        shadows
        camera={{ position: [0, 5, 8], fov: 50 }}
        style={{ width: '100vw', height: '100vh' }}
        gl={{ antialias: true, toneMappingExposure: 1.1 }}
      >
        <Suspense fallback={null}>
          {isNight ? (
            <>
              <Stars radius={100} count={3000} />
              <ambientLight intensity={0.2} />
              <directionalLight position={[-50, 50, -50]} intensity={0.5} castShadow />
            </>
          ) : (
            <>
              <Sky sunPosition={[100, 20, 100]} />
              <ambientLight intensity={0.8} />
              <directionalLight position={[50, 50, 50]} intensity={1.5} castShadow />
            </>
          )}

          <Physics gravity={[0, -30, 0]}>
            {/* El suelo carga de primero siempre */}
            <RigidBody type="fixed">
              <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                <planeGeometry args={[500, 500]} />
                <meshStandardMaterial color="#4ade80" />
              </mesh>
            </RigidBody>

            {/* CARGA PRIORITARIA: El jugador */}
            <Suspense fallback={null}>
              <Player />
            </Suspense>

            {/* CARGA DIFERIDA: El mundo y los elementos pesados */}
            <Suspense fallback={null}>
              <World />
            </Suspense>

            <Suspense fallback={null}>
              <Zones />
            </Suspense>

          </Physics>



          <Particles />


          {showIntro && (
            <CameraIntro
              onDone={() => {
                setShowIntro(false);
                setIntroComplete();
              }}
            />
          )}
        </Suspense>
      </Canvas>
    </>
  );
}


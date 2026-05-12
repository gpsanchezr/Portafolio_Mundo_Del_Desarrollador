'use client';
import { useRef, useEffect, useState } from 'react';
import { useGLTF, useAnimations, useTexture, OrbitControls } from '@react-three/drei';

import { useFrame } from '@react-three/fiber';



import { RigidBody, CapsuleCollider } from '@react-three/rapier';
import * as THREE from 'three';
import { useGameStore } from '@/store/useGameStore';


function lvY(rb: any) {
  try {
    return rb?.linvel?.().y ?? 0;
  } catch {
    return 0;
  }
}

/* ── PLAYER AVATAR (GLTF) ───────────────────────────────────── */
function PlayerAvatar({ facing, moving }: { facing: React.MutableRefObject<number>; moving: React.MutableRefObject<boolean>; }) {
  const g = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF('https://oldvgciksrwujujimepg.supabase.co/storage/v1/object/public/assets-rpg/models/characters/Avatar/ChicaVestidoRojo.glb');
  const { actions, names } = useAnimations(animations, scene);
  const texture = useTexture('https://oldvgciksrwujujimepg.supabase.co/storage/v1/object/public/assets-rpg/models/characters/Avatar/texture_0_0.png');

  useEffect(() => {
    texture.flipY = false;
    texture.colorSpace = THREE.SRGBColorSpace;
    scene.traverse((child: any) => {
      if (child.isMesh) {
        child.material.map = texture;
        child.material.needsUpdate = true;
      }
    });
  }, [scene, texture]);

  useFrame(() => {
    if (!g.current) return;
    const targetQuat = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), facing.current);
    g.current.quaternion.slerp(targetQuat, 0.2);

    if (names.length > 0) {
      const walkAction = actions[names[0]];
      if (walkAction) {
        if (moving.current) {
          if (!walkAction.isRunning()) walkAction.reset().fadeIn(0.2).play();
        } else {
          walkAction.fadeOut(0.2);
        }
      }
    }
  });

  return (
    <group ref={g}>
      <primitive object={scene} scale={[1.1, 1.1, 1.1]} position={[0, -0.9, 0]} />
    </group>
  );
}



/* ── KEYBOARD ────────────────────────────────────────────────── */
const KEYS: Record<string, boolean> = {};
function useKeys() {
  useEffect(() => {
    const dn = (e: KeyboardEvent) => {
      KEYS[e.code] = true;
    };
    const up = (e: KeyboardEvent) => {
      KEYS[e.code] = false;
    };
    window.addEventListener('keydown', dn);
    window.addEventListener('keyup', up);
    return () => {
      window.removeEventListener('keydown', dn);
      window.removeEventListener('keyup', up);
    };
  }, []);
}

/* ── PLAYER CONTROLLER ───────────────────────────────────────── */
export default function Player() {
  const rb = useRef<any>(null);
  const controlsRef = useRef<any>(null);
  const setPos = useGameStore((s) => s.setPlayerPosition);
  const isUIOpen = useGameStore((s) => s.isUIOpen);
  const hasStarted = useGameStore((s) => s.hasStarted);
  useKeys();

  const facing = useRef(0);
  const moving = useRef(false);
  const SPEED = 7;
  const [cameraSetup, setCameraSetup] = useState(false);

  useFrame((state, delta) => {
    if (!rb.current || !hasStarted) return;
    const pos = rb.current.translation();
    setPos([pos.x, pos.y, pos.z]);

    // 1. Configuración inicial de la cámara
    if (!cameraSetup && controlsRef.current) {
      state.camera.position.set(pos.x, pos.y + 4, pos.z + 8);
      controlsRef.current.target.set(pos.x, pos.y + 1, pos.z);
      controlsRef.current.update();
      setCameraSetup(true);
    }

    if (isUIOpen) {
      moving.current = false;
      rb.current.setLinvel({ x: 0, y: rb.current.linvel().y, z: 0 }, true);
      return;
    }

    // 2. Movimiento (corregido: controles invertidos)
    const vel = rb.current.linvel();
    const movement = { x: 0, z: 0 };

    if (KEYS.ArrowUp || KEYS.KeyW) movement.z -= 1;
    if (KEYS.ArrowDown || KEYS.KeyS) movement.z += 1;
    if (KEYS.ArrowLeft || KEYS.KeyA) movement.x -= 1;
    if (KEYS.ArrowRight || KEYS.KeyD) movement.x += 1;

    if (movement.x !== 0 || movement.z !== 0) {
      // rotación hacia la dirección de movimiento
      const lerpRotation = Math.atan2(movement.x, movement.z);
      facing.current = lerpRotation;
      moving.current = true;

      rb.current.setLinvel(
        { x: movement.x * SPEED, y: vel.y, z: movement.z * SPEED },
        true,
      );
    } else {
      moving.current = false;
      // FRENADO EN SECO: evita patinaje/temblor
      rb.current.setLinvel({ x: 0, y: vel.y, z: 0 }, true);
    }


    // 3. Seguimiento de cámara suave preservando el ángulo orbital del usuario
    if (controlsRef.current) {
      const playerTarget = new THREE.Vector3(pos.x, pos.y + 1, pos.z);
      const diff = new THREE.Vector3().subVectors(playerTarget, controlsRef.current.target);
      state.camera.position.add(diff);
      controlsRef.current.target.copy(playerTarget);
      controlsRef.current.update();
    }
  });

  return (
    <>
      <OrbitControls ref={controlsRef} makeDefault enablePan={false} minDistance={3} maxDistance={15} maxPolarAngle={Math.PI / 2 - 0.1} />




      <RigidBody
        ref={rb}
        position={[0, 1.2, 0]}
        type="dynamic"
        enabledRotations={[false, false, false]}
        colliders={false}
        linearDamping={1.0}
      >
        <CapsuleCollider args={[0.5, 0.5]} />
        <PlayerAvatar facing={facing} moving={moving} />
      </RigidBody>
    </>
  );
}




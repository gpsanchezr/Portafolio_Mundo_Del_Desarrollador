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

    const { forward, backward, left, right } = {
      forward: KEYS.ArrowUp || KEYS.KeyW,
      backward: KEYS.ArrowDown || KEYS.KeyS,
      left: KEYS.ArrowLeft || KEYS.KeyA,
      right: KEYS.ArrowRight || KEYS.KeyD,
    };

    // 2. Movimiento relativo a la cámara
    const camDir = new THREE.Vector3();
    state.camera.getWorldDirection(camDir);
    camDir.y = 0;
    camDir.normalize();

    const camLeft = new THREE.Vector3().crossVectors(new THREE.Vector3(0, 1, 0), camDir).normalize();

    const moveDir = new THREE.Vector3(0, 0, 0);
    if (forward) moveDir.add(camDir);
    if (backward) moveDir.sub(camDir);
    if (left) moveDir.add(camLeft);
    if (right) moveDir.sub(camLeft);

    const vel = rb.current.linvel();

    if (moveDir.lengthSq() > 0) {
      moveDir.normalize();
      moving.current = true;
      facing.current = Math.atan2(moveDir.x, moveDir.z);
      rb.current.setLinvel({ x: moveDir.x * SPEED, y: vel.y, z: moveDir.z * SPEED }, true);
    } else {
      moving.current = false;
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
        linearDamping={2.5}
      >
        <CapsuleCollider args={[0.5, 0.5]} />
        <PlayerAvatar facing={facing} moving={moving} />
      </RigidBody>
    </>
  );
}




'use client';
import { useRef, useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';

import { useFrame, useThree } from '@react-three/fiber';
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

/* ── PLAYER AVATAR (GLTF) ───────────────────────────────────── */
function PlayerAvatar({
  facing,
  moving,
}: {
  facing: React.MutableRefObject<number>;
  moving: React.MutableRefObject<boolean>;
}) {
  const g = useRef<THREE.Group>(null);

  const { scene, animations } = useGLTF(
    'https://oldvgciksrwujujimepg.supabase.co/storage/v1/object/public/assets-rpg/models/characters/Avatar/ChicaVestidoRojo.glb'
  );
  const { actions, names } = useAnimations(animations, scene);

  useEffect(() => {
    // Ejecutar la animación si existe 'Walk', 'Walking' o la primera que encuentre
    const actionName = names.find((n) => n.toLowerCase().includes('walk')) || names[0];
    if (actionName && actions[actionName]) {
      const action = actions[actionName];
      // Lógica básica: si se mueve, reproduce la animación
      if (moving.current) {
        action.play();
      } else {
        action.stop(); // Opcional: cambiar a animación Idle si existe
      }
    }
  }, [actions, names]);



  useFrame((_, delta) => {
    if (!g.current) return;

    g.current.rotation.y = facing.current;

    // Gentle breathing
    const t = performance.now() * 0.001;
    g.current.position.y = Math.sin(t * 1.2) * 0.02;

    // (moving kept for future animations; currently no extra behavior)
    void moving;
    void delta;
  });

  return (
    <group ref={g}>
      <primitive object={scene} scale={[1.2, 1.2, 1.2]} position={[0, -0.9, 0]} />

    </group>
  );
}

/* ── PLAYER CONTROLLER ───────────────────────────────────────── */
export default function Player() {
  const rb = useRef<any>(null);
  const { camera } = useThree();
  const setPos = useGameStore((s) => s.setPlayerPosition);
  const isUIOpen = useGameStore((s) => s.isUIOpen);
  const hasStarted = useGameStore((s) => s.hasStarted);

  useKeys();

  const camTarget = useRef(new THREE.Vector3(0, 4, 6));
  const lookAt = useRef(new THREE.Vector3(0, 1, 0));
  const facing = useRef(0);
  const moving = useRef(false);

  const SPEED = 9;
  const CAM_H = 4;
  const CAM_D = 6;

  useFrame((_, dt) => {
    if (!rb.current || !hasStarted) return;

    const pos = rb.current.translation();
    setPos([pos.x, pos.y, pos.z]);

    if (isUIOpen) {
      moving.current = false;
      rb.current.setLinvel({ x: 0, y: lvY(rb.current), z: 0 }, true);
      return;
    }

    let mx = 0;
    let mz = 0;
    if (KEYS.ArrowUp || KEYS.KeyW) mz -= 1;
    if (KEYS.ArrowDown || KEYS.KeyS) mz += 1;
    if (KEYS.ArrowLeft || KEYS.KeyA) mx -= 1;
    if (KEYS.ArrowRight || KEYS.KeyD) mx += 1;

    const dir = new THREE.Vector3(mx, 0, mz);
    if (dir.lengthSq() > 0) {
      dir.normalize();
      moving.current = true;
      facing.current = Math.atan2(dir.x, dir.z);
    } else {
      moving.current = false;
    }

    const velocity = rb.current.linvel();
    rb.current.setLinvel(
      {
        x: dir.x * SPEED,
        y: velocity.y,
        z: dir.z * SPEED
      },
      true
    );

    // Camera follow
    const a = facing.current + Math.PI;
    camTarget.current.set(
      pos.x + Math.sin(a) * CAM_D,
      pos.y + CAM_H,
      pos.z + Math.cos(a) * CAM_D
    );
    lookAt.current.set(pos.x, pos.y + 1, pos.z);
    camera.position.lerp(camTarget.current, dt * 3.5);
    camera.lookAt(lookAt.current);
  });

  return (
    <RigidBody
      ref={rb}
      position={[0, 1.2, 0]}
      type="dynamic"
      enabledRotations={[false, true, false]}
      colliders={false}
      linearDamping={2.5}
      angularDamping={2.5}
    >
      <CapsuleCollider args={[0.5, 0.5]} />
      <PlayerAvatar facing={facing} moving={moving} />
    </RigidBody>
  );
}


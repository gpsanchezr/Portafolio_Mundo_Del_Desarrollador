'use client';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { useGameStore, ZONES } from '@/store/useGameStore';
import * as THREE from 'three';

export default function Zones() {
  const { setZone, setNearbyHint, isUIOpen, playerPosition } = useGameStore();
  const lastZone = useRef<string | null>(null);
  const pv = useRef(new THREE.Vector3());

  useFrame(() => {
    if (isUIOpen) return;
    pv.current.set(...playerPosition);

    let entered: typeof ZONES[0] | null = null;
    let nearestDist = Infinity;
    let hintZone: typeof ZONES[0] | null = null;
    let hintDist = Infinity;

    for (const z of ZONES) {
      const zv = new THREE.Vector3(...z.position);
      const d = pv.current.distanceTo(zv);
      if (d < z.radius && d < nearestDist) { nearestDist = d; entered = z; }
      if (d < z.radius * 2.8 && d < hintDist) { hintDist = d; hintZone = z; }
    }

    if (entered) {
      if (lastZone.current !== entered.id) {
        lastZone.current = entered.id as string;
        setZone(entered.id as any);
        setNearbyHint(null);
      }
    } else {
      if (lastZone.current !== null) lastZone.current = null;
      if (hintZone) {
        setNearbyHint(`${hintZone.emoji} Acércate a "${hintZone.label.replace(/^[^\s]+\s/,'')}" — ¡Entra!`);
      } else {
        setNearbyHint(null);
      }
    }
  });

  return null;
}

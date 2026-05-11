'use client';
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Particles({ count = 350 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const COLORS = ['#c084fc','#f472b6','#818cf8','#fde68a','#a5f3fc','#86efac'];

  const { geo, origPos, speeds, phases } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors    = new Float32Array(count * 3);
    const speeds    = new Float32Array(count);
    const phases    = new Float32Array(count);
    const origPos   = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = 4 + Math.random() * 50;
      const x = Math.cos(a) * r, z = Math.sin(a) * r;
      const y = 0.3 + Math.random() * 5;
      positions[i*3]=origPos[i*3]=x;
      positions[i*3+1]=origPos[i*3+1]=y;
      positions[i*3+2]=origPos[i*3+2]=z;
      speeds[i] = 0.2 + Math.random() * 0.5;
      phases[i] = Math.random() * Math.PI * 2;
      const c = new THREE.Color(COLORS[Math.floor(Math.random()*COLORS.length)]);
      colors[i*3]=c.r; colors[i*3+1]=c.g; colors[i*3+2]=c.b;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color',    new THREE.BufferAttribute(colors, 3));
    return { geo, origPos, speeds, phases };
  }, [count]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    const pa = ref.current.geometry.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < count; i++) {
      pa.array[i*3]   = origPos[i*3]   + Math.sin(t*0.14+phases[i])*0.6;
      pa.array[i*3+1] = origPos[i*3+1] + Math.sin(t*speeds[i]+phases[i])*0.9;
      pa.array[i*3+2] = origPos[i*3+2] + Math.cos(t*0.14+phases[i])*0.6;
    }
    pa.needsUpdate = true;
  });

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial size={0.075} vertexColors transparent opacity={0.72}
        sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending}/>
    </points>
  );
}

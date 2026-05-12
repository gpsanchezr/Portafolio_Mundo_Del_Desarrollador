'use client';

import { Float, Text, useGLTF } from '@react-three/drei';
import { useMemo } from 'react';

import { RigidBody } from '@react-three/rapier';
import * as THREE from 'three';

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

type ZoneData = {
  pos: [number, number, number];
  title: string;
  description: string;
};

function ProjectZone({ pos, title, description }: ZoneData) {
  return (
    <group position={pos}>
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[0, 1.0, 0]} castShadow receiveShadow>
          <boxGeometry args={[4.2, 2.0, 2.0]} />
          <meshStandardMaterial color="#1f2937" roughness={0.55} metalness={0.25} />
        </mesh>
      </RigidBody>

      <Float speed={1.1} floatIntensity={0.25} rotationIntensity={0.1}>
        <group position={[0, 2.25, 0]}>
          <mesh>
            <boxGeometry args={[4.6, 0.12, 0.1]} />
            <meshStandardMaterial color="#fde68a" emissive="#f59e0b" emissiveIntensity={0.25} />
          </mesh>

          <Text
            position={[0, 0.35, 0]}
            fontSize={0.22}
            color="white"
            anchorX="center"
            anchorY="middle"
            outlineColor="#111827"
            outlineWidth={0.02}
          >
            {title}
          </Text>

          <Text
            position={[0, -0.05, 0]}
            fontSize={0.16}
            color="#c7d2fe"
            anchorX="center"
            anchorY="middle"
          >
            {description}
          </Text>
        </group>
      </Float>
    </group>
  );
}

function NatureForest() {
  const treeUrl =
    'https://oldvgciksrwujujimepg.supabase.co/storage/v1/object/public/assets-rpg/models/props/Nature/BirchTree_1.gltf';
  const bushUrl =
    'https://oldvgciksrwujujimepg.supabase.co/storage/v1/object/public/assets-rpg/models/props/Nature/Bush.gltf';
  const flowerUrl =
    'https://oldvgciksrwujujimepg.supabase.co/storage/v1/object/public/assets-rpg/models/props/Nature/Flower_1.gltf';

  const { scene: treeScene } = useGLTF(treeUrl);
  const { scene: bushScene } = useGLTF(bushUrl);
  const { scene: flowerScene } = useGLTF(flowerUrl);

  // Nota: clones se crean durante el render para mantener scene.clone() como pediste.


  const centerAvoidRadius = 10; // evita bloquear el centro [0,0,0]
  const mapMin = -60;
  const mapMax = 60;

  const treeClones = useMemo(() => {
    const clones: { key: string; pos: THREE.Vector3; rotY: number; scale: number }[] = [];

    const count = 70;

    for (let i = 0; i < count; i++) {
      // distribuimos alrededor del perímetro con ruido
      const angle = Math.random() * Math.PI * 2;
      const radius = 28 + Math.random() * 22; // cerca de los bordes del mapa
      const x = Math.cos(angle) * radius + (Math.random() - 0.5) * 6;
      const z = Math.sin(angle) * radius + (Math.random() - 0.5) * 6;

      const dist = Math.hypot(x, z);
      if (dist < centerAvoidRadius) {
        i--;
        continue;
      }

      clones.push({
        key: `t_${i}`,
        pos: new THREE.Vector3(x, 0, z),
        rotY: Math.random() * Math.PI * 2,
        scale: 0.85 + Math.random() * 0.35,
      });
    }

    return clones;
  }, [treeScene]);

  const bushClones = useMemo(() => {
    const clones: { key: string; pos: THREE.Vector3; rotY: number; scale: number }[] = [];

    const count = 120;

    for (let i = 0; i < count; i++) {
      const x = mapMin + Math.random() * (mapMax - mapMin);
      const z = mapMin + Math.random() * (mapMax - mapMin);

      const dist = Math.hypot(x, z);
      if (dist < centerAvoidRadius + 6) continue;

      // acotamos para que no se metan en el pedestal/text
      if (Math.abs(x - 0) < 6 && z < -7 && z > -25) continue;

      clones.push({
        key: `b_${i}`,
        pos: new THREE.Vector3(clamp(x, mapMin, mapMax), 0, clamp(z, mapMin, mapMax)),
        rotY: Math.random() * Math.PI * 2,
        scale: 0.9 + Math.random() * 0.6,
      });
    }

    return clones;
  }, [bushScene]);

  const flowerClones = useMemo(() => {
    const clones: { key: string; pos: THREE.Vector3; rotY: number; scale: number }[] = [];

    const count = 60;

    for (let i = 0; i < count; i++) {
      const x = mapMin + Math.random() * (mapMax - mapMin);
      const z = mapMin + Math.random() * (mapMax - mapMin);
      const dist = Math.hypot(x, z);
      if (dist < centerAvoidRadius + 10) continue;

      clones.push({
        key: `f_${i}`,
        pos: new THREE.Vector3(clamp(x, mapMin, mapMax), 0, clamp(z, mapMin, mapMax)),
        rotY: Math.random() * Math.PI * 2,
        scale: 0.6 + Math.random() * 0.35,
      });
    }

    return clones;
  }, [flowerScene]);

  return (
    <RigidBody type="fixed" colliders="trimesh">

      {/* Árboles */}
      {treeClones.map((c: { key: string; pos: THREE.Vector3; rotY: number; scale: number }) => (
        <primitive

          key={c.key}
          object={treeScene.clone(true)}
          position={[c.pos.x, 0, c.pos.z]}
          rotation={[0, c.rotY, 0]}
          scale={c.scale}
          castShadow
          receiveShadow
        />
      ))}

      {/* Arbustos */}
      {bushClones.map((c: { key: string; pos: THREE.Vector3; rotY: number; scale: number }) => (
        <primitive

          key={c.key}
          object={bushScene.clone(true)}
          position={[c.pos.x, 0, c.pos.z]}
          rotation={[0, c.rotY, 0]}
          scale={c.scale}
          castShadow
          receiveShadow
        />
      ))}

      {/* Flores (detalle del jardín) */}
      {flowerClones.map((c: { key: string; pos: THREE.Vector3; rotY: number; scale: number }) => (
        <primitive

          key={c.key}
          object={flowerScene.clone(true)}
          position={[c.pos.x, 0, c.pos.z]}
          rotation={[0, c.rotY, 0]}
          scale={c.scale}
          castShadow
          receiveShadow
        />
      ))}
    </RigidBody>
  );
}

export default function World() {
  const zones: ZoneData[] = [
    {
      pos: [10, 2, 10],
      title: 'Happy-Farm: E-commerce Artesanal',
      description: 'Vercel / GitHub',
    },
    {
      pos: [-10, 2, 10],
      title: 'ParkNidus',
      description: 'Gestión de parqueo en red.',
    },
    {
      pos: [10, 2, -10],
      title: 'Terrasoft - Inmobiliaria MonteVerde',
      description: '',
    },
    {
      pos: [-10, 2, -10],
      title: 'Cine-Verse: Gestión de Cine',
      description: '',
    },
    {
      pos: [0, 2, -15],
      title: 'Zona IA & GlowCode Boutique',
      description: '',
    },
  ];

  return (
    <>
      {/* Escenario base: suelo */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[220, 220]} />
          <meshStandardMaterial color="#1a3a1a" roughness={0.95} />
        </mesh>
      </RigidBody>

      <NatureForest />

      {zones.map((z) => (
        <ProjectZone key={z.pos.join('_')} {...z} />
      ))}
    </>
  );
}


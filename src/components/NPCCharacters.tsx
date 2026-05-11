'use client';
import { useRef, useState, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float, Html, useGLTF, useFBX, useAnimations } from '@react-three/drei';
import * as THREE from 'three';
import { useGameStore } from '@/store/useGameStore';
import { MODELS } from '@/lib/supabase';

function useNearby(pos:[number,number,number], radius=5) {
  const [near,setNear]=useState(false);
  const pp=useGameStore(s=>s.playerPosition);
  const tick=useRef(0);
  useFrame((_,dt)=>{ tick.current+=dt; if(tick.current>0.25){ tick.current=0; const dx=pp[0]-pos[0],dz=pp[2]-pos[2]; setNear(Math.sqrt(dx*dx+dz*dz)<radius); } });
  return near;
}

function Bubble({text,color}:{text:string;color:string}){
  return(
    <Html center distanceFactor={6} style={{pointerEvents:'none'}}>
      <div style={{background:'rgba(10,4,21,0.92)',backdropFilter:'blur(10px)',border:`1px solid ${color}`,borderRadius:14,padding:'8px 14px',maxWidth:190,textAlign:'center',boxShadow:`0 0 16px ${color}55`}}>
        <p style={{color:'#fff',fontSize:11,lineHeight:1.55,margin:0,fontFamily:'"DM Sans",sans-serif'}}>{text}</p>
        <div style={{width:10,height:10,background:'rgba(10,4,21,0.92)',border:`1px solid ${color}`,borderRight:'none',borderTop:'none',transform:'rotate(-45deg)',margin:'-5px auto 0'}}/>
      </div>
    </Html>
  );
}

// ── Procedural Robot Fallback ─────────────────────────────────
function RobotFallback({position}:{position:[number,number,number]}){
  const g=useRef<THREE.Group>(null);
  const near=useNearby(position,5);
  useFrame(({clock})=>{ const t=clock.getElapsedTime(); if(g.current){g.current.rotation.y=Math.sin(t*0.3)*0.5; g.current.position.y=position[1]+Math.sin(t*1.0)*0.06+0.05;} });
  return(
    <group ref={g} position={position}>
      <mesh position={[0,0.9,0]} castShadow><boxGeometry args={[0.6,0.7,0.5]}/><meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.2}/></mesh>
      <mesh position={[0,1.45,0]} castShadow><boxGeometry args={[0.5,0.42,0.42]}/><meshStandardMaterial color="#1e293b" metalness={0.85} roughness={0.15}/></mesh>
      {([-0.13,0.13] as number[]).map((x,i)=>(<mesh key={i} position={[x,1.48,0.22]}><sphereGeometry args={[0.07,8,8]}/><meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={1.5}/></mesh>))}
      <mesh position={[0,1.75,0]}><cylinderGeometry args={[0.025,0.025,0.3,6]}/><meshStandardMaterial color="#374151" metalness={0.9} roughness={0.1}/></mesh>
      <mesh position={[0,1.92,0]}><sphereGeometry args={[0.06,8,8]}/><meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={1.2}/></mesh>
      {([-0.42,0.42] as number[]).map((x,i)=>(<mesh key={i} position={[x,0.9,0]} castShadow><boxGeometry args={[0.15,0.55,0.14]}/><meshStandardMaterial color="#374151" metalness={0.7} roughness={0.25}/></mesh>))}
      {([-0.18,0.18] as number[]).map((x,i)=>(<mesh key={i} position={[x,0.3,0]} castShadow><boxGeometry args={[0.18,0.5,0.18]}/><meshStandardMaterial color="#1f2937" metalness={0.75} roughness={0.2}/></mesh>))}
      <pointLight color="#22c55e" intensity={1.2} distance={5} position={[0,1.0,0]}/>
      {near&&<group position={[0,2.4,0]}><Bubble color="#22c55e" text="¡Hola! Soy R0-B0T 🤖 Tu guía del Mundo del Desarrollador. ¡Explora todas las zonas!"/></group>}
      <Float speed={1.5} floatIntensity={0.2}><Text position={[0,2.6,0]} fontSize={0.18} color="#22c55e" anchorX="center">🤖 R0-B0T Guía</Text></Float>
    </group>
  );
}

// ── Python Snake ──────────────────────────────────────────────
function PythonSnake({position}:{position:[number,number,number]}){
  const g=useRef<THREE.Group>(null); const near=useNearby(position,4);
  useFrame(({clock})=>{ if(g.current)g.current.rotation.y=Math.sin(clock.getElapsedTime()*0.5)*0.4; });
  const segs:[number,number,number,number,number,number][]=[
    [0,0.14,0,0.32,0.28,0.32],[0.24,0.24,0.14,0.28,0.26,0.28],
    [0.38,0.38,0,0.24,0.24,0.24],[0.28,0.52,-0.18,0.22,0.22,0.22],
    [0.08,0.62,-0.28,0.2,0.2,0.2],[-0.12,0.7,-0.18,0.18,0.18,0.18],
  ];
  return(
    <group ref={g} position={position}>
      {segs.map(([x,y,z,sx,sy,sz],i)=>(<mesh key={i} position={[x,y,z]} scale={[sx,sy,sz]}><sphereGeometry args={[1,10,8]}/><meshStandardMaterial color={i%2===0?'#16a34a':'#15803d'} roughness={0.5}/></mesh>))}
      <mesh position={[-0.22,0.76,-0.04]} scale={[0.32,0.26,0.38]}><sphereGeometry args={[1,12,10]}/><meshStandardMaterial color="#16a34a" roughness={0.4}/></mesh>
      {([-1,1] as number[]).map((s,i)=>(<mesh key={i} position={[-0.28,0.84,s*0.12]}><sphereGeometry args={[0.055,8,8]}/><meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={0.7}/></mesh>))}
      {near&&<group position={[0,1.8,0]}><Bubble color="#22c55e" text="¡Hola! 🐍 Soy Python. Automatización, data science y APIs rápidas con FastAPI. ¡El lenguaje favorito de Giseella!"/></group>}
      <Float speed={2} floatIntensity={0.3}><Text position={[0,1.7,0]} fontSize={0.2} color="#22c55e" anchorX="center">🐍 Python</Text></Float>
    </group>
  );
}

// ── PostgreSQL Elephant ───────────────────────────────────────
function PostgreSQLElephant({position}:{position:[number,number,number]}){
  const g=useRef<THREE.Group>(null); const near=useNearby(position,4);
  useFrame(({clock})=>{ if(g.current){g.current.rotation.y=Math.sin(clock.getElapsedTime()*0.4+1)*0.3; g.current.position.y=position[1]+Math.sin(clock.getElapsedTime()*0.8+0.5)*0.05;} });
  return(
    <group ref={g} position={position}>
      <mesh position={[0,0.7,0]} scale={[1,0.85,0.9]}><sphereGeometry args={[0.55,12,10]}/><meshStandardMaterial color="#336791" roughness={0.6}/></mesh>
      <mesh position={[0,1.35,0.3]} scale={[0.85,0.85,0.85]}><sphereGeometry args={[0.4,12,10]}/><meshStandardMaterial color="#336791" roughness={0.6}/></mesh>
      <mesh position={[0,1.1,0.75]} rotation={[0.4,0,0]}><cylinderGeometry args={[0.1,0.07,0.55,8]}/><meshStandardMaterial color="#2d5980" roughness={0.7}/></mesh>
      {([-1,1] as number[]).map((s,i)=>(<mesh key={i} position={[s*0.45,1.35,0.15]} scale={[0.5,0.65,0.2]}><sphereGeometry args={[0.5,8,8]}/><meshStandardMaterial color="#2a5080" roughness={0.7}/></mesh>))}
      {([[-0.25,-0.25],[-0.25,0.25],[0.25,-0.25],[0.25,0.25]] as [number,number][]).map(([x,z],i)=>(<mesh key={i} position={[x,0.18,z]}><cylinderGeometry args={[0.12,0.1,0.4,6]}/><meshStandardMaterial color="#336791" roughness={0.7}/></mesh>))}
      {([-0.18,0.18] as number[]).map((x,i)=>(<group key={i} position={[x,1.45,0.65]}><mesh><sphereGeometry args={[0.07,8,8]}/><meshStandardMaterial color="white"/></mesh><mesh position={[0,0,0.02]}><sphereGeometry args={[0.035,6,6]}/><meshStandardMaterial color="#1a1a2e"/></mesh></group>))}
      {near&&<group position={[0,2.3,0]}><Bubble color="#3b82f6" text="¡Hola! 🐘 Soy PostgreSQL. Guardo y organizo todos los datos de las apps de Giseella de forma segura y eficiente."/></group>}
      <Float speed={1.5} floatIntensity={0.25}><Text position={[0,2.25,0]} fontSize={0.19} color="#93c5fd" anchorX="center">🐘 PostgreSQL</Text></Float>
    </group>
  );
}

// ── Docker Whale ──────────────────────────────────────────────
function DockerWhale({position}:{position:[number,number,number]}){
  const g=useRef<THREE.Group>(null); const near=useNearby(position,4);
  useFrame(({clock})=>{ const t=clock.getElapsedTime(); if(g.current){g.current.position.y=position[1]+Math.sin(t*0.9)*0.14+0.55; g.current.rotation.y=Math.sin(t*0.3)*0.5;} });
  return(
    <group ref={g} position={position}>
      <mesh scale={[1.1,0.65,0.8]}><sphereGeometry args={[0.5,10,8]}/><meshStandardMaterial color="#2496ed" roughness={0.5}/></mesh>
      <mesh position={[0.5,-0.1,0]} rotation={[0,0,0.4]}><coneGeometry args={[0.2,0.4,3]}/><meshStandardMaterial color="#1a7fd4" roughness={0.5}/></mesh>
      {([-0.15,0,0.15] as number[]).map((z,i)=>(<mesh key={i} position={[-0.05,0.42,z]} scale={0.6}><boxGeometry args={[0.25,0.2,0.18]}/><meshStandardMaterial color={['#e74c3c','#2ecc71','#f39c12'][i]} roughness={0.4}/></mesh>))}
      {near&&<group position={[0,1.1,0]}><Bubble color="#2496ed" text="¡Hola! 🐳 Soy Docker. Empaqueto las apps de Giseella en contenedores para que funcionen en cualquier servidor."/></group>}
      <Float speed={2} floatIntensity={0.2}><Text position={[0,0.9,0]} fontSize={0.16} color="#bfdbfe" anchorX="center">🐳 Docker</Text></Float>
    </group>
  );
}

// ── React Atom ────────────────────────────────────────────────
function ReactAtom({position}:{position:[number,number,number]}){
  const r1=useRef<THREE.Mesh>(null),r2=useRef<THREE.Mesh>(null),r3=useRef<THREE.Mesh>(null);
  const near=useNearby(position,4);
  useFrame(({clock})=>{ const t=clock.getElapsedTime(); if(r1.current)r1.current.rotation.z=t; if(r2.current){r2.current.rotation.z=t*0.7;r2.current.rotation.x=t*0.5;} if(r3.current){r3.current.rotation.y=t*1.2;r3.current.rotation.z=t*0.3;} });
  return(
    <group position={position}>
      <group position={[0,0.85,0]}>
        <mesh><sphereGeometry args={[0.14,10,10]}/><meshStandardMaterial color="#61dafb" emissive="#61dafb" emissiveIntensity={1.2}/></mesh>
        {[r1,r2,r3].map((ref,i)=>(<mesh key={i} ref={ref}><torusGeometry args={[0.48,0.025,6,24]}/><meshStandardMaterial color="#61dafb" emissive="#61dafb" emissiveIntensity={0.7} transparent opacity={0.85}/></mesh>))}
      </group>
      {near&&<group position={[0,1.7,0]}><Bubble color="#61dafb" text="¡Hola! ⚛️ Soy React. Con mí Giseella construye interfaces dinámicas — ¡incluyendo este mundo 3D!"/></group>}
      <Float speed={2} floatIntensity={0.2}><Text position={[0,1.65,0]} fontSize={0.16} color="#61dafb" anchorX="center">⚛️ React</Text></Float>
    </group>
  );
}

// ── Git Octopus ───────────────────────────────────────────────
function GitOctopus({position}:{position:[number,number,number]}){
  const g=useRef<THREE.Group>(null); const near=useNearby(position,4);
  useFrame(({clock})=>{ const t=clock.getElapsedTime(); if(g.current){g.current.rotation.y=t*0.3; g.current.position.y=position[1]+Math.sin(t)*0.08+0.5;} });
  return(
    <group ref={g} position={position}>
      <mesh><sphereGeometry args={[0.38,10,8]}/><meshStandardMaterial color="#6b46c1" roughness={0.5} emissive="#4c1d95" emissiveIntensity={0.2}/></mesh>
      {[0,45,90,135,180,225,270,315].map((deg,i)=>{ const rad=deg*Math.PI/180; return(<mesh key={i} position={[Math.cos(rad)*0.42,-0.27,Math.sin(rad)*0.42]} rotation={[0.3,0,rad]}><cylinderGeometry args={[0.04,0.02,0.48,5]}/><meshStandardMaterial color="#7c3aed" roughness={0.6}/></mesh>); })}
      {([-0.13,0.13] as number[]).map((x,i)=>(<mesh key={i} position={[x,0.1,0.32]}><sphereGeometry args={[0.08,6,6]}/><meshStandardMaterial color="white"/></mesh>))}
      {near&&<group position={[0,0.95,0]}><Bubble color="#a78bfa" text="¡Hola! 🐙 Soy Git. Controlo todo el historial de código de Giseella para que nunca pierda trabajo importante."/></group>}
      <Float speed={2.5} floatIntensity={0.2}><Text position={[0,0.85,0]} fontSize={0.16} color="#d8b4fe" anchorX="center">🐙 Git</Text></Float>
    </group>
  );
}

// ── JS Lightning ──────────────────────────────────────────────
function JSBolt({position}:{position:[number,number,number]}){
  const g=useRef<THREE.Group>(null); const near=useNearby(position,4);
  useFrame(({clock})=>{ if(g.current){g.current.rotation.y=clock.getElapsedTime()*0.6; const s=1+Math.sin(clock.getElapsedTime()*4)*0.07; g.current.scale.setScalar(s);} });
  return(
    <group ref={g} position={position}>
      <group position={[0,0.9,0]}>
        <mesh rotation={[0,0,0.3]}><coneGeometry args={[0.22,0.6,5]}/><meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={0.8}/></mesh>
        <mesh position={[0.05,-0.45,0]} rotation={[0,0,-0.2]}><coneGeometry args={[0.18,0.55,5]}/><meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={0.7}/></mesh>
        <mesh position={[0,0.65,0]}><boxGeometry args={[0.5,0.5,0.1]}/><meshStandardMaterial color="#f7df1e" roughness={0.3}/></mesh>
        <Text position={[0,0.65,0.06]} fontSize={0.2} color="#1a1a1a" anchorX="center" anchorY="middle">JS</Text>
      </group>
      {near&&<group position={[0,1.8,0]}><Bubble color="#fbbf24" text="¡Hola! ⚡ Soy JavaScript. Hago todo interactivo en el navegador — ¡este mundo 3D está hecho con mí!"/></group>}
      <Float speed={3} floatIntensity={0.3}><Text position={[0,1.6,0]} fontSize={0.16} color="#fde68a" anchorX="center">⚡ JavaScript</Text></Float>
    </group>
  );
}

// ── MySQL Dolphin ─────────────────────────────────────────────
function MySQLDolphin({position}:{position:[number,number,number]}){
  const g=useRef<THREE.Group>(null); const near=useNearby(position,4);
  useFrame(({clock})=>{ const t=clock.getElapsedTime(); if(g.current){g.current.position.y=position[1]+Math.sin(t*1.2)*0.18+0.65; g.current.rotation.z=Math.sin(t*1.2)*0.2; g.current.rotation.y=Math.sin(t*0.4)*0.5;} });
  return(
    <group ref={g} position={position}>
      <mesh scale={[1.2,0.7,0.8]}><sphereGeometry args={[0.45,10,8]}/><meshStandardMaterial color="#00758f" roughness={0.5}/></mesh>
      <mesh position={[0.52,0.12,0]} rotation={[0.2,0,0.8]}><coneGeometry args={[0.22,0.45,4]}/><meshStandardMaterial color="#005f76"/></mesh>
      {([-0.1,0.1] as number[]).map((x,i)=>(<mesh key={i} position={[x-0.25,0.12,0.35]}><sphereGeometry args={[0.07,8,8]}/><meshStandardMaterial color="white"/></mesh>))}
      {near&&<group position={[0,1.0,0]}><Bubble color="#22d3ee" text="¡Hola! 🐬 Soy MySQL. Motor de base de datos rápido y confiable para los proyectos web de Giseella."/></group>}
      <Float speed={2} floatIntensity={0.2}><Text position={[0,0.9,0]} fontSize={0.16} color="#7dd3fc" anchorX="center">🐬 MySQL</Text></Float>
    </group>
  );
}

// ── Supabase Cat ──────────────────────────────────────────────
function SupabaseCat({position}:{position:[number,number,number]}){
  const g=useRef<THREE.Group>(null); const near=useNearby(position,4);
  useFrame(({clock})=>{ if(g.current)g.current.position.y=position[1]+Math.sin(clock.getElapsedTime()*1.2)*0.06+0.3; });
  return(
    <group ref={g} position={position}>
      <mesh position={[0,0.4,0]}><sphereGeometry args={[0.32,10,8]}/><meshStandardMaterial color="#6b7280" roughness={0.6}/></mesh>
      <mesh position={[0,0.88,0]}><sphereGeometry args={[0.26,10,8]}/><meshStandardMaterial color="#6b7280" roughness={0.6}/></mesh>
      {([-0.18,0.18] as number[]).map((x,i)=>(<mesh key={i} position={[x,1.12,0]} rotation={[0,0,i===0?0.4:-0.4]}><coneGeometry args={[0.1,0.18,5]}/><meshStandardMaterial color="#9ca3af" roughness={0.7}/></mesh>))}
      {([-0.1,0.1] as number[]).map((x,i)=>(<mesh key={i} position={[x,0.91,0.22]}><sphereGeometry args={[0.05,8,8]}/><meshStandardMaterial color="#3ecf8e" emissive="#3ecf8e" emissiveIntensity={0.8}/></mesh>))}
      {near&&<group position={[0,1.5,0]}><Bubble color="#3ecf8e" text="¡Hola! ⚡ Soy Supabase — base de datos en tiempo real, auth y storage. ¡Todo este mundo usa mi CDN!"/></group>}
      <Float speed={2} floatIntensity={0.3}><Text position={[0,1.5,0]} fontSize={0.16} color="#3ecf8e" anchorX="center">⚡ Supabase</Text></Float>
    </group>
  );
}

export default function NPCCharacters() {
  return (
    <>
      <RobotFallback position={[4,0,4]}/>
      <PythonSnake position={[-6,0,10]}/>
      <PostgreSQLElephant position={[14,0,18]}/>
      <DockerWhale position={[-18,0,2]}/>
      <ReactAtom position={[6,0,-6]}/>
      <GitOctopus position={[10,0,-16]}/>
      <JSBolt position={[14,0,4]}/>
      <MySQLDolphin position={[-4,0,18]}/>
      <SupabaseCat position={[2,0,10]}/>
      <PythonSnake position={[-12,0,-18]}/>
      <GitOctopus position={[18,0,2]}/>
      <DockerWhale position={[-6,0,-10]}/>
    </>
  );
}

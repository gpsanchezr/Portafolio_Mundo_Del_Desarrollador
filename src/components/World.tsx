'use client';
import { useMemo, useRef, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import * as THREE from 'three';

/* ─── FLOOR ──────────────────────────────────────────────────── */
function Floor() {
  return (
    <>
      <RigidBody type="fixed" colliders="cuboid">
        <mesh rotation={[-Math.PI/2,0,0]} receiveShadow>
          <planeGeometry args={[220,220]}/>
          <meshStandardMaterial color="#1a3a1a" roughness={0.95}/>
        </mesh>
      </RigidBody>
      <mesh rotation={[-Math.PI/2,0,0]} position={[0,0.002,0]}>
        <circleGeometry args={[70,64]}/>
        <meshStandardMaterial color="#1e5c22" roughness={1}/>
      </mesh>
      <mesh rotation={[-Math.PI/2,0,0]} position={[0,0.004,0]}>
        <circleGeometry args={[9,48]}/>
        <meshStandardMaterial color="#7c3aed" emissive="#7c3aed" emissiveIntensity={0.18}
          transparent opacity={0.35} side={THREE.DoubleSide}/>
      </mesh>
      {([0, Math.PI/2] as number[]).map((rot,i) => (
        <mesh key={i} rotation={[-Math.PI/2, rot, 0]} position={[0,0.003,0]}>
          <planeGeometry args={[3.8,72]}/>
          <meshStandardMaterial color="#2d3748" roughness={0.85}/>
        </mesh>
      ))}
    </>
  );
}

/* ─── INSTANCED FLOWERS ──────────────────────────────────────── */
function FlowerField({ count=2000, color, r0=5, r1=60 }:
  { count?:number; color:string; r0?:number; r1?:number }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const stem = useRef<THREE.InstancedMesh>(null);
  const dm   = useMemo(()=>new THREE.Object3D(),[]);
  const data = useMemo(()=>Array.from({length:count},()=>{
    const a=Math.random()*Math.PI*2, r=r0+Math.random()*(r1-r0);
    return { x:Math.cos(a)*r, z:Math.sin(a)*r, s:0.5+Math.random()*0.9,
             p:Math.random()*Math.PI*2, r:Math.random()*Math.PI*2 };
  }),[count,r0,r1]);

  useFrame(({clock})=>{
    if(!mesh.current||!stem.current) return;
    const t=clock.getElapsedTime();
    data.forEach((d,i)=>{
      const sw=Math.sin(t*0.7+d.p)*0.04;
      dm.position.set(d.x,0.22*d.s,d.z); dm.rotation.set(sw,d.r,sw*0.5);
      dm.scale.setScalar(d.s); dm.updateMatrix();
      mesh.current!.setMatrixAt(i,dm.matrix);
      dm.position.set(d.x,0.1*d.s,d.z); dm.rotation.set(sw*0.3,d.r,0);
      dm.scale.set(d.s*0.8,d.s,d.s*0.8); dm.updateMatrix();
      stem.current!.setMatrixAt(i,dm.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate=true;
    stem.current.instanceMatrix.needsUpdate=true;
  });

  return (
    <>
      <instancedMesh ref={mesh} args={[undefined,undefined,count]} castShadow>
        <sphereGeometry args={[0.11,6,5]}/>
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.22} roughness={0.55}/>
      </instancedMesh>
      <instancedMesh ref={stem} args={[undefined,undefined,count]}>
        <cylinderGeometry args={[0.018,0.022,0.22,4]}/>
        <meshStandardMaterial color="#16a34a" roughness={0.8}/>
      </instancedMesh>
    </>
  );
}

/* ─── TREE with wind ─────────────────────────────────────────── */
function Tree({ p, s=1 }:{ p:[number,number,number]; s?:number }) {
  const top=useRef<THREE.Group>(null);
  useFrame(({clock})=>{ if(top.current) top.current.rotation.z=Math.sin(clock.getElapsedTime()*0.5+p[0])*0.025; });
  return (
    <group position={p} scale={s}>
      <mesh position={[0,1.4,0]} castShadow>
        <cylinderGeometry args={[0.18,0.26,2.8,7]}/>
        <meshStandardMaterial color="#5c3d1e" roughness={0.9}/>
      </mesh>
      <group ref={top}>
        {([[2.8,1.6,'#14532d'],[3.6,1.3,'#166534'],[4.2,1.0,'#15803d']] as [number,number,string][]).map(([y,r,c],i)=>(
          <mesh key={i} position={[0,y,0]} castShadow>
            <coneGeometry args={[r,1.4,8]}/><meshStandardMaterial color={c} roughness={0.7}/>
          </mesh>
        ))}
        {[-0.6,0,0.6].flatMap((x,i)=>[-0.6,0,0.6].map((z,j)=>(
          <mesh key={`b${i}${j}`} position={[x,3.6,z]}>
            <sphereGeometry args={[0.09,5,5]}/>
            <meshStandardMaterial color={i+j===2?'#f9a8d4':'#c084fc'} emissive={i+j===2?'#be185d':'#7c3aed'} emissiveIntensity={0.35}/>
          </mesh>
        )))}
      </group>
    </group>
  );
}

/* ─── ENTRY RING helper ──────────────────────────────────────── */
function EntryRing({ pos, color }:{ pos:[number,number,number]; color:string }) {
  return (
    <>
      <mesh rotation={[-Math.PI/2,0,0]} position={[pos[0],0.02,pos[2]+4]}>
        <ringGeometry args={[0.9,1.2,28]}/>
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.7}
          transparent opacity={0.55} side={THREE.DoubleSide}/>
      </mesh>
      <Text position={[pos[0],0.06,pos[2]+4]} rotation={[-Math.PI/2,0,0]}
        fontSize={0.19} color={color} anchorX="center">ENTRAR</Text>
    </>
  );
}

/* ─── FLOATING SIGN helper ───────────────────────────────────── */
function FloatSign({ pos, label, emoji, color, yOffset=5, rotation=[0,0,0] }:
  { pos:[number,number,number]; label:string; emoji:string; color:string; yOffset?:number; rotation?:[number,number,number] }) {
  return (
    <Float speed={0.9} floatIntensity={0.2}>
      <group position={[pos[0],pos[1]+yOffset,pos[2]]} rotation={rotation}>
        <mesh><boxGeometry args={[3.2,0.82,0.1]}/><meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.38}/></mesh>
        <mesh><boxGeometry args={[3.38,0.98,0.07]}/><meshStandardMaterial color="#fde68a" metalness={0.8} roughness={0.2}/></mesh>
        <Text position={[0,0,0.09]} fontSize={0.23} color="white" anchorX="center" anchorY="middle">
          {`${emoji} ${label}`}
        </Text>
      </group>
    </Float>
  );
}

/* ─── MANSION (procedural) ───────────────────────────────────── */
function Mansion({ pos, color, label, emoji }:
  { pos:[number,number,number]; color:string; label:string; emoji:string }) {
  const gl=useRef<THREE.PointLight>(null);
  useFrame(({clock})=>{ if(gl.current) gl.current.intensity=1.8+Math.sin(clock.getElapsedTime()*2)*0.5; });
  return (
    <group position={pos}>
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[0,1.6,0]} castShadow receiveShadow>
          <boxGeometry args={[5,3.2,4.5]}/><meshStandardMaterial color="#f8f4ee" roughness={0.65}/>
        </mesh>
      </RigidBody>
      {([-2.2,2.2] as number[]).map((x,i)=>(
        <group key={i}>
          <RigidBody type="fixed" colliders="cuboid">
            <mesh position={[x,2.8,0]} castShadow><boxGeometry args={[1.8,5.6,1.8]}/><meshStandardMaterial color="#f8f4ee" roughness={0.65}/></mesh>
          </RigidBody>
          <mesh position={[x,5.7,0]} castShadow><coneGeometry args={[1.3,2.2,4]}/><meshStandardMaterial color={color} roughness={0.5}/></mesh>
        </group>
      ))}
      <mesh position={[0,3.4,0]}><boxGeometry args={[5.4,0.3,5]}/><meshStandardMaterial color={color} roughness={0.45}/></mesh>
      <mesh position={[0,1.0,2.28]}><boxGeometry args={[1.1,2.0,0.1]}/><meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.25}/></mesh>
      {([-1.5,1.5] as number[]).map((x,i)=>(
        <group key={i} position={[x,1.8,2.28]}>
          <mesh><boxGeometry args={[0.85,0.85,0.08]}/><meshStandardMaterial color="#bfdbfe" transparent opacity={0.75} roughness={0.1}/></mesh>
          <pointLight color="#fde68a" intensity={0.6} distance={4}/>
        </group>
      ))}
      <FloatSign pos={[0,0,0]} label={label} emoji={emoji} color={color} yOffset={5}/>
      <EntryRing pos={pos} color={color}/>
      <pointLight ref={gl} position={[0,2,2.8]} color={color} intensity={1.8} distance={7}/>
    </group>
  );
}

/* ─── OFFICE BUILDING (Procedural) ─────────────────── */
function OfficeBuilding({ pos, color, label, emoji, rotation=[0,0,0] }:
  { pos:[number,number,number]; color:string; label:string; emoji:string, rotation?:[number,number,number] }) {
  const gl=useRef<THREE.PointLight>(null);
  useFrame(({clock})=>{ if(gl.current) gl.current.intensity=2+Math.sin(clock.getElapsedTime()*1.5)*0.6; });
  return (
    <group position={pos} rotation={rotation}>
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[0,2.5,0]} castShadow receiveShadow>
          <boxGeometry args={[6,5,5]}/><meshStandardMaterial color="#e8e0d0" roughness={0.6}/>
        </mesh>
      </RigidBody>
      {([-2,-0.7,0.7,2] as number[]).map((x,i)=>(
        <mesh key={i} position={[x,2.5,2.6]} castShadow>
          <cylinderGeometry args={[0.22,0.25,5,10]}/><meshStandardMaterial color="#d4c9b0" roughness={0.5}/>
        </mesh>
      ))}
      <mesh position={[0,2.7,0]}><boxGeometry args={[6.4,0.25,5.4]}/><meshStandardMaterial color={color} roughness={0.4}/></mesh>
      <mesh position={[0,5.2,0]}><boxGeometry args={[6.8,0.4,5.8]}/><meshStandardMaterial color={color} roughness={0.35}/></mesh>
      <mesh position={[0,1.0,2.56]}><boxGeometry args={[1.4,2.0,0.1]}/><meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.25}/></mesh>
      <FloatSign pos={[0,0,0]} label={label} emoji={emoji} color={color} yOffset={6.5}/>
      <EntryRing pos={[0,0,0]} color={color}/>
      <pointLight ref={gl} position={[0,3,3]} color={color} intensity={2} distance={10}/>
    </group>
  );
}

/* ─── CINEMA (Cine-Verse) ────────────────────────────────────── */
function Cinema({ pos }:{ pos:[number,number,number] }) {
  const mq=useRef<THREE.Mesh>(null);
  useFrame(({clock})=>{ if(mq.current){ const m=mq.current.material as THREE.MeshStandardMaterial; m.emissiveIntensity=0.4+Math.sin(clock.getElapsedTime()*3)*0.3; } });
  return (
    <group position={pos}>
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[0,2.5,0]} castShadow receiveShadow><boxGeometry args={[7,5,5]}/><meshStandardMaterial color="#1a1a2e" roughness={0.6}/></mesh>
      </RigidBody>
      {([-2.5,2.5] as number[]).map((x,i)=>(
        <mesh key={i} position={[x,3,2.56]} castShadow><cylinderGeometry args={[0.3,0.3,6,10]}/><meshStandardMaterial color="#d4af37" metalness={0.7} roughness={0.3}/></mesh>
      ))}
      <mesh ref={mq} position={[0,4.8,2.6]}><boxGeometry args={[5,1.2,0.15]}/><meshStandardMaterial color="#dc2626" emissive="#dc2626" emissiveIntensity={0.4}/></mesh>
      <Text position={[0,4.8,2.76]} fontSize={0.32} color="white" anchorX="center" anchorY="middle">🎬 CINE-VERSE</Text>
      <mesh position={[0,1.2,2.56]}><boxGeometry args={[1.8,2.4,0.1]}/><meshStandardMaterial color="#d4af37" metalness={0.7} roughness={0.3} emissive="#d4af37" emissiveIntensity={0.2}/></mesh>
      {([-2,-1,0,1,2] as number[]).map((x,i)=>(<mesh key={i} position={[x,0.4,2.6]}><sphereGeometry args={[0.07,6,6]}/><meshStandardMaterial color="#fde68a" emissive="#fde68a" emissiveIntensity={1}/></mesh>))}
      <EntryRing pos={pos} color="#dc2626"/>
      {([-3,3] as number[]).map((x,i)=>(<pointLight key={i} position={[x,4,3]} color="#dc2626" intensity={2} distance={10}/>))}
    </group>
  );
}

/* ─── PARKING (ParkNidus) ────────────────────────────────────── */
function Parking({ pos }:{ pos:[number,number,number] }) {
  return (
    <group position={pos}>
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[0,1.5,0]} castShadow receiveShadow><boxGeometry args={[7,3,6]}/><meshStandardMaterial color="#0f172a" roughness={0.5} metalness={0.3}/></mesh>
      </RigidBody>
      {([-1.5,0,1.5] as number[]).map((z,i)=>(<mesh key={i} position={[0,0.08,z-0.5]}><boxGeometry args={[3.5,0.04,0.5]}/><meshStandardMaterial color="#818cf8" emissive="#818cf8" emissiveIntensity={0.8} transparent opacity={0.7}/></mesh>))}
      {([[-1.5,0.4,-1],[1.5,0.4,-1],[0,0.4,-1]] as [number,number,number][]).map(([x,y,z],i)=>(<mesh key={i} position={[x,y,z]} castShadow><boxGeometry args={[1.2,0.5,2.2]}/><meshStandardMaterial color={['#1e3a5f','#2d1b69','#0f2e1a'][i]} roughness={0.3} metalness={0.6}/></mesh>))}
      <mesh position={[0,3.1,0]}><boxGeometry args={[6,0.4,0.2]}/><meshStandardMaterial color="#6366f1" emissive="#6366f1" emissiveIntensity={0.5}/></mesh>
      <Text position={[0,3.1,0.15]} fontSize={0.28} color="white" anchorX="center" anchorY="middle">🚗 ParkNidus</Text>
      <EntryRing pos={pos} color="#6366f1"/>
      <pointLight position={[0,3,3]} color="#818cf8" intensity={2.5} distance={12}/>
    </group>
  );
}

/* ─── FARM with animated COW + HORSE ────────────────────────── */
function Farm({ pos }:{ pos:[number,number,number] }) {
  const cowRef=useRef<THREE.Group>(null);
  const horseRef=useRef<THREE.Group>(null);
  useFrame(({clock})=>{
    const t=clock.getElapsedTime();
    if(cowRef.current){ cowRef.current.position.x=Math.sin(t*0.35)*2; cowRef.current.rotation.y=Math.sin(t*0.35)*0.6+Math.PI*0.5; }
    if(horseRef.current){ horseRef.current.position.x=Math.cos(t*0.28)*2.5; horseRef.current.position.z=Math.sin(t*0.28)*1.2; horseRef.current.rotation.y=Math.atan2(Math.cos(t*0.28),-Math.sin(t*0.28)); }
  });
  return (
    <group position={pos}>
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[0,1.8,0]} castShadow receiveShadow><boxGeometry args={[6,3.6,5]}/><meshStandardMaterial color="#8B1A1A" roughness={0.8}/></mesh>
      </RigidBody>
      <mesh position={[0,4.0,0]} castShadow><coneGeometry args={[4.5,2.2,4]}/><meshStandardMaterial color="#5c3a1e" roughness={0.7}/></mesh>
      {([-1,1] as number[]).map((x,i)=>(<mesh key={i} position={[x,1.2,2.54]}><boxGeometry args={[1.1,2.4,0.1]}/><meshStandardMaterial color="#5c3a1e" roughness={0.8}/></mesh>))}
      {([-2.5,-1.5,-0.5,0.5,1.5,2.5] as number[]).map((x,i)=>(<mesh key={i} position={[x,0.5,3.8]}><boxGeometry args={[0.12,1.0,0.12]}/><meshStandardMaterial color="#8B6914" roughness={0.9}/></mesh>))}
      <mesh position={[0,0.8,3.8]}><boxGeometry args={[6.2,0.12,0.12]}/><meshStandardMaterial color="#8B6914" roughness={0.9}/></mesh>
      {/* Animated COW */}
      <group ref={cowRef} position={[0,0,5]}>
        <mesh position={[0,0.7,0]} castShadow><boxGeometry args={[1.2,0.8,0.7]}/><meshStandardMaterial color="#f5f5f5" roughness={0.8}/></mesh>
        <mesh position={[0,0.6,0]}><boxGeometry args={[1.3,0.85,0.75]}/><meshStandardMaterial color="#111" wireframe/></mesh>
        <mesh position={[0.5,1.1,0.1]}><sphereGeometry args={[0.35,10,8]}/><meshStandardMaterial color="#e8c8a0" roughness={0.7}/></mesh>
        {([-0.3,-0.1,0.1,0.3] as number[]).map((x,i)=>(<mesh key={i} position={[x>0?0.3:-0.3,0.25,i%2===0?-0.2:0.2]}><cylinderGeometry args={[0.07,0.06,0.55,6]}/><meshStandardMaterial color="#e8c8a0" roughness={0.8}/></mesh>))}
        <Float speed={2} floatIntensity={0.1}><Text position={[0,1.6,0]} fontSize={0.18} color="#86efac" anchorX="center">🐄 Vaca</Text></Float>
      </group>
      {/* Animated HORSE */}
      <group ref={horseRef} position={[2,0,6]}>
        <mesh position={[0,0.9,0]} castShadow><boxGeometry args={[1.4,0.9,0.65]}/><meshStandardMaterial color="#8B4513" roughness={0.8}/></mesh>
        <mesh position={[0.65,1.3,0.1]}><boxGeometry args={[0.5,0.55,0.45]}/><meshStandardMaterial color="#7a3a0a" roughness={0.8}/></mesh>
        <mesh position={[0.3,1.55,0]}><cylinderGeometry args={[0.06,0.04,0.45,6]}/><meshStandardMaterial color="#2c1a00" roughness={0.9}/></mesh>
        {([-0.3,-0.1,0.1,0.3] as number[]).map((x,i)=>(<mesh key={i} position={[x>0?0.32:-0.32,0.28,i%2===0?-0.22:0.22]}><cylinderGeometry args={[0.075,0.06,0.6,6]}/><meshStandardMaterial color="#7a3a0a" roughness={0.85}/></mesh>))}
        <Float speed={2} floatIntensity={0.1}><Text position={[0,1.9,0]} fontSize={0.18} color="#fde68a" anchorX="center">🐴 Caballo</Text></Float>
      </group>
      <FloatSign pos={[0,0,0]} label="Happy-Farm" emoji="🌾" color="#65a30d" yOffset={5.5}/>
      <EntryRing pos={pos} color="#65a30d"/>
      <pointLight position={[0,2,3]} color="#a3e635" intensity={1.5} distance={8}/>
    </group>
  );
}

/* ─── TECH-IA LAB (Drone + Turret + SpotLight) ───────────────── */
function TechLabZone({ pos }:{ pos:[number,number,number] }) {
  const droneRef=useRef<THREE.Group>(null);
  const turretRef=useRef<THREE.Group>(null);
  const spotTarget=useRef(new THREE.Object3D());
  const spotRef=useRef<THREE.SpotLight>(null);

  useFrame(({clock})=>{
    const t=clock.getElapsedTime();
    if(droneRef.current){
      droneRef.current.position.set(pos[0]+Math.sin(t*0.6)*3, pos[1]+4+Math.sin(t*1.2)*0.4, pos[2]+Math.cos(t*0.6)*3);
      droneRef.current.rotation.y=t*0.5;
    }
    if(turretRef.current) turretRef.current.rotation.y=Math.sin(t*0.8)*Math.PI*0.6;
    if(spotRef.current&&droneRef.current){
      spotRef.current.position.copy(droneRef.current.position);
      spotTarget.current.position.set(pos[0],pos[1],pos[2]);
    }
  });

  return (
    <group>
      <primitive object={spotTarget.current}/>
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[pos[0],pos[1]+0.2,pos[2]]} castShadow>
          <cylinderGeometry args={[5,5.5,0.4,16]}/>
          <meshStandardMaterial color="#0f172a" roughness={0.4} metalness={0.5}/>
        </mesh>
      </RigidBody>
      {/* Server racks */}
      {([-2,0,2] as number[]).map((x,i)=>(
        <mesh key={i} position={[pos[0]+x,pos[1]+1.2,pos[2]-1.5]} castShadow>
          <boxGeometry args={[0.8,2.4,0.6]}/><meshStandardMaterial color="#1e293b" roughness={0.3} metalness={0.6}/>
        </mesh>
      ))}
      {/* LEDs */}
      {([-2,0,2] as number[]).flatMap((x,i)=>([0.4,0.8,1.2,1.6,2.0] as number[]).map((y,j)=>(
        <mesh key={`${i}${j}`} position={[pos[0]+x+0.3,pos[1]+y,pos[2]-1.18]}>
          <sphereGeometry args={[0.04,4,4]}/>
          <meshStandardMaterial color={j%2===0?'#22c55e':'#3b82f6'} emissive={j%2===0?'#22c55e':'#3b82f6'} emissiveIntensity={1}/>
        </mesh>
      )))}
      {/* TURRET */}
      <group ref={turretRef} position={[pos[0]+1.5,pos[1]+0.4,pos[2]+1]}>
        <mesh><cylinderGeometry args={[0.3,0.4,0.5,8]}/><meshStandardMaterial color="#374151" metalness={0.8} roughness={0.2}/></mesh>
        <mesh position={[0,0.4,0]}><sphereGeometry args={[0.32,10,8]}/><meshStandardMaterial color="#1f2937" metalness={0.85} roughness={0.15}/></mesh>
        <mesh position={[0,0.4,0.42]} rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[0.06,0.06,0.7,6]}/><meshStandardMaterial color="#111827" metalness={0.9} roughness={0.1}/></mesh>
        <pointLight color="#22c55e" intensity={0.8} distance={6} position={[0,0.5,0]}/>
      </group>
      {/* DRONE */}
      <group ref={droneRef}>
        <mesh castShadow><boxGeometry args={[0.5,0.18,0.5]}/><meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.2}/></mesh>
        {([[-0.35,0.12,-0.35],[-0.35,0.12,0.35],[0.35,0.12,-0.35],[0.35,0.12,0.35]] as [number,number,number][]).map(([x,y,z],i)=>(
          <group key={i} position={[x,y,z]}>
            <mesh><cylinderGeometry args={[0.22,0.22,0.02,12]}/><meshStandardMaterial color="#374151" transparent opacity={0.5} metalness={0.6}/></mesh>
            <pointLight color="#22c55e" intensity={0.3} distance={1}/>
          </group>
        ))}
        <mesh position={[0,-0.12,0.2]}><sphereGeometry args={[0.06,8,8]}/><meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={1}/></mesh>
      </group>
      {/* Green spotlight */}
      <spotLight ref={spotRef} position={[pos[0],pos[1]+5,pos[2]]} target={spotTarget.current}
        color="#22c55e" intensity={4} angle={0.3} penumbra={0.7} distance={20} castShadow={false}/>
      <FloatSign pos={[pos[0],0,pos[2]]} label="Tech-IA Lab" emoji="🤖" color="#22c55e" yOffset={6.5}/>
      <mesh rotation={[-Math.PI/2,0,0]} position={[pos[0],0.02,pos[2]+5]}>
        <ringGeometry args={[0.9,1.2,28]}/><meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={0.7} transparent opacity={0.55} side={THREE.DoubleSide}/>
      </mesh>
      <Text position={[pos[0],0.06,pos[2]+5]} rotation={[-Math.PI/2,0,0]} fontSize={0.19} color="#22c55e" anchorX="center">ENTRAR</Text>
    </group>
  );
}

/* ─── MARKET (Servicios) ─────────────────────────────────────── */
function Market({ pos }:{ pos:[number,number,number] }) {
  return (
    <group position={pos}>
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[0,1.2,0]} castShadow receiveShadow><boxGeometry args={[6,2.4,4.5]}/><meshStandardMaterial color="#fef3c7" roughness={0.7}/></mesh>
      </RigidBody>
      <mesh position={[0,2.6,1.8]} rotation={[0.3,0,0]}><boxGeometry args={[6.2,0.1,2.2]}/><meshStandardMaterial color="#f59e0b" roughness={0.6} emissive="#f59e0b" emissiveIntensity={0.2}/></mesh>
      {([{x:-1.5,t:'💻 Web Dev',c:'#3b82f6'},{x:0,t:'⚙️ Backend',c:'#10b981'},{x:1.5,t:'🎨 UI/UX',c:'#8b5cf6'}]).map((s,i)=>(
        <group key={i} position={[s.x,1.6,2.32]}>
          <mesh><boxGeometry args={[1.0,0.7,0.08]}/><meshStandardMaterial color={s.c} emissive={s.c} emissiveIntensity={0.25}/></mesh>
          <Text position={[0,0,0.06]} fontSize={0.14} color="white" anchorX="center" anchorY="middle">{s.t}</Text>
        </group>
      ))}
      <FloatSign pos={[0,0,0]} label="Servicios" emoji="🏪" color="#f59e0b" yOffset={3.8}/>
      <EntryRing pos={pos} color="#f59e0b"/>
      <pointLight position={[0,2,3]} color="#fbbf24" intensity={2} distance={9}/>
    </group>
  );
}

/* ─── MAILBOX (Contacto) ─────────────────────────────────────── */
function Mailbox({ pos }:{ pos:[number,number,number] }) {
  const flag=useRef<THREE.Mesh>(null);
  useFrame(({clock})=>{ if(flag.current) flag.current.rotation.z=Math.sin(clock.getElapsedTime()*2)*0.25+0.3; });
  return (
    <group position={pos}>
      <mesh position={[0,0.9,0]}><cylinderGeometry args={[0.08,0.1,1.8,8]}/><meshStandardMaterial color="#555" metalness={0.6} roughness={0.3}/></mesh>
      <mesh position={[0,1.95,0]}><boxGeometry args={[0.9,0.65,0.5]}/><meshStandardMaterial color="#dc2626" roughness={0.4} emissive="#dc2626" emissiveIntensity={0.15}/></mesh>
      <mesh position={[0,2.25,0]} scale={[0.9,0.28,0.5]}><sphereGeometry args={[1,10,6,0,Math.PI*2,0,Math.PI/2]}/><meshStandardMaterial color="#b91c1c" roughness={0.4}/></mesh>
      <mesh ref={flag} position={[0.5,2.05,0.1]}><boxGeometry args={[0.25,0.35,0.04]}/><meshStandardMaterial color="#dc2626" roughness={0.5}/></mesh>
      <Float speed={1.5} floatIntensity={0.25}><Text position={[0,2.9,0]} fontSize={0.22} color="#f9a8d4" anchorX="center">📬 Contacto</Text></Float>
      <mesh rotation={[-Math.PI/2,0,0]} position={[0,0.02,1.8]}>
        <ringGeometry args={[0.8,1.1,24]}/><meshStandardMaterial color="#0891b2" emissive="#0891b2" emissiveIntensity={0.7} transparent opacity={0.55} side={THREE.DoubleSide}/>
      </mesh>
      <pointLight position={[0,2,2]} color="#0891b2" intensity={1.5} distance={7}/>
    </group>
  );
}

/* ─── ORIGIN PEDESTAL ────────────────────────────────────────── */
function OriginPedestal() {
  const ring=useRef<THREE.Mesh>(null);
  useFrame(({clock})=>{ if(ring.current) ring.current.rotation.z=clock.getElapsedTime()*0.4; });
  return (
    <group>
      <mesh position={[0,0.18,0]} receiveShadow><cylinderGeometry args={[4.5,5,0.36,32]}/><meshStandardMaterial color="#2e1065" roughness={0.5} metalness={0.2}/></mesh>
      <mesh ref={ring} rotation={[-Math.PI/2,0,0]} position={[0,0.4,0]}>
        <ringGeometry args={[3.5,4,48]}/><meshStandardMaterial color="#a78bfa" emissive="#7c3aed" emissiveIntensity={0.9} transparent opacity={0.6} side={THREE.DoubleSide}/>
      </mesh>
      <Float speed={0.8} floatIntensity={0.2}>
        <group position={[0,2.5,0]}>
          <Text fontSize={0.52} color="#c4b5fd" anchorX="center" anchorY="middle" outlineColor="#7c3aed" outlineWidth={0.02}>🌸 Giseella's World</Text>
          <Text position={[0,-0.65,0]} fontSize={0.2} color="#f9a8d4" anchorX="center">Tecnóloga en Desarrollo de Software</Text>
        </group>
      </Float>
      <pointLight position={[0,4,0]} color="#a78bfa" intensity={3} distance={15}/>
    </group>
  );
}

/* ─── SKILL TOTEM ────────────────────────────────────────────── */
function SkillTotem({ pos, skill, color, icon }:
  { pos:[number,number,number]; skill:string; color:string; icon:string }) {
  const gl=useRef<THREE.Mesh>(null);
  useFrame(({clock})=>{ if(gl.current){ const m=gl.current.material as THREE.MeshStandardMaterial; m.emissiveIntensity=0.4+Math.sin(clock.getElapsedTime()*2+pos[0])*0.3; } });
  return (
    <group position={pos}>
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[0,1,0]} castShadow><cylinderGeometry args={[0.2,0.25,2,8]}/><meshStandardMaterial color="#5c3d1e" roughness={0.9}/></mesh>
      </RigidBody>
      <mesh ref={gl} position={[0,2.2,0]}><boxGeometry args={[0.9,0.9,0.9]}/><meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.4} roughness={0.4}/></mesh>
      <Float speed={2} floatIntensity={0.3}>
        <group position={[0,3.0,0]}>
          <Text fontSize={0.5} color={color} anchorX="center" anchorY="middle">{icon}</Text>
          <Text position={[0,-0.45,0]} fontSize={0.18} color="white" anchorX="center">{skill}</Text>
        </group>
      </Float>
      <pointLight position={[0,2.2,0]} color={color} intensity={1.2} distance={5}/>
    </group>
  );
}

/* ─── FIREFLIES ──────────────────────────────────────────────── */
function Fireflies({ n=100 }:{ n?:number }) {
  const ref=useRef<THREE.InstancedMesh>(null);
  const dm=useMemo(()=>new THREE.Object3D(),[]);
  const data=useMemo(()=>Array.from({length:n},()=>({
    x:(Math.random()-0.5)*110, y:0.4+Math.random()*3.5, z:(Math.random()-0.5)*110,
    sp:0.3+Math.random()*0.5, r:1+Math.random()*3, ph:Math.random()*Math.PI*2,
  })),[n]);
  useFrame(({clock})=>{
    if(!ref.current) return;
    const t=clock.getElapsedTime();
    data.forEach((d,i)=>{
      dm.position.set(d.x+Math.sin(t*d.sp+d.ph)*d.r, d.y+Math.sin(t*0.5+d.ph)*0.45, d.z+Math.cos(t*d.sp+d.ph)*d.r);
      dm.scale.setScalar((0.5+Math.sin(t*2+d.ph)*0.3)*0.065); dm.updateMatrix();
      ref.current!.setMatrixAt(i,dm.matrix);
    });
    ref.current.instanceMatrix.needsUpdate=true;
  });
  return (
    <instancedMesh ref={ref} args={[undefined,undefined,n]}>
      <sphereGeometry args={[1,4,4]}/>
      <meshStandardMaterial color="#fde047" emissive="#fde047" emissiveIntensity={4} transparent opacity={0.85} blending={THREE.AdditiveBlending} depthWrite={false}/>
    </instancedMesh>
  );
}

/* ─── BOUNDARIES ─────────────────────────────────────────────── */
function Boundaries() {
  return (
    <>
      {([[0,3,70,140,6,1],[0,3,-70,140,6,1],[70,3,0,1,6,140],[-70,3,0,1,6,140]] as [number,number,number,number,number,number][]).map(([x,y,z,w,h,d],i)=>(
        <RigidBody key={i} type="fixed" colliders="cuboid">
          <mesh position={[x,y,z]} visible={false}><boxGeometry args={[w,h,d]}/><meshStandardMaterial/></mesh>
        </RigidBody>
      ))}
    </>
  );
}

/* ─── TREE POSITIONS ─────────────────────────────────────────── */
const TREE_POS:[number,number,number][] = [
  ...[0,22,44,66,88,110,132,154,176,198,220,242,264,286,308,330].map((a,i)=>{
    const r=42+(i%3)*5; return [Math.cos(a*Math.PI/180)*r, 0, Math.sin(a*Math.PI/180)*r] as [number,number,number];
  }),
  ...[30,90,150,210,270,330].map((a,i)=>{
    const r=26+(i%2)*4; return [Math.cos(a*Math.PI/180)*r, 0, Math.sin(a*Math.PI/180)*r] as [number,number,number];
  }),
  [-7,0,-7],[-7,0,7],[7,0,7],[7,0,-7],
];

/* ═══════════════════════════════════════════════════════════════
   MAIN WORLD EXPORT
═══════════════════════════════════════════════════════════════ */
export default function World() {
  return (
    <>
      <Floor/>
      <Boundaries/>
      <OriginPedestal/>

      {/* Flower fields */}
      <FlowerField count={2600} color="#c084fc" r0={5}  r1={62}/>
      <FlowerField count={1800} color="#f472b6" r0={8}  r1={54}/>
      <FlowerField count={1000} color="#818cf8" r0={10} r1={45}/>
      <FlowerField count={600}  color="#fb7185" r0={12} r1={38}/>
      <FlowerField count={350}  color="#fde68a" r0={6}  r1={30}/>

      {/* Trees */}
      {TREE_POS.map((p,i)=>(<Tree key={i} p={p} s={0.7+Math.random()*0.65}/>))}

      {/* ── BUILDINGS ── */}
      <Mansion pos={[-22,0,-8]}  color="#16a34a" label="Sobre Mí"    emoji="🌳"/>
      <Mansion pos={[10,0,-20]}  color="#be185d" label="GlowCode"    emoji="✨"/>
      <Mansion pos={[-20,0,18]}  color="#b45309" label="Testimonios" emoji="💬"/>

      {/* Office buildings — 100% Procedurales sin error 400! */}
      <OfficeBuilding pos={[-14,0,0]} color="#a855f7" label="Dev HQ" emoji="🏢"/>
      <OfficeBuilding pos={[-20,0,-20]} color="#0891b2" label="Terrasoft" emoji="🏠" rotation={[0,Math.PI*0.3,0]}/>

      {/* Specialized buildings */}
      <Farm     pos={[-8,0,-22]}/>
      <Cinema   pos={[22,0,-12]}/>
      <Parking  pos={[20,0,10]}/>
      <Market   pos={[0,0,22]}/>
      <Mailbox  pos={[0,0,-30]}/>

      {/* Tech-IA Lab with drone + turret */}
      <TechLabZone pos={[14,0,18]}/>

      {/* Skill totems */}
      <SkillTotem pos={[-6,0,12]}  skill="Python"     color="#3d9b3d" icon="🐍"/>
      <SkillTotem pos={[-10,0,16]} skill="React"      color="#61dafb" icon="⚛️"/>
      <SkillTotem pos={[-4,0,18]}  skill="PostgreSQL" color="#336791" icon="🐘"/>
      <SkillTotem pos={[-14,0,13]} skill="FastAPI"    color="#059669" icon="🚀"/>
      <SkillTotem pos={[-8,0,22]}  skill="Docker"     color="#2496ed" icon="🐳"/>
      <SkillTotem pos={[-3,0,23]}  skill="Git"        color="#f05032" icon="🐙"/>
      <SkillTotem pos={[5,0,14]}   skill="OpenCV"     color="#22c55e" icon="👁️"/>
      <SkillTotem pos={[8,0,18]}   skill="Supabase"   color="#3ecf8e" icon="⚡"/>

      <Fireflies n={130}/>
    </>
  );
}
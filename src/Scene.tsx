import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line, RoundedBox } from "@react-three/drei";
import { Group, Mesh } from "three";

function Pulse() {
  const pulse = useRef<Mesh>(null);
  useFrame(({ clock }) => {
    const points = [[-1.7, 0.8, 0.3], [-1.7, 0, 0.3], [1.65, 0, 0.3], [1.65, 0.6, 0.3]];
    const progress = (clock.elapsedTime * 0.45) % 3;
    const segment = Math.floor(progress);
    const fraction = progress - segment;
    const a = points[segment], b = points[segment + 1];
    pulse.current?.position.set(a[0] + (b[0] - a[0]) * fraction, a[1] + (b[1] - a[1]) * fraction, a[2]);
  });
  return <mesh ref={pulse}><sphereGeometry args={[0.045, 10, 10]}/><meshBasicMaterial color="#d7f78c"/></mesh>;
}

function PerformanceGuard({onSlow}: {onSlow: () => void}) {
  const sample = useRef({time: 0, frames: 0, finished: false});
  useFrame(({clock}, delta) => {
    if (sample.current.finished || clock.elapsedTime < 2 || document.hidden) return;
    sample.current.time += delta;
    sample.current.frames++;
    if (sample.current.time >= 4) {
      sample.current.finished = true;
      if (sample.current.frames / sample.current.time < 22) onSlow();
    }
  });
  return null;
}
function Core() {
  const group = useRef<Group>(null);
  useFrame(({ clock, pointer }) => {
    if (group.current) {
      group.current.rotation.y =
        Math.sin(clock.elapsedTime * 0.14) * 0.12 + pointer.x * 0.13;
      group.current.rotation.x = pointer.y * 0.06;
    }
  });
  return (
    <group ref={group} rotation={[0.28, -0.4, -0.12]}>
      <Float speed={1.3} rotationIntensity={0.09} floatIntensity={0.28}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          {[1.25, 1.75, 2.15].map((r, i) => (
            <mesh key={r} rotation={[i * 0.1, 0, i * 0.3]}>
              <torusGeometry args={[r, 0.012, 8, 100]} />
              <meshBasicMaterial
                color={i === 2 ? "#2c3036" : "#c8f169"}
                transparent
                opacity={i === 2 ? 0.4 : 0.35}
              />
            </mesh>
          ))}
        </group>
        <RoundedBox args={[2.4, 1.5, 0.18]} radius={0.12} smoothness={4}>
          <meshPhysicalMaterial
            color="#1c1f25"
            metalness={0.8}
            roughness={0.22}
            transparent
            opacity={0.78}
            clearcoat={1}
          />
        </RoundedBox>
        <RoundedBox
          args={[1.12, 0.65, 0.08]}
          position={[0, 0, 0.15]}
          radius={0.07}
        >
          <meshStandardMaterial
            color="#22261d"
            metalness={0.6}
            roughness={0.25}
            emissive="#9bc34a"
            emissiveIntensity={0.13}
          />
        </RoundedBox>
        <Line
          points={[
            [-0.3, -0.2, 0.21],
            [-0.3, 0.2, 0.21],
            [0.3, -0.2, 0.21],
            [0.3, 0.2, 0.21],
          ]}
          color="#d7f78c"
          lineWidth={5}
        />
        {[
          [-1.7, 0.8, 0.3],
          [1.65, 0.6, 0.1],
          [-1.4, -1.1, 0.4],
          [1.5, -0.9, 0.2],
        ].map((pos, i) => (
          <group key={i} position={pos as [number, number, number]}>
            <RoundedBox args={[0.36, 0.36, 0.14]} radius={0.06}>
              <meshStandardMaterial
                color="#272b32"
                metalness={0.6}
                roughness={0.3}
              />
            </RoundedBox>
            <mesh position={[0, 0, 0.1]}>
              <sphereGeometry args={[0.05, 12, 12]} />
              <meshBasicMaterial color={i === 3 ? "#c8f169" : "#e9ecef"} />
            </mesh>
          </group>
        ))}
        <Line
          points={[
            [-1.7, 0.8, 0.3],
            [-1.7, 0, 0.1],
            [1.65, 0, 0.1],
            [1.65, 0.6, 0.1],
          ]}
          color="#8f9a6a"
          transparent
          opacity={0.45}
          lineWidth={1}
        />
        <Line
          points={[
            [-1.4, -1.1, 0.2],
            [-1.4, -0.5, 0.1],
            [1.5, -0.5, 0.1],
            [1.5, -0.9, 0.2],
          ]}
          color="#8f9a6a"
          transparent
          opacity={0.45}
          lineWidth={1}
        />
        <Pulse />
      </Float>
    </group>
  );
}
export default function Scene({onSlow}: {onSlow: () => void}) {
  return (
    <Canvas
      dpr={[1, 1.4]}
      camera={{ position: [0, 0, 5], fov: 40 }}
      gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
      aria-hidden="true"
    >
      <ambientLight intensity={1.4} />
      <directionalLight position={[2, 4, 5]} intensity={3} color="#f2f5e8" />
      <pointLight position={[-3, -2, 2]} intensity={6} color="#c8f169" />
      <group scale={0.9}>
        <Core />
      </group>
      <PerformanceGuard onSlow={onSlow}/>
    </Canvas>
  );
}

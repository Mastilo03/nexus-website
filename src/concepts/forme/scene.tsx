import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { ThreeCanvas as Canvas } from "../../ThreeCanvas";
import * as THREE from "three";

const ease = (a: number, b: number, x: number) =>
  THREE.MathUtils.smoothstep(x, a, b);
const box = new THREE.BoxGeometry(1, 1, 1);
const edges = new THREE.EdgesGeometry(box);
function Dimension({
  text,
  position,
}: {
  text: string;
  position: [number, number, number];
}) {
  const texture = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 512;
    c.height = 96;
    const ctx = c.getContext("2d")!;
    ctx.fillStyle = "#ff5b1f";
    ctx.font = '64px "Geist Mono Variable", monospace';
    ctx.textAlign = "center";
    ctx.fillText(text, 256, 70);
    return new THREE.CanvasTexture(c);
  }, [text]);
  useEffect(() => () => texture.dispose(), [texture]);
  return (
    <sprite position={position} scale={[3.6, 0.68, 1]}>
      <spriteMaterial map={texture} transparent depthTest={false} />
    </sprite>
  );
}
type Piece = {
  p: [number, number, number];
  s: [number, number, number];
  material: number;
};
function pieces(floor: number): Piece[] {
  const w = 12 - floor * 0.55,
    d = 8 - floor * 0.28;
  const parts: Piece[] = [
    { p: [0, 0, 0], s: [w, 0.28, d], material: 0 },
    { p: [0, 0.31, 0], s: [w - 0.2, 0.12, d - 0.2], material: 2 },
    { p: [-1, 1.5, -0.8], s: [2.1, 2.65, 2.2], material: 0 },
  ];
  for (const z of [-d / 2 + 0.55, d / 2 - 0.55]) {
    parts.push({ p: [0, 1.48, z], s: [w - 1.2, 2.5, 0.08], material: 1 });
    for (let x = -w / 2 + 0.6; x < w / 2; x += 1.35)
      parts.push({ p: [x, 1.5, z], s: [0.055, 2.6, 0.1], material: 3 });
  }
  for (const x of [-w / 2 + 0.6, w / 2 - 0.6])
    parts.push({ p: [x, 1.5, 0], s: [0.08, 2.5, d - 1.1], material: 1 });
  parts.push({ p: [w / 2 - 0.18, 0.75, 0], s: [0.08, 1.2, d], material: 1 });
  return parts;
}
function Building({
  progress,
  active,
}: {
  progress: { current: number };
  active: boolean;
}) {
  const floors = useRef<(THREE.Group | null)[]>([]),
    plan = useRef<THREE.Group>(null),
    sun = useRef<THREE.DirectionalLight>(null),
    arc = useRef<THREE.Line>(null);
  const materials = useMemo(
    () => [
      new THREE.MeshStandardMaterial({
        color: "#8E9192",
        roughness: 0.92,
        transparent: true,
      }),
      new THREE.MeshStandardMaterial({
        color: "#9FB7C4",
        roughness: 0.16,
        metalness: 0.35,
        transparent: true,
        depthWrite: false,
      }),
      new THREE.MeshStandardMaterial({
        color: "#a38563",
        roughness: 0.85,
        transparent: true,
      }),
      new THREE.MeshStandardMaterial({
        color: "#424a50",
        roughness: 0.5,
        transparent: true,
      }),
    ],
    [],
  );
  const line = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: "#F2F3F1",
        transparent: true,
        opacity: 0.7,
      }),
    [],
  );
  const arcLine = useMemo(
    () =>
      new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(
          Array.from({ length: 81 }, (_, i) => {
            const a = (i / 80) * Math.PI;
            return new THREE.Vector3(
              Math.cos(a) * 18,
              Math.sin(a) * 18 + 3,
              -5,
            );
          }),
        ),
        new THREE.LineBasicMaterial({ color: "#FF5B1F", transparent: true }),
      ),
    [],
  );
  const planting = useRef<THREE.InstancedMesh>(null),
    shadow = useRef<THREE.ShadowMaterial>(null);
  useEffect(() => {
    if (!planting.current) return;
    const m = new THREE.Object3D();
    for (let i = 0; i < 36; i++) {
      m.position.set(
        (i % 12) * 0.55 - 3,
        0.5 + Math.sin(i) * 0.1,
        Math.floor(i / 12) * 0.55 - 1,
      );
      m.scale.set(0.25, 0.5 + (i % 3) * 0.16, 0.25);
      m.updateMatrix();
      planting.current.setMatrixAt(i, m.matrix);
    }
    planting.current.instanceMatrix.needsUpdate = true;
  }, []);
  useFrame(({ camera, invalidate }) => {
    const p = progress.current,
      material = ease(0.49, 0.58, p),
      lift = ease(0.8, 0.99, p);
    floors.current.forEach((g, i) => {
      if (g)
        g.position.y =
          i * 3 +
          (1 - ease(0.12 + i * 0.032, 0.29 + i * 0.032, p)) * i * 2.3 -
          10;
    });
    materials.forEach((m, i) => {
      m.opacity = material * (i === 1 ? 0.42 : 1) * (1 - lift * 0.91);
      m.depthWrite = i !== 1 && lift === 0;
    });
    line.opacity = (0.7 - material * 0.5) * (1 - lift * 0.8);
    if (plan.current) {
      plan.current.position.set(0, 8 + lift * 5, 0);
      plan.current.rotation.x = (Math.PI / 2) * lift;
      plan.current.scale.setScalar(1 + lift * 0.25);
      const planOpacity = ease(0.78, 0.8, p);
      plan.current.visible = planOpacity > 0;
      plan.current.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Sprite) {
          const material = object.material as THREE.Material;
          material.transparent = true;
          material.opacity = planOpacity;
        }
      });
    }
    if (planting.current)
      (planting.current.material as THREE.MeshStandardMaterial).opacity =
        material * (1 - lift);
    if (shadow.current) shadow.current.opacity = 0.25 * material * (1 - lift);
    const angle = THREE.MathUtils.lerp(
      0.15,
      Math.PI - 0.2,
      ease(0.59, 0.79, p),
    );
    if (sun.current)
      sun.current.position.set(
        Math.cos(angle) * 22,
        Math.sin(angle) * 24 + 8,
        12,
      );
    (arcLine.material as THREE.LineBasicMaterial).opacity =
      ease(0.58, 0.61, p) * (1 - ease(0.78, 0.81, p));
    camera.position.set(
      THREE.MathUtils.lerp(29, 0, lift),
      THREE.MathUtils.lerp(24, 13, lift),
      THREE.MathUtils.lerp(33, 30, lift),
    );
    if (camera instanceof THREE.OrthographicCamera)
      camera.zoom = THREE.MathUtils.lerp(18, 35, lift);
    camera.lookAt(0, THREE.MathUtils.lerp(3, 13, lift), 0);
    camera.updateProjectionMatrix();
    if (active) invalidate();
  });
  return (
    <>
      <ambientLight intensity={1.1} />
      <directionalLight
        ref={sun}
        castShadow
        intensity={3.2}
        position={[20, 30, 12]}
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-18}
        shadow-camera-right={18}
        shadow-camera-top={20}
        shadow-camera-bottom={-18}
        shadow-camera-near={1}
        shadow-camera-far={90}
        shadow-bias={-0.001}
      />
      {Array.from({ length: 7 }, (_, i) => (
        <group
          key={i}
          ref={(g) => {
            floors.current[i] = g;
          }}
        >
          {pieces(i).map((part, j) => (
            <group key={j} position={part.p} scale={part.s}>
              <mesh
                geometry={box}
                material={materials[part.material]}
                castShadow
                receiveShadow
              />
              <lineSegments geometry={edges} material={line} />
            </group>
          ))}
          {i === 6 && (
            <group position={[0, 2.9, 0]}>
              <mesh
                geometry={box}
                material={materials[0]}
                scale={[8.7, 0.23, 6.32]}
                castShadow
              />
              <instancedMesh
                ref={planting}
                args={[undefined, undefined, 36]}
                castShadow
              >
                <sphereGeometry args={[1, 6, 4]} />
                <meshStandardMaterial
                  color="#58665a"
                  roughness={1}
                  transparent
                  depthWrite={false}
                />
              </instancedMesh>
            </group>
          )}
        </group>
      ))}
      <group ref={plan} visible={false}>
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[8.7, 6.3]} />
          <meshBasicMaterial color="#F2F3F1" side={THREE.DoubleSide} />
        </mesh>
        {[
          [0, 0, 8.7, 0.05],
          [-4.3, 0, 0.05, 6.3],
          [4.3, 0, 0.05, 6.3],
          [0, 3.1, 8.7, 0.05],
          [0, -3.1, 8.7, 0.05],
          [-1.2, 0, 0.06, 6.3],
          [1.5, 1, 5.5, 0.06],
          [1.5, -1.5, 5.5, 0.06],
        ].map((v, i) => (
          <mesh
            key={i}
            position={[v[0], 0.03, v[1]]}
            scale={[v[2], 0.05, v[3]]}
            geometry={box}
          >
            <meshBasicMaterial color="#121417" />
          </mesh>
        ))}
        {[-3.65, 3.65].map((z) => (
          <mesh
            key={z}
            position={[0, 0.02, z]}
            geometry={box}
            scale={[9.4, 0.025, 0.025]}
          >
            <meshBasicMaterial color="#FF5B1F" />
          </mesh>
        ))}
        {[-4.65, 4.65].flatMap((x) =>
          [-3.65, 3.65].map((z) => (
            <mesh
              key={`${x}${z}`}
              position={[x, 0.02, z]}
              geometry={box}
              scale={[0.025, 0.025, 0.35]}
            >
              <meshBasicMaterial color="#FF5B1F" />
            </mesh>
          )),
        )}
        <mesh
          position={[4.65, 0.04, 0]}
          geometry={box}
          scale={[0.025, 0.025, 6.3]}
        >
          <meshBasicMaterial color="#FF5B1F" />
        </mesh>
        {[-3.15, 3.15].map((z) => (
          <mesh
            key={z}
            position={[4.65, 0.04, z]}
            geometry={box}
            scale={[0.4, 0.025, 0.025]}
          >
            <meshBasicMaterial color="#FF5B1F" />
          </mesh>
        ))}
        <Dimension text="8.70 m" position={[0, 0.1, -4.15]} />
        <Dimension text="6.30 m" position={[6.1, 0.1, 0]} />
        {[-4.3, 4.3].map((x) => (
          <mesh
            key={x}
            position={[x, 0.06, 0]}
            scale={[0.13, 0.08, 6.3]}
            geometry={box}
          >
            <meshBasicMaterial color="#121417" />
          </mesh>
        ))}
        {[-3.1, 3.1].map((z) => (
          <mesh
            key={z}
            position={[0, 0.06, z]}
            scale={[8.7, 0.08, 0.13]}
            geometry={box}
          >
            <meshBasicMaterial color="#121417" />
          </mesh>
        ))}
        {[
          [1.8, 1],
          [0.4, -1.5],
          [-1.2, -0.5],
        ].map(([x, z], i) => (
          <mesh
            key={i}
            position={[x, 0.075, z]}
            geometry={box}
            scale={i === 2 ? [0.12, 0.06, 0.75] : [0.75, 0.06, 0.12]}
          >
            <meshBasicMaterial color="#F2F3F1" />
          </mesh>
        ))}
      </group>
      <primitive object={arcLine} ref={arc} />
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -10.2, 0]}
        receiveShadow
      >
        <planeGeometry args={[120, 120]} />
        <shadowMaterial ref={shadow} transparent opacity={0.25} />
      </mesh>
    </>
  );
}
export default function Scene({
  progress,
  active,
}: {
  progress: { current: number };
  active: boolean;
}) {
  return (
    <Canvas
      aria-hidden="true"
      shadows
      dpr={[1, 1.5]}
      frameloop={active ? "always" : "never"}
      orthographic
      camera={{ position: [29, 24, 33], zoom: 15, near: 0.1, far: 200 }}
      gl={{ antialias: true, preserveDrawingBuffer: true }}
    >
      <Building progress={progress} active={active} />
    </Canvas>
  );
}

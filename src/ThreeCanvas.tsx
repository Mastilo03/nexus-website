import { useEffect, useRef, type ReactNode } from "react";
import {
  createRoot,
  extend,
  events,
  type CanvasProps,
} from "@react-three/fiber";
import {
  Group,
  Mesh,
  LineSegments,
  InstancedMesh,
  Sprite,
  AmbientLight,
  DirectionalLight,
  PointLight,
  PlaneGeometry,
  SphereGeometry,
  TorusGeometry,
  ExtrudeGeometry,
  MeshBasicMaterial,
  MeshStandardMaterial,
  MeshPhysicalMaterial,
  ShadowMaterial,
  SpriteMaterial,
} from "three";

// Register only the scene vocabulary. Fiber's general Canvas registers the entire
// Three namespace, including unused loaders, geometries and material families.
extend({
  Group,
  Mesh,
  LineSegments,
  InstancedMesh,
  Sprite,
  AmbientLight,
  DirectionalLight,
  PointLight,
  PlaneGeometry,
  SphereGeometry,
  TorusGeometry,
  ExtrudeGeometry,
  MeshBasicMaterial,
  MeshStandardMaterial,
  MeshPhysicalMaterial,
  ShadowMaterial,
  SpriteMaterial,
});
export function ThreeCanvas({
  children,
  gl,
  camera,
  dpr,
  shadows,
  orthographic,
  frameloop = "always",
}: CanvasProps) {
  const canvas = useRef<HTMLCanvasElement>(null),
    root = useRef<ReturnType<typeof createRoot> | null>(null),
    latest = useRef<ReactNode>(children),
    ready = useRef(false);
  latest.current = children;
  useEffect(() => {
    const el = canvas.current!;
    const r = createRoot(el);
    root.current = r;
    let alive = true;
    const resize = async () => {
      const box = el.getBoundingClientRect();
      await r.configure({
        gl,
        camera,
        dpr,
        shadows,
        orthographic,
        frameloop,
        events,
        size: {
          width: box.width,
          height: box.height,
          top: box.top,
          left: box.left,
        },
        onCreated: (state) => state.events.connect?.(el),
      });
      if (alive) {
        ready.current = true;
        r.render(latest.current);
      }
    };
    const observer = new ResizeObserver(() => void resize());
    observer.observe(el);
    void resize();
    return () => {
      alive = false;
      ready.current = false;
      observer.disconnect();
      r.unmount();
      root.current = null;
    };
  }, []);
  useEffect(() => {
    if (ready.current && root.current) {
      void root.current.configure({ frameloop });
      root.current.render(children);
    }
  }, [children, frameloop]);
  return (
    <canvas
      ref={canvas}
      aria-hidden="true"
      style={{ display: "block", width: "100%", height: "100%" }}
    />
  );
}

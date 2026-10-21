import { lazy, Suspense, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { NEXUS_ORIGIN } from "../config";
import "@fontsource-variable/host-grotesk";
import "@fontsource-variable/geist-mono";
import "./forme.css";
import "./sections.css";
import FormeSections from "./Sections";
const Scene = lazy(() => import("./scene"));
const lines = [
  "Space to see differently.",
  "Seven floors. Eighteen residences.",
  "Light, planned for every hour.",
  "A different perspective.",
];
export default function Forme() {
  const stage = useRef<HTMLElement>(null),
    progress = useRef(0),
    [motion, setMotion] = useState(false),
    [active, setActive] = useState(true);
  useEffect(() => {
    const media = matchMedia(
      "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
    );
    let gl = false;
    try {
      gl = !!document.createElement("canvas").getContext("webgl2");
    } catch {}
    const update = () => setMotion(media.matches && gl);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    if (!motion || !stage.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis();
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    lenis.on("scroll", ScrollTrigger.update);
    const el = stage.current;
    const panels = Array.from(el.querySelectorAll<HTMLElement>(".forme-beat"));
    const time = el.querySelector<HTMLElement>(".forme-time");
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.65,
      onUpdate: (self) => {
        progress.current = self.progress;
        panels.forEach((panel, i) => {
          const bounds = [0, 0.17, 0.59, 0.8, 1];
          const p = self.progress;
          const opacity = Math.max(
            0,
            Math.min(
              1,
              i === 0 ? 1 : (p - bounds[i]) / 0.02,
              i === 3 ? 1 : (bounds[i + 1] - p) / 0.02,
            ),
          );
          panel.style.opacity = String(opacity);
          panel.style.visibility = opacity > 0.01 ? "visible" : "hidden";
        });
        const instruction = el.querySelector(".forme-instruction");
        if (instruction)
          instruction.textContent =
            self.progress < 0.5
              ? "Scroll to assemble ↓"
              : self.progress < 0.8
                ? "Scroll to study the light ↓"
                : "Scroll to explore the residences ↓";
        if (time)
          time.textContent = `${String(Math.round(7 + Math.min(1, Math.max(0, (self.progress - 0.59) / 0.2)) * 11)).padStart(2, "0")}:00`;
      },
    });
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) setActive(e.isIntersecting);
    });
    io.observe(el);
    return () => {
      trigger.kill();
      io.disconnect();
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, [motion]);
  return (
    <div className="forme">
      <a className="concept-skip" href="#main">
        Skip to content
      </a>
      <a className="concept-credit" href={`${NEXUS_ORIGIN}/work/forme`}>
        FORME is a design concept by NEXUS <span>↗</span>
      </a>
      <header className="forme-nav">
        <a href="#forme-top" className="forme-wordmark">
          FORME
        </a>
        <span>Eighteen residences. One considered whole.</span>
        <a href="#residences">Explore the residences ↗</a>
      </header>
      <main id="main" tabIndex={-1}>
        <section
          id="forme-top"
          ref={stage}
          className={`forme-assembly ${motion ? "is-motion" : "is-static"}`}
          aria-label="The architecture of FORME"
        >
          <div className="forme-stage">
            <div className="forme-drawing">
              {motion ? (
                <Suspense
                  fallback={<img src="/forme/axonometric.png" alt="" />}
                >
                  <Scene progress={progress} active={active} />
                </Suspense>
              ) : (
                <img
                  src="/forme/axonometric.png"
                  alt="Axonometric view of seven stepped floors, glazed facades and a planted roof."
                />
              )}
            </div>
            <div className="forme-beats">
              {lines.map((line, i) => (
                <div className={`forme-beat beat-${i}`} key={line}>
                  <h1 hidden={i !== 0}>{line}</h1>
                  {i !== 0 && <h2>{line}</h2>}
                  {i === 0 && (
                    <p>
                      Concrete. Glass. Timber.
                      <br />A study in how we live.
                    </p>
                  )}
                  {i === 2 && <span className="forme-time">07:00</span>}
                  {i === 3 && (
                    <>
                      <p className="forme-mono">
                        Penthouse / Sample plan / 8.70 × 6.30 m
                      </p>
                      <a className="forme-action" href="#residences">
                        Explore the residences <span>↗</span>
                      </a>
                    </>
                  )}
                </div>
              ))}
            </div>
            <div className="forme-sheet">
              <span>FORME / Architectural concept</span>
              <span>Seven storeys / Assembly study</span>
              <span className="forme-instruction">
                {motion ? "Scroll to assemble ↓" : "Static axonometric study"}
              </span>
            </div>
          </div>
        </section>
        <FormeSections />
      </main>
    </div>
  );
}

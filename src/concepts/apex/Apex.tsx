import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import FramePlayer, { frameUrl } from "./FramePlayer";
import { NEXUS_ORIGIN } from "../config";
import "@fontsource/michroma";
import "@fontsource-variable/inter-tight";
import "@fontsource-variable/geist-mono";
import "./apex.css";
import "./sections.css";
import ApexSections from "./Sections";
const lines = [
  "Every detail. Elevated.",
  "Correction: years of swirls, removed.",
  "Coating: water and dirt slide off.",
  "A finish worth a closer look.",
];
export default function Apex() {
  const section = useRef<HTMLElement>(null),
    progress = useRef(0),
    [motion, setMotion] = useState(false);
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const c = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }
    ).connection;
    const update = () =>
      setMotion(
        !media.matches &&
          !c?.saveData &&
          !["slow-2g", "2g", "3g"].includes(c?.effectiveType || ""),
      );
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    if (!motion || !section.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis();
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    lenis.on("scroll", ScrollTrigger.update);
    const el = section.current;
    const panels = el.querySelectorAll<HTMLElement>(".apex-beat");
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.4,
      onUpdate: (s) => {
        const p = s.progress;
        progress.current = p;
        el.style.setProperty("--progress", String(p));
        el.style.setProperty(
          "--wipe",
          `${Math.min(100, Math.max(0, ((p - 0.25) / 0.25) * 100))}%`,
        );
        el.style.setProperty(
          "--correction",
          String(
            Math.max(0, Math.min(1, (p - 0.25) / 0.025, (0.5 - p) / 0.025)),
          ),
        );
        el.style.setProperty("--beads", String(p > 0.52 && p < 0.78 ? 1 : 0));
        panels.forEach((e, i) => {
          const a = i * 0.25,
            b = (i + 1) * 0.25;
          const o = Math.max(
            0,
            Math.min(
              1,
              i === 0 ? 1 : (p - a) / 0.025,
              i === 3 ? 1 : (b - p) / 0.025,
            ),
          );
          e.style.opacity = String(o);
          e.style.visibility = o > 0.01 ? "visible" : "hidden";
        });
      },
    });
    return () => {
      trigger.kill();
      lenis.destroy();
      gsap.ticker.remove(tick);
    };
  }, [motion]);
  return (
    <div className="apex">
      <a className="concept-skip" href="#main">
        Skip to content
      </a>
      <a className="apex-credit" href={`${NEXUS_ORIGIN}/work/apex`}>
        APEX is a design concept by NEXUS <span>↗</span>
      </a>
      <header className="apex-nav">
        <a className="apex-logo" href="#apex-top">
          APEX
        </a>
        <span>Correction. Coating. Protection.</span>
        <a href="#booking">Book a consultation ↗</a>
      </header>
      <main id="main" tabIndex={-1}>
        <section
          ref={section}
          id="apex-top"
          className={`apex-sequence ${motion ? "animated" : "still"}`}
          aria-label="A study of the finish"
        >
          <div className="apex-stage">
            {motion ? (
              <>
                <img className="apex-poster" src={frameUrl(0)} alt="" />
                <FramePlayer progress={progress} />
                <div className="apex-streak" />
                <div className="apex-correction">
                  <div className="apex-swirl" />
                </div>
                <div className="apex-beads" aria-hidden="true">
                  {Array.from({ length: 18 }, (_, i) => (
                    <i
                      key={i}
                      style={{
                        left: `${22 + ((i * 17) % 60)}%`,
                        top: `${45 + ((i * 13) % 20)}%`,
                        transform: `translateY(calc((var(--progress, 0) - 0.52) * ${60 + i * 2}px))`,
                      }}
                    />
                  ))}
                </div>
              </>
            ) : null}
            <div className="apex-beat-list">
              {lines.map((line, i) => (
                <div className={`apex-beat apex-beat-${i}`} key={line}>
                  {!motion && (
                    <img
                      src={frameUrl([0, 53, 106, 159][i], true)}
                      alt={
                        i === 0
                          ? "An unbadged graphite sports coupe under studio light."
                          : ""
                      }
                    />
                  )}
                  <div>
                    {i === 0 ? <h1>{line}</h1> : <h2>{line}</h2>}
                    {i === 0 && (
                      <p>
                        Precision care for the surface
                        <br />
                        that catches every light.
                      </p>
                    )}
                    {i === 3 && (
                      <a href="#booking" className="apex-action">
                        Book a consultation <span>↗</span>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="apex-sequence-note">
              <span>Paint correction / Ceramic coating / PPF</span>
              <span>Still-based sequence preview. Orbit video to follow.</span>
            </div>
          </div>
        </section>
        <ApexSections />
      </main>
    </div>
  );
}

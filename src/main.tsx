import React, { Suspense, lazy, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Link,
  NavLink,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import {
  ArrowUpRight,
  ArrowDown,
  ChevronDown,
  Menu,
  X,
  Layers,
  Workflow as WorkflowIcon,
  Check,
  MessageSquare,
  CalendarDays,
  Database,
  ArrowRight,
  Globe,
  Zap,
} from "lucide-react";
import { useReducedMotion } from "framer-motion";
import {
  Button,
  Label,
  Reveal,
  SectionHead,
  CTA,
  Comparison,
  Workflow,
  AssistantDemo,
  ROICalculator,
  Industries,
} from "./components";
import { projects } from "./data";
import { ProjectArt } from "./ProjectArt";
import "./style.css";
import "./refinements.css";
const Scene = lazy(() => import("./Scene"));
const Pages = lazy(() => import("./pages"));
const metadata: Record<string, [string, string]> = {
  "/": [
    "Automation & Digital Experiences",
    "Immersive web experiences and AI automation for ambitious businesses. Explore interactive demos and calculate your opportunity.",
  ],
  "/services/web-design": [
    "Immersive Web Design",
    "Premium web design, interactive 3D websites and conversion-focused digital experiences.",
  ],
  "/services/automation": [
    "AI Automation Services",
    "Lead qualification, appointment scheduling and CRM automation designed around your business.",
  ],
  "/work": [
    "Concept Portfolio & Interactive Demos",
    "Explore six NEXUS concepts across hospitality, property, healthcare, automotive, home services and wellness.",
  ],
  "/roi-calculator": [
    "Automation ROI Calculator",
    "Explore editable estimates for missed-lead recovery and administrative time savings.",
  ],
  "/pricing": [
    "Engagement Models",
    "Explore custom-quote website, automation and combined growth partnerships.",
  ],
  "/about": [
    "About NEXUS",
    "Our approach to combining creative digital experiences and intelligent business systems.",
  ],
  "/contact": [
    "Start a Conversation",
    "Tell NEXUS about your business, your challenges and your next stage of growth.",
  ],
  "/privacy": [
    "Privacy Policy",
    "How information is handled on the NEXUS website and in its interactive demonstrations.",
  ],
  "/terms": [
    "Terms of Use",
    "Terms for using NEXUS concepts, demonstrations and illustrative calculators.",
  ],
};
function RouteEffects() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    const [title, description] = metadata[pathname] ?? [
      "Page not found",
      "Find your next step with NEXUS.",
    ];
    document.title = `${title} — NEXUS`;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", description);
    const origin =
      import.meta.env.VITE_SITE_URL ||
      "https://nexus-digital-experiences.brawnyperch17.chatgpt.site";
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", origin + pathname);
    document.getElementById("main")?.focus({ preventScroll: true });
  }, [pathname]);
  return null;
}
function Logo() {
  return (
    <Link to="/" className="logo" aria-label="NEXUS home">
      <svg viewBox="0 0 36 36" fill="none" aria-hidden="true">
        <path d="M6 29V7h6l12 22h6V7h-6v15L12 7H6v22Z" fill="currentColor" />
      </svg>
      NEXUS<span className="logo-period">®</span>
    </Link>
  );
}
function Header() {
  const [open, setOpen] = useState(false),
    [services, setServices] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => {
    setOpen(false);
    setServices(false);
  }, [pathname]);
  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setServices(false);
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);
  return (
    <header className="header">
      <div className="nav-wrap">
        <Logo />
        <nav
          aria-label="Main navigation"
          className={open ? "navigation open" : "navigation"}
        >
          <div
            className="services-nav"
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget))
                setServices(false);
            }}
          >
            <button
              aria-expanded={services}
              onClick={() => setServices(!services)}
            >
              Services <ChevronDown size={13} />
            </button>
            {services && (
              <div className="dropdown">
                <Link to="/services/web-design">
                  <Layers size={19} />
                  <div>
                    Immersive Web Design
                    <small>Designed to be remembered.</small>
                  </div>
                </Link>
                <Link to="/services/automation">
                  <WorkflowIcon size={19} />
                  <div>
                    AI Automation<small>Built to keep things moving.</small>
                  </div>
                </Link>
              </div>
            )}
          </div>
          <NavLink to="/work">Our Work</NavLink>
          <NavLink to="/roi-calculator">ROI Calculator</NavLink>
          <NavLink to="/pricing">Pricing</NavLink>
          <NavLink to="/about">About</NavLink>
          <Button className="mobile-cta">Book a Free Strategy Call</Button>
        </nav>
        <Button className="nav-cta">Book a Free Strategy Call</Button>
        <button
          className="menu-button icon-button"
          aria-expanded={open}
          aria-label={open ? "Close navigation" : "Open navigation"}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}
function Footer() {
  return (
    <footer className="wrap footer">
      <div className="footer-top">
        <div>
          <Logo />
          <p>
            Creative intelligence.
            <br />
            Connected possibilities.
          </p>
          <span className="tiny">AUTOMATION & DIGITAL EXPERIENCES</span>
        </div>
        <div>
          <small>EXPLORE</small>
          <Link to="/services/web-design">Web Design</Link>
          <Link to="/services/automation">AI Automation</Link>
          <Link to="/work">Our Work</Link>
        </div>
        <div>
          <small>YOUR NEXT STEP</small>
          <Link to="/roi-calculator">ROI Calculator</Link>
          <Link to="/pricing">Engagement Models</Link>
          <Link to="/contact">
            Start a Conversation <ArrowUpRight size={13} />
          </Link>
        </div>
        <div>
          <small>THE STUDIO</small>
          <Link to="/about">About NEXUS</Link>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms of Use</Link>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} NEXUS. Built with intention.</span>
        <span>
          <span className="status-dot" /> HUMAN AMBITION. DIGITAL POSSIBILITY.
        </span>
      </div>
    </footer>
  );
}
class SceneBoundary extends React.Component<
  {
    children: React.ReactNode;
  },
  {
    failed: boolean;
  }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? (
      <div className="fallback-core">
        N<span>CONNECTED INTELLIGENCE</span>
      </div>
    ) : (
      this.props.children
    );
  }
}
function HeroVisual() {
  const reduced = useReducedMotion();
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 701px)");
    const update = () => {
      if (!desktop.matches || reduced) { setReady(false); return; }
      try {
        const gl = document.createElement("canvas").getContext("webgl2");
        setReady(Boolean(gl));
        gl?.getExtension("WEBGL_lose_context")?.loseContext();
      } catch { setReady(false); }
    };
    update();
    desktop.addEventListener("change", update);
    return () => desktop.removeEventListener("change", update);
  }, [reduced]);
  return (
    <div className="hero-visual">
      <div className="visual-grid" />
      <div className="orbit orbit-a" />
      <div className="orbit orbit-b" />
      <div className="scene-container">
        <SceneBoundary>
          {ready ? (
            <Suspense
              fallback={
                <div className="fallback-core">
                  N<span>CONNECTED INTELLIGENCE</span>
                </div>
              }
            >
              <Scene onSlow={() => setReady(false)} />
            </Suspense>
          ) : (
            <div className="fallback-core">
              N<span>CONNECTED INTELLIGENCE</span>
            </div>
          )}
        </SceneBoundary>
      </div>
      <div className="visual-topline">
        <span className="tiny">NEXUS / CONNECTED INTELLIGENCE</span>
        <span className="tiny">
          <span className="status-dot" /> DEMO SYSTEM
        </span>
      </div>
      <div className="float-card lead">
        <span className="card-icon">
          <MessageSquare size={16} />
        </span>
        <div>
          <small>NEW LEAD</small>
          <b>Opportunity received</b>
        </div>
        <span className="mini-dot" />
      </div>
      <div className="float-card response">
        <span className="card-icon">
          <Zap size={16} />
        </span>
        <div>
          <small>AI RESPONSE</small>
          <b>A conversation begins</b>
        </div>
      </div>
      <div className="float-card booked">
        <span className="card-icon green">
          <CalendarDays size={16} />
        </span>
        <div>
          <small>APPOINTMENT</small>
          <b>Next step, confirmed</b>
        </div>
        <Check size={15} className="green-text" />
      </div>
      <div className="float-card crm">
        <Database size={14} />
        <span>CRM updated</span>
        <Check size={13} />
      </div>
      <div className="visual-footer">
        <span>01 — CAPTURE</span>
        <i />
        <span>02 — CONNECT</span>
        <i />
        <span>03 — CONVERT</span>
      </div>
    </div>
  );
}
function Hero() {
  return (
    <section className="hero wrap">
      <div className="hero-copy">
        <Label>THE FUTURE OF DIGITAL GROWTH</Label>
        <h1>
          Websites that
          <br />
          captivate.
          <br />
          <span>
            AI systems <br />
            that convert.
          </span>
        </h1>
        <p>
          Unforgettable digital experiences. Intelligent automation.
          <br className="desktop-break" /> Built together to move your business
          forward.
        </p>
        <div className="hero-buttons">
          <a href="#solutions" className="button">
            Explore Our Solutions <ArrowUpRight size={17} />
          </a>
          <Button to="/roi-calculator" secondary>
            Calculate Your ROI
          </Button>
        </div>
        <div className="hero-reassurance">
          <span className="small-line" /> Built for ambition. Designed for
          measurable results.
        </div>
      </div>
      <HeroVisual />
      <a className="scroll-hint" href="#solutions">
        <ArrowDown size={14} /> SCROLL TO EXPLORE
      </a>
      <span className="hero-index">CREATIVE × INTELLIGENT / 001</span>
    </section>
  );
}
function SelectedWork() {
  return (
    <section className="wrap section">
      <div className="section-title-row">
        <SectionHead
          label="POSSIBILITIES, MADE TANGIBLE"
          title="A glimpse of what’s possible."
          text="Original concepts. Real interactions. A different kind of digital presence."
        />
        <Link className="inline-link" to="/work">
          Explore all concepts <ArrowUpRight size={16} />
        </Link>
      </div>
      <div className="selected-work">
        {projects.slice(0, 3).map((p, i) => (
          <Reveal key={p.name}>
            <Link className="project-card" to={`/work?project=${p.name}`}>
              <ProjectArt art={p.art} name={p.name} />
              <div className="project-info">
                <div>
                  <span className="tiny">
                    {p.industry} / CONCEPT {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3>{p.label}</h3>
                </div>
                <ArrowUpRight size={20} />
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
function Solutions() {
  return (
    <section className="wrap section" id="solutions">
      <div className="section-title-row">
        <SectionHead
          label="TWO DISCIPLINES. ONE GROWTH PARTNER."
          title="Make an impression. Build momentum."
          text="Two distinct ways to move your business forward. Explore the experience your customers see—or the systems that work behind it."
        />
        <span className="section-number">01 / OUR EXPERTISE</span>
      </div>
      <div className="service-paths">
        <Link className="service-path path-web" to="/services/web-design">
          <div className="path-top">
            <span>01 / DIGITAL EXPERIENCES</span>
            <Layers size={22} />
          </div>
          <div className="path-visual">
            <ProjectArt art="hotel" name="AURA" />
          </div>
          <div className="path-content">
            <h3>Immersive Web Design</h3>
            <p>
              A digital presence that feels unmistakably yours. Distinctive
              storytelling, thoughtful interaction and a clear path to action.
            </p>
            <div className="path-tags">
              <span>Art direction</span>
              <span>Interactive 3D</span>
              <span>Conversion-focused UX</span>
            </div>
            <div className="path-link">
              Explore the Design Studio <ArrowUpRight size={20} />
            </div>
          </div>
        </Link>
        <Link
          className="service-path path-automation"
          to="/services/automation"
        >
          <div className="path-top">
            <span>02 / INTELLIGENT OPERATIONS</span>
            <WorkflowIcon size={22} />
          </div>
          <div className="path-visual">
            <div className="path-node">
              <MessageSquare />
              <span>New inquiry</span>
            </div>
            <i />
            <div className="path-node center">
              <Zap />
              <span>NEXUS Engine</span>
            </div>
            <i />
            <div className="path-node">
              <CalendarDays />
              <span>Next step</span>
            </div>
          </div>
          <div className="path-content">
            <h3>AI Automation</h3>
            <p>
              A business that keeps moving. Connect conversations, appointments
              and customer records with less repetitive work.
            </p>
            <div className="path-tags">
              <span>AI assistants</span>
              <span>Workflow automation</span>
              <span>CRM integrations</span>
            </div>
            <div className="path-link">
              Explore the Automation Engine <ArrowUpRight size={20} />
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
function Home() {
  return (
    <>
      <Hero />
      <div className="trust-strip wrap">
        <p>
          For businesses that refuse
          <br />
          to blend in.
        </p>
        <div>
          {[
            "Hospitality",
            "Real Estate",
            "Healthcare",
            "Beauty & Wellness",
            "Home Services",
            "Professional Services",
          ].map((s) => (
            <span key={s}>{s}</span>
          ))}
        </div>
      </div>
      <Solutions />
      <section className="demo-section">
        <div className="wrap section">
          <SectionHead
            label="LESS THEORY. MORE POSSIBILITY."
            title="Don’t just read about it. Experience it."
            text="Step into your customer’s shoes. See how a conversation can become a connected workflow."
          />
          <AssistantDemo />
        </div>
      </section>
      <SelectedWork />
      <section className="wrap section">
        <SectionHead
          label="MAKE THE OPPORTUNITY VISIBLE"
          title="What could a faster response change?"
          text="Explore the potential value of recovered leads and less repetitive work. Start with your numbers."
        />
        <ROICalculator />
      </section>
      <Industries />
      <CTA />
    </>
  );
}
function App() {
  return (
    <BrowserRouter>
      <RouteEffects />
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header />
      <main id="main" tabIndex={-1}>
        <Suspense
          fallback={
            <div className="page-loading">Loading the next experience…</div>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Pages />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

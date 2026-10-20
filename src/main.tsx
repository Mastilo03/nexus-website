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
  ArrowRight,
  ChevronDown,
  Menu,
  X,
  Layers,
  Workflow as WorkflowIcon,
  Check,
  MessageSquare,
  CalendarCheck,
  Database,
  Reply,
} from "lucide-react";
import {
  Button,
  SectionHead,
  CTA,
  AssistantDemo,
  ROICalculator,
  Industries,
  useReducedMotion,
} from "./components";
import { projects } from "./data";
import { ProjectArt } from "./ProjectArt";
import "@fontsource-variable/geist";
import "@fontsource-variable/geist-mono";
import "./style.css";
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
      NEXUS
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
  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
  }, [open]);
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
              Services <ChevronDown size={14} aria-hidden="true" />
            </button>
            {services && (
              <div className="dropdown">
                <Link to="/services/web-design">
                  <Layers size={18} aria-hidden="true" />
                  <span>
                    Web design
                    <small>Sites that turn visits into inquiries</small>
                  </span>
                </Link>
                <Link to="/services/automation">
                  <WorkflowIcon size={18} aria-hidden="true" />
                  <span>
                    Automation
                    <small>Replies, bookings and CRM, handled</small>
                  </span>
                </Link>
              </div>
            )}
          </div>
          <NavLink to="/work">Work</NavLink>
          <NavLink to="/roi-calculator">ROI calculator</NavLink>
          <NavLink to="/pricing">Pricing</NavLink>
          <NavLink to="/about">About</NavLink>
          <Button className="mobile-cta">Get in touch</Button>
        </nav>
        <Button className="nav-cta">Get in touch</Button>
        <button
          className="menu-button icon-button"
          aria-expanded={open}
          aria-label={open ? "Close navigation" : "Open navigation"}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
    </header>
  );
}
function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-top">
        <div className="footer-brand">
          <Logo />
          <p>Websites and automation for service businesses.</p>
        </div>
        <nav aria-label="Footer">
          <div>
            <h2>Services</h2>
            <Link to="/services/web-design">Web design</Link>
            <Link to="/services/automation">Automation</Link>
            <Link to="/roi-calculator">ROI calculator</Link>
          </div>
          <div>
            <h2>Company</h2>
            <Link to="/work">Work</Link>
            <Link to="/pricing">Pricing</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </div>
          <div>
            <h2>Legal</h2>
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms</Link>
          </div>
        </nav>
      </div>
      <div className="wrap footer-bottom">
        © {new Date().getFullYear()} NEXUS
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
    return this.state.failed ? null : this.props.children;
  }
}
const heroEvents = [
  {
    icon: MessageSquare,
    time: "21:47",
    title: "New inquiry from your website",
    detail: "“Do you have anything free this week?”",
  },
  {
    icon: Reply,
    time: "21:47",
    title: "Replied with two open times",
    detail: "Thursday 10:30 or Friday 15:00",
  },
  {
    icon: CalendarCheck,
    time: "21:52",
    title: "Booked for Thursday 10:30",
    detail: "Confirmation and reminder sent",
  },
  {
    icon: Database,
    time: "21:52",
    title: "Added to your CRM",
    detail: "Ready for your team in the morning",
  },
];
function HeroVisual() {
  const reduced = useReducedMotion();
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 901px)");
    const update = () => {
      if (!desktop.matches || reduced) {
        setReady(false);
        return;
      }
      try {
        const gl = document.createElement("canvas").getContext("webgl2");
        setReady(Boolean(gl));
        gl?.getExtension("WEBGL_lose_context")?.loseContext();
      } catch {
        setReady(false);
      }
    };
    update();
    desktop.addEventListener("change", update);
    return () => desktop.removeEventListener("change", update);
  }, [reduced]);
  return (
    <div className="hero-visual">
      <div className="scene-container" aria-hidden="true">
        {ready && (
          <SceneBoundary>
            <Suspense fallback={null}>
              <Scene onSlow={() => setReady(false)} />
            </Suspense>
          </SceneBoundary>
        )}
      </div>
      <figure className="hero-feed">
        <figcaption>
          <span>After hours, handled</span>
          <small>Sample</small>
        </figcaption>
        <ol>
          {heroEvents.map(({ icon: Icon, time, title, detail }, i) => (
            <li key={title} style={{ "--i": i } as React.CSSProperties}>
              <span className="feed-icon" aria-hidden="true">
                <Icon size={16} />
              </span>
              <div>
                <b>{title}</b>
                <small>{detail}</small>
              </div>
              <time>{time}</time>
            </li>
          ))}
        </ol>
      </figure>
    </div>
  );
}
function Hero() {
  return (
    <section className="hero wrap">
      <div className="hero-copy">
        <h1>Never lose a lead to a slow reply.</h1>
        <p>
          We design websites that bring inquiries in, and automations that
          answer, qualify and book them, even after hours.
        </p>
        <div className="hero-buttons">
          <Button>Get in touch</Button>
          <a href="#demo" className="button secondary">
            Try the demo
          </a>
        </div>
      </div>
      <HeroVisual />
    </section>
  );
}
function Solutions() {
  return (
    <section className="wrap section" id="solutions">
      <SectionHead
        title="The website brings them in. The system follows up."
        text="Two services that work on their own, and work best together."
      />
      <div className="service-paths">
        <Link className="service-path" to="/services/web-design">
          <div className="path-visual">
            <ProjectArt art="hotel" name="AURA" />
          </div>
          <div className="path-content">
            <h3>Web design</h3>
            <p>
              A site that looks as good as your business is, explains what you
              do in seconds, and makes getting in touch the obvious next step.
            </p>
            <ul className="path-tags">
              <li>Custom design</li>
              <li>Mobile first</li>
              <li>Clear inquiry path</li>
            </ul>
            <span className="path-link">
              See web design <ArrowRight size={16} aria-hidden="true" />
            </span>
          </div>
        </Link>
        <Link className="service-path" to="/services/automation">
          <div className="path-visual path-flow" aria-hidden="true">
            <div className="path-node">
              <MessageSquare size={18} />
              <span>Inquiry</span>
            </div>
            <i />
            <div className="path-node center">
              <Check size={18} />
              <span>Qualified</span>
            </div>
            <i />
            <div className="path-node">
              <CalendarCheck size={18} />
              <span>Booked</span>
            </div>
          </div>
          <div className="path-content">
            <h3>Automation</h3>
            <p>
              Inquiries answered in minutes, the right questions asked,
              appointments booked and your CRM kept up to date. Your team
              approves what matters.
            </p>
            <ul className="path-tags">
              <li>Website and chat assistants</li>
              <li>Booking</li>
              <li>CRM</li>
            </ul>
            <span className="path-link">
              See automation <ArrowRight size={16} aria-hidden="true" />
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
}
function SelectedWork() {
  return (
    <section className="wrap section">
      <div className="section-title-row">
        <SectionHead
          title="Concept projects"
          text="Original concepts that show how we work. Each one has a working demo."
        />
        <Link className="inline-link" to="/work">
          All six concepts <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
      <div className="selected-work">
        {projects.slice(0, 3).map((p) => (
          <Link
            key={p.name}
            className="project-card"
            to={`/work/${p.slug}`}
          >
            <ProjectArt art={p.art} name={p.name} />
            <div className="project-info">
              <h3>{p.label}</h3>
              <span>{p.industry}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
function Home() {
  return (
    <>
      <Hero />
      <section className="demo-section" id="demo">
        <div className="wrap section">
          <SectionHead
            title="See it from your customer’s side."
            text="Pick a business and answer like a customer would. It’s a scripted demo, so nothing is sent or booked."
          />
          <AssistantDemo />
        </div>
      </section>
      <Solutions />
      <section className="wrap section">
        <SectionHead
          title="What are slow replies costing you?"
          text="Put in your own numbers. The result is an estimate, not a promise."
        />
        <ROICalculator />
      </section>
      <Industries />
      <SelectedWork />
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
        <Suspense fallback={<div className="page-loading" />}>
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

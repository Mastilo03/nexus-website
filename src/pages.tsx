import { useEffect, useState, type ReactNode } from "react";
import { Link, Routes, Route, useSearchParams } from "react-router-dom";
import {
  ArrowUpRight,
  ArrowRight,
  ArrowLeft,
  Check,
  Layers,
  Workflow as WorkflowIcon,
  Smartphone,
  MousePointer2,
  Globe,
  BarChart3,
  Zap,
  MessageSquare,
  CalendarDays,
  Database,
  ShieldCheck,
  Headphones,
} from "lucide-react";
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
  FAQ,
} from "./components";
import { projects } from "./data";
import { ProjectArt } from "./ProjectArt";
import Contact from "./Contact";
import Legal from "./Legal";
function PageHero({
  label,
  title,
  text,
  children,
}: {
  label: string;
  title: ReactNode;
  text: string;
  children?: ReactNode;
}) {
  return (
    <section className="wrap page-hero">
      <Label>{label}</Label>
      <h1>{title}</h1>
      <p>{text}</p>
      {children}
      <span className="page-breadcrumb">NEXUS / {label}</span>
    </section>
  );
}
function ServiceSwitch() {
  return (
    <div className="wrap service-switch">
      <Link to="/services/web-design">
        <span className="service-dot violet" /> Immersive Web Design
      </Link>
      <span>/</span>
      <Link to="/services/automation">
        <span className="service-dot emerald" /> AI Automation
      </Link>
    </div>
  );
}
const webFeatures = [
  {
    icon: Layers,
    title: "A distinctive visual world",
    text: "A cohesive art direction, custom layouts and a brand story that makes your business unmistakable.",
  },
  {
    icon: MousePointer2,
    title: "Interaction with purpose",
    text: "Selective 3D, considered motion and intuitive interactions that help visitors explore.",
  },
  {
    icon: Smartphone,
    title: "Every screen, considered",
    text: "Responsive layouts, accessible navigation and lightweight visual fallbacks for a confident mobile experience.",
  },
  {
    icon: ArrowUpRight,
    title: "A clear next step",
    text: "Customer journeys shaped around real decisions, with focused calls to action and useful inquiry flows.",
  },
  {
    icon: Globe,
    title: "A strong technical foundation",
    text: "Fast assets, semantic content, page metadata and sensible loading strategies built into the experience.",
  },
  {
    icon: BarChart3,
    title: "Connected to your business",
    text: "Forms, booking journeys and analytics integrations scoped around the systems you actually use.",
  },
];
function WebDesign() {
  return (
    <div className="web-service">
      <ServiceSwitch />
      <section className="wrap studio-hero">
        <div className="studio-heading">
          <Label>01 / THE DIGITAL EXPERIENCE STUDIO</Label>
          <h1>
            Don’t just <br />
            show up.
            <br />
            <span>Be unforgettable.</span>
          </h1>
          <p>
            Immersive websites for brands with something to say. Strategy,
            design and development—crafted into one distinctive experience.
          </p>
          <div className="hero-buttons">
            <Button to="/contact?service=Web%20Design">
              Discuss Your Website
            </Button>
            <a className="inline-link" href="#web-concepts">
              Explore the work <ArrowRight size={15} />
            </a>
          </div>
        </div>
        <div className="studio-composition">
          <div className="studio-browser">
            <div className="browser-chrome">
              <i />
              <i />
              <i />
              <span>AURA / DIGITAL EXPERIENCE CONCEPT</span>
            </div>
            <ProjectArt art="hotel" name="AURA" />
          </div>
          <div className="studio-mobile">
            <span>AURA</span>
            <div className="mobile-arch" />
            <p>
              A slower
              <br />
              <em>state of mind.</em>
            </p>
            <small>EXPLORE THE ESCAPE ↗</small>
          </div>
          <div className="studio-caption">
            <span>ART DIRECTION × INTERACTION × ENGINEERING</span>
            <span>DESIGNED BY NEXUS</span>
          </div>
          <div className="studio-tag">
            <MousePointer2 size={14} /> Every detail has a purpose.
          </div>
        </div>
      </section>
      <div className="wrap service-principles">
        <span>Distinctive by design.</span>
        <span>Intuitive by nature.</span>
        <span>Built to perform.</span>
      </div>
      <section className="wrap section service-intro">
        <div>
          <Label>BEYOND THE FIRST IMPRESSION</Label>
          <h2>
            Your website is
            <br />
            your most important
            <br />
            <span className="service-accent">brand experience.</span>
          </h2>
        </div>
        <div>
          <p>
            Before a conversation, before a visit, before a purchase—there is a
            feeling. Your website should make people understand who you are, why
            you matter and what to do next.
          </p>
          <p>
            We connect visual storytelling with conversion-focused UX. The
            result is a digital presence that feels like your business at its
            best, from the first scroll to the final inquiry.
          </p>
        </div>
      </section>
      <section className="studio-showcase">
        <div className="wrap section">
          <SectionHead
            label="SEE THE DIFFERENCE"
            title="Same business. A different feeling."
            text="Switch between a conventional hotel page and an expressive digital concept. See what considered design changes."
          />
          <div className="wide-comparison">
            <Comparison />
            <div className="design-notes">
              {[
                [
                  "Make the story tangible.",
                  "Atmosphere, composition and typography communicate a place before a word is read.",
                ],
                [
                  "Give every detail a role.",
                  "Navigation and interaction guide the journey without competing for attention.",
                ],
                [
                  "Turn interest into intent.",
                  "A focused next step connects the emotional experience to a practical action.",
                ],
              ].map(([t, d], i) => (
                <div key={t}>
                  <span>0{i + 1}</span>
                  <h3>{t}</h3>
                  <p>{d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="wrap section">
        <SectionHead
          label="WHAT WE BRING TO THE TABLE"
          title="Creative freedom. Technical precision."
        />
        <div className="feature-grid">
          {webFeatures.map((f) => (
            <Reveal className="feature" key={f.title}>
              <f.icon size={25} />
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="wrap section" id="web-concepts">
        <div className="section-title-row">
          <SectionHead
            label="EXPLORE THE POSSIBILITIES"
            title="Built to feel different."
            text="Original concepts, created to demonstrate the experience—not to claim client results."
          />
          <Button to="/work" secondary>
            All Concepts
          </Button>
        </div>
        <div className="web-work-grid">
          {[projects[0], projects[1], projects[3]].map((p) => (
            <Link
              key={p.name}
              to={`/work?project=${p.name}`}
              className="project-card"
            >
              <ProjectArt name={p.name} art={p.art} />
              <div className="project-info">
                <div>
                  <small>{p.industry} / CONCEPT</small>
                  <h3>{p.label}</h3>
                </div>
                <ArrowUpRight />
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className="wrap section">
        <SectionHead
          label="A CLEAR PATH FROM IDEA TO LAUNCH"
          title="Built together. Step by step."
        />
        <Process
          steps={[
            ["Discover", "Understand your brand, audience and goals."],
            ["Direct", "Define the visual world and customer journey."],
            [
              "Prototype",
              "Explore key pages and interactions before the build.",
            ],
            ["Develop", "Engineer, integrate and test across devices."],
            ["Launch", "Prepare the handover and agree the next chapter."],
          ]}
        />
      </section>
      <div className="wrap cross-service">
        <div>
          <small>WHAT HAPPENS AFTER THE CLICK?</small>
          <h3>Connect your website to a smarter operation.</h3>
        </div>
        <Button to="/services/automation" secondary>
          Explore AI Automation
        </Button>
      </div>
      <FAQ />
      <CTA />
    </div>
  );
}
const automationFeatures = [
  {
    icon: MessageSquare,
    title: "Conversations that move forward",
    text: "AI chat and voice assistants handle approved FAQs, capture context and route complex questions to your team.",
  },
  {
    icon: CalendarDays,
    title: "Less scheduling back-and-forth",
    text: "Qualification, appointment requests and reminders connect your customer journey to your calendar.",
  },
  {
    icon: Database,
    title: "A complete customer picture",
    text: "CRM synchronization and consistent data capture help keep follow-ups informed and organized.",
  },
  {
    icon: Headphones,
    title: "Missed calls. New possibilities.",
    text: "Consent-based SMS, WhatsApp and email workflows help turn a missed conversation into a useful next step.",
  },
  {
    icon: ArrowRight,
    title: "Follow-up with intention",
    text: "Review requests, reactivation sequences and helpful reminders are designed around relevant customer moments.",
  },
  {
    icon: ShieldCheck,
    title: "Your team stays in control",
    text: "Defined rules, review points, exception handling and ongoing monitoring keep responsibility clear.",
  },
];
function Automation() {
  return (
    <div className="automation-service">
      <ServiceSwitch />
      <section className="wrap automation-hero">
        <div>
          <Label>02 / THE INTELLIGENT OPERATIONS PARTNER</Label>
          <h1>
            More momentum.
            <br />
            <span>Less manual work.</span>
          </h1>
          <p>
            From the first inquiry to the next appointment, connect the tasks
            that slow your business down. Thoughtful automation. Clear human
            control.
          </p>
          <div className="hero-buttons">
            <Button to="/contact?service=AI%20Automation">
              Automate My Business
            </Button>
            <a className="button secondary" href="#automation-demo">
              Try the Demo <ArrowRight size={16} />
            </a>
          </div>
          <div className="service-note">
            <ShieldCheck size={15} /> Built around your process. Connected to
            your tools.
          </div>
        </div>
        <div className="operations-visual">
          <div className="operations-header">
            <span>
              <span className="status-dot" /> A CONNECTED CUSTOMER JOURNEY
            </span>
            <small>SIMULATION</small>
          </div>
          <div className="operation-source">
            <MessageSquare size={22} />
            <div>
              <small>INCOMING INQUIRY</small>
              <p>“Can I book an appointment?”</p>
            </div>
          </div>
          <div className="operation-connector">
            <i />
            <span>CAPTURE → UNDERSTAND → ACT</span>
            <i />
          </div>
          <div className="operation-core">
            <div className="engine-icon">
              <Zap size={30} />
            </div>
            <div>
              <h3>NEXUS Engine</h3>
              <p>The right action. At the right moment.</p>
            </div>
            <span className="engine-state">PROCESSING</span>
          </div>
          <div className="operation-branches">
            <div>
              <CalendarDays size={22} />
              <b>Appointment</b>
              <small>Request prepared</small>
            </div>
            <div>
              <Database size={22} />
              <b>Customer record</b>
              <small>Context preserved</small>
            </div>
            <div>
              <Check size={22} />
              <b>Your team</b>
              <small>Ready for the next step</small>
            </div>
          </div>
          <p className="disclaimer">
            Illustrative workflow. No live integrations are connected.
          </p>
        </div>
      </section>
      <div className="wrap service-principles">
        <span>Respond with context.</span>
        <span>Reduce repetitive work.</span>
        <span>Keep people in control.</span>
      </div>
      <section className="wrap section">
        <div className="automation-problem">
          <div>
            <Label>THE SPACE BETWEEN INTEREST AND ACTION</Label>
            <h2>
              Good leads shouldn’t
              <br />
              get lost in
              <br />
              <span className="service-accent">busy days.</span>
            </h2>
          </div>
          <div className="problem-rows">
            {[
              [
                "An inquiry arrives after hours.",
                "An assistant can collect the essentials and prepare the next step.",
              ],
              [
                "Your team repeats the same task.",
                "A defined workflow can keep routine work moving consistently.",
              ],
              [
                "Customer information lives everywhere.",
                "Connected records can give the next person the context they need.",
              ],
            ].map(([a, b]) => (
              <div key={a}>
                <h3>{a}</h3>
                <p>{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="automation-demo-section" id="automation-demo">
        <div className="wrap section">
          <SectionHead
            label="LOOK INSIDE THE SYSTEM"
            title="Every step has a reason."
            text="Play the customer journey or select a step to see its trigger, action and required data."
          />
          <Workflow />
        </div>
      </section>
      <section className="wrap section">
        <SectionHead
          label="EXPERIENCE THE CUSTOMER SIDE"
          title="A conversation with a clear next step."
          text="Try a scripted assistant for a dental practice, hotel or real estate agency. No API keys or personal details needed."
        />
        <AssistantDemo />
      </section>
      <section className="wrap section">
        <SectionHead
          label="WHAT WE CAN CONNECT"
          title="Small tasks. A bigger opportunity."
        />
        <div className="feature-grid">
          {automationFeatures.map((f) => (
            <Reveal className="feature" key={f.title}>
              <f.icon size={25} />
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </Reveal>
          ))}
        </div>
        <div className="integration-band">
          <span>Scoped around your stack</span>
          <b>CRM</b>
          <i>+</i>
          <b>Calendar</b>
          <i>+</i>
          <b>Email & SMS</b>
          <i>+</i>
          <b>WhatsApp</b>
          <span>Subject to provider access & permissions</span>
        </div>
      </section>
      <section className="wrap section">
        <SectionHead
          label="START WITH THE NUMBERS"
          title="Find the opportunity in your workflow."
          text="Model lead recovery and time savings using assumptions you can change."
        />
        <ROICalculator />
      </section>
      <Industries />
      <div className="wrap cross-service">
        <div>
          <small>GIVE YOUR SYSTEM A STRONGER FRONT DOOR</small>
          <h3>Pair intelligent operations with a memorable website.</h3>
        </div>
        <Button to="/services/web-design" secondary>
          Explore Web Design
        </Button>
      </div>
      <FAQ />
      <CTA />
    </div>
  );
}
function Process({ steps }: { steps: string[][] }) {
  return (
    <div className="process-list">
      {steps.map(([t, d], i) => (
        <Reveal className="process-step" key={t}>
          <span>0{i + 1}</span>
          <h3>{t}</h3>
          <p>{d}</p>
        </Reveal>
      ))}
    </div>
  );
}
function ProjectPreview({ project }: { project: (typeof projects)[number] }) {
  const options =
    project.name === "AURA"
      ? ["Garden room", "Terrace suite", "Entire retreat"]
      : project.name === "FORME"
        ? ["City apartment", "Garden residence", "Skyline penthouse"]
        : project.name === "APEX"
          ? ["Signature detail", "Paint correction", "Ceramic protection"]
          : ["Movement class", "Private session", "Restorative practice"];
  const [selected, setSelected] = useState(options[0]),
    [prepared, setPrepared] = useState(false);
  if (project.type === "AI Automation")
    return project.name === "LUMEN" ? <AssistantDemo /> : <Workflow />;
  return (
    <>
      <div className="preview-options" aria-label="Concept options">
        {options.map((o) => (
          <button
            key={o}
            aria-pressed={selected === o}
            onClick={() => {
              setSelected(o);
              setPrepared(false);
            }}
          >
            {o}
          </button>
        ))}
      </div>
      <div className="preview-result" aria-live="polite">
        <Label>EXPLORE THE CONCEPT</Label>
        <h3>{selected}</h3>
        <p>
          {project.name === "AURA"
            ? "A considered stay, with light-filled spaces and room to slow down."
            : project.name === "FORME"
              ? "Explore a distinctive space, then prepare a viewing request with your preferences."
              : project.name === "APEX"
                ? "A carefully scoped service journey, from initial interest to an informed consultation."
                : "An intentional session, shaped around the way you want to feel."}
        </p>
        <button className="button" onClick={() => setPrepared(true)}>
          {prepared ? "Demo Request Prepared" : "Prepare a Demo Request"}
          {prepared ? <Check size={15} /> : <ArrowRight size={15} />}
        </button>
        {prepared && (
          <p className="success-text">
            Your sample selection: {selected}. No real booking, viewing or
            service request was sent.
          </p>
        )}
      </div>
      {project.name === "STILL" && (
        <div className="detail-demo">
          <h3>The connected scheduling journey</h3>
          <p>Explore what could happen after a customer gets in touch.</p>
          <Workflow />
        </div>
      )}
    </>
  );
}
function Work() {
  const [params, setParams] = useSearchParams();
  const [filter, setFilter] = useState(params.get("filter") || "All Projects");
  const project = projects.find((p) => p.name === params.get("project"));
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [project]);
  if (project)
    return (
      <>
        <section className="wrap section project-detail">
          <Link to="/work" className="back-link">
            <ArrowLeft size={15} /> All concepts
          </Link>
          <div className="detail-heading">
            <div>
              <Label>{project.industry.toUpperCase()} / CONCEPT PROJECT</Label>
              <h1>{project.title}</h1>
              <p>{project.description}</p>
            </div>
            <span className="discipline-pill">{project.type}</span>
          </div>
          <div className="detail-visual">
            <ProjectArt art={project.art} name={project.name} />
          </div>
          <div className="detail-demo">
            <h2>
              {project.name === "LUMEN"
                ? "Try the appointment assistant"
                : project.name === "FIELD"
                  ? "Explore the lead follow-up workflow"
                  : "Make the next step your own."}
            </h2>
            <p>
              This is an original NEXUS concept, not a commissioned client
              project. Interactions use sample data and do not create real
              bookings or send messages.
            </p>
            <ProjectPreview key={project.name} project={project} />
          </div>
        </section>
        <CTA />
      </>
    );
  return (
    <>
      <PageHero
        label="THE CONCEPT COLLECTION"
        title={
          <>
            Ideas made interactive.
            <br />
            <span className="muted">Systems made intelligent.</span>
          </>
        }
        text="Six original explorations of better digital experiences. Choose a discipline, explore a concept and try the interaction."
      />
      <section className="wrap section">
        <div className="filter-tabs" aria-label="Filter projects">
          {[
            "All Projects",
            "3D Websites",
            "AI Automation",
            "Combined Solutions",
          ].map((f) => (
            <button
              key={f}
              aria-pressed={filter === f}
              onClick={() => {
                setFilter(f);
                setParams(f === "All Projects" ? {} : { filter: f });
              }}
            >
              {f}{" "}
              <span>
                {f === "All Projects"
                  ? 6
                  : projects.filter((p) => p.type === f).length}
              </span>
            </button>
          ))}
        </div>
        <div className="portfolio-grid">
          {projects
            .filter((p) => filter === "All Projects" || p.type === filter)
            .map((p) => (
              <Reveal key={p.name}>
                <Link className="project-card" to={`/work?project=${p.name}`}>
                  <ProjectArt art={p.art} name={p.name} />
                  <div className="project-info">
                    <div>
                      <span className="tiny">{p.industry} / CONCEPT</span>
                      <h3>{p.label}</h3>
                    </div>
                    <ArrowUpRight size={22} />
                  </div>
                  <p>{p.description}</p>
                </Link>
              </Reveal>
            ))}
        </div>
      </section>
      <CTA />
    </>
  );
}
const tiers = [
  {
    name: "Web Transformation",
    type: "ONE-TIME PROJECT",
    icon: Layers,
    copy: "A distinctive digital presence, from the first idea to a considered launch.",
    items: [
      "Discovery & creative direction",
      "Custom UX/UI design",
      "Responsive development",
      "Technical SEO foundations",
      "Testing & launch support",
    ],
    cta: "Discuss Your Website",
    service: "Web Design",
  },
  {
    name: "Automation Engine",
    type: "ONGOING SERVICE",
    icon: WorkflowIcon,
    copy: "Connected workflows that reduce repetitive work and support your team.",
    items: [
      "Workflow discovery & mapping",
      "Automation setup",
      "Scoped tool integrations",
      "Monitoring & exception handling",
      "Ongoing optimization",
    ],
    cta: "Automate My Business",
    service: "AI Automation",
  },
  {
    name: "Complete Growth Suite",
    type: "PROJECT + ONGOING PARTNERSHIP",
    icon: Zap,
    copy: "A memorable front door. A smarter operation. One connected customer journey.",
    items: [
      "Both core service offerings",
      "Integrated lead capture",
      "CRM & scheduling workflows",
      "Measurement & analytics setup",
      "Continuous optimization",
    ],
    cta: "Build My Growth System",
    service: "Complete Growth Suite",
  },
];
function Pricing() {
  return (
    <>
      <PageHero
        label="ENGAGEMENT MODELS"
        title={
          <>
            Flexible partnerships.
            <br />
            <span className="muted">Serious digital ambition.</span>
          </>
        }
        text="Choose the kind of change your business needs. We scope the right solution together, with clear deliverables and a custom proposal."
      />
      <section className="wrap section">
        <div className="pricing-grid">
          {tiers.map((t, i) => (
            <Reveal
              key={t.name}
              className={`price-card ${i === 2 ? "featured" : ""}`}
            >
              {i === 2 && (
                <span className="price-badge">MOST COMPREHENSIVE</span>
              )}
              <t.icon size={26} />
              <h3>{t.name}</h3>
              <p>{t.copy}</p>
              <div className="quote">Custom Quote</div>
              <span className="tiny">{t.type}</span>
              <ul className="check-list">
                {t.items.map((s) => (
                  <li key={s}>
                    <Check size={15} />
                    {s}
                  </li>
                ))}
              </ul>
              <Button
                secondary={i !== 2}
                to={`/contact?service=${encodeURIComponent(t.service)}`}
              >
                {t.cta}
              </Button>
            </Reveal>
          ))}
        </div>
        <div className="table-scroll">
          <table>
            <caption className="sr-only">
              Compare NEXUS engagement models
            </caption>
            <thead>
              <tr>
                <th>Included in the partnership</th>
                <th>Web Transformation</th>
                <th>Automation Engine</th>
                <th>Complete Growth Suite</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Strategy & discovery", "Included", "Included", "Included"],
                ["Custom website design", "Included", "—", "Included"],
                [
                  "Workflow automation",
                  "Scoped separately",
                  "Included",
                  "Included",
                ],
                [
                  "Tool integrations",
                  "Website scope",
                  "Automation scope",
                  "Combined scope",
                ],
                ["Ongoing optimization", "Optional", "Included", "Included"],
                [
                  "Hosting & provider costs",
                  "Scoped in proposal",
                  "Scoped in proposal",
                  "Scoped in proposal",
                ],
              ].map((row) => (
                <tr key={row[0]}>
                  {row.map((cell, i) => (
                    <td key={i}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="disclaimer">
          Third-party subscriptions, usage charges, support terms and ownership
          arrangements are defined in your proposal.
        </p>
      </section>
      <FAQ />
      <CTA />
    </>
  );
}
function About() {
  return (
    <>
      <PageHero
        label="A CREATIVE & TECHNICAL PARTNERSHIP"
        title={
          <>
            Better experiences.
            <br />
            Smarter systems.
            <br />
            <span className="accent">Stronger together.</span>
          </>
        }
        text="NEXUS brings creative web design, AI-assisted engineering and business process automation into one considered approach."
      />
      <section className="wrap section about-statement">
        <Label>OUR PHILOSOPHY</Label>
        <div>
          <h2>
            There shouldn’t be a gap between how good your business looks and
            how well it works.
          </h2>
          <p>
            A remarkable website earns attention. A useful system helps turn
            that attention into a better customer experience. We believe the
            best digital work connects both.
          </p>
          <p>
            That means starting with your business, asking useful questions and
            choosing technology with purpose. It means being ambitious about the
            experience and honest about what it takes to build it.
          </p>
        </div>
      </section>
      <section className="wrap section">
        <div className="feature-grid">
          {[
            [
              "Clarity before complexity",
              "We find the right problem before choosing the tool. Every feature should earn its place.",
            ],
            [
              "Craft with a purpose",
              "Visual detail and interaction should help people understand, explore and take action.",
            ],
            [
              "People in the loop",
              "We design systems with clear ownership, useful handoffs and thoughtful human review.",
            ],
          ].map(([t, d], i) => (
            <Reveal className="feature" key={t}>
              <small>0{i + 1} / OUR PRINCIPLES</small>
              <h3>{t}</h3>
              <p>{d}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="wrap section">
        <SectionHead
          label="HOW WE WORK"
          title="A thoughtful process. A shared direction."
          text="From the first conversation to the next improvement, you know what we’re building and why."
        />
        <Process
          steps={[
            [
              "Discover & define",
              "Map your audience, processes and goals. Agree priorities, scope and success measures.",
            ],
            [
              "Design & prototype",
              "Create the visual direction and test key journeys before development.",
            ],
            [
              "Build & connect",
              "Develop the experience and integrate the agreed systems, with clear boundaries.",
            ],
            [
              "Test & launch",
              "Check devices, interactions and failure states. Document the handover.",
            ],
            [
              "Learn & improve",
              "Use feedback and agreed measurement to guide the next iteration.",
            ],
          ]}
        />
      </section>
      <CTA />
    </>
  );
}
function ROIPage() {
  return (
    <>
      <PageHero
        label="THE AUTOMATION OPPORTUNITY CALCULATOR"
        title={
          <>
            What could slow
            <br />
            follow-ups be <span className="accent">costing you?</span>
          </>
        }
        text="Turn assumptions into a useful conversation. Adjust your numbers to explore recovered-lead revenue and administrative hours saved."
      />
      <section className="wrap section">
        <ROICalculator />
      </section>
      <section className="wrap section">
        <div className="feature-grid">
          {[
            [
              "Start with real inputs",
              "Use your own lead volume, customer value and conversion data wherever possible.",
            ],
            [
              "Challenge the assumptions",
              "Recovery and time-saving rates depend on the process, implementation and team adoption. Try a conservative scenario too.",
            ],
            [
              "Consider the full picture",
              "These estimates exclude implementation costs, subscriptions, delivery costs and profit margins. Discovery helps assess whether an investment makes sense.",
            ],
          ].map(([t, d], i) => (
            <div className="feature" key={t}>
              <small>0{i + 1} / READ YOUR RESULTS</small>
              <h3>{t}</h3>
              <p>{d}</p>
            </div>
          ))}
        </div>
      </section>
      <CTA />
    </>
  );
}
function NotFound() {
  return (
    <section className="wrap not-found">
      <Label>404 / A DIFFERENT DIRECTION</Label>
      <h1>
        Let’s get you
        <br />
        back on track.
      </h1>
      <p>That page isn’t part of this experience.</p>
      <Button to="/">Return to NEXUS</Button>
    </section>
  );
}
export default function Pages() {
  return (
    <Routes>
      <Route path="/services/web-design" element={<WebDesign />} />
      <Route path="/services/automation" element={<Automation />} />
      <Route path="/work" element={<Work />} />
      <Route path="/roi-calculator" element={<ROIPage />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/privacy" element={<Legal privacy />} />
      <Route path="/terms" element={<Legal />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

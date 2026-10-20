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
  Reply,
} from "lucide-react";
import {
  Button,
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
  title,
  text,
  children,
}: {
  title: ReactNode;
  text: string;
  children?: ReactNode;
}) {
  return (
    <section className="wrap page-hero">
      <h1>{title}</h1>
      <p>{text}</p>
      {children}
    </section>
  );
}
function ServiceSwitch() {
  return (
    <nav className="wrap service-switch" aria-label="Services">
      <Link to="/services/web-design">
        <span className="service-dot" /> Web design
      </Link>
      <span aria-hidden="true">/</span>
      <Link to="/services/automation">
        <span className="service-dot" /> Automation
      </Link>
    </nav>
  );
}
const webFeatures = [
  {
    icon: Layers,
    title: "Designed for your business",
    text: "A look and a story that fit you, not a template with your logo swapped in.",
  },
  {
    icon: MousePointer2,
    title: "One obvious next step",
    text: "Every page leads to the action you want: a call, a booking or an inquiry.",
  },
  {
    icon: Smartphone,
    title: "Built for phones first",
    text: "Most of your visitors are on a phone. The site is designed there, then scaled up.",
  },
  {
    icon: Globe,
    title: "Fast and findable",
    text: "Quick to load, with clean page titles and descriptions so search engines understand it.",
  },
  {
    icon: BarChart3,
    title: "Connected to your tools",
    text: "Forms, booking and analytics wired to the systems you already use.",
  },
  {
    icon: ShieldCheck,
    title: "Yours to keep",
    text: "Ownership, hosting and handover are agreed in writing before work starts.",
  },
];
function WebDesign() {
  return (
    <div className="web-service">
      <ServiceSwitch />
      <section className="wrap studio-hero">
        <div className="studio-heading">
          <h1>
            Websites that turn visits <span>into inquiries.</span>
          </h1>
          <p>
            Custom sites for service businesses: clear about what you do,
            quick on a phone, and built around one next step.
          </p>
          <div className="hero-buttons">
            <Button to="/contact?service=Web%20Design">Get in touch</Button>
            <a className="button secondary" href="#web-concepts">
              See the concepts
            </a>
          </div>
        </div>
        <div className="studio-composition" aria-hidden="true">
          <div className="studio-browser">
            <div className="browser-chrome">
              <i />
              <i />
              <i />
              <span>aura-hotel.example</span>
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
            <small>Reserve a stay</small>
          </div>
        </div>
      </section>
      <section className="studio-showcase">
        <div className="wrap section">
          <SectionHead
            title="Same hotel. A different first impression."
            text="Switch between a typical hotel page and a redesigned one. The facts are the same; what changes is whether you want to stay."
          />
          <div className="wide-comparison">
            <Comparison />
            <div className="design-notes">
              {[
                [
                  "Show, then tell.",
                  "Imagery and layout set the mood before anyone reads a word.",
                ],
                [
                  "Less, but clearer.",
                  "Navigation and copy guide the visitor instead of competing for attention.",
                ],
                [
                  "One next step.",
                  "Every page ends in a single, obvious action: here, reserving a stay.",
                ],
              ].map(([t, d]) => (
                <div key={t}>
                  <h3>{t}</h3>
                  <p>{d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="wrap section">
        <SectionHead title="What every site includes." />
        <div className="feature-grid">
          {webFeatures.map((f) => (
            <div className="feature" key={f.title}>
              <f.icon size={22} aria-hidden="true" />
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="wrap section" id="web-concepts">
        <div className="section-title-row">
          <SectionHead
            title="Concept sites"
            text="Original concepts that show the approach. They aren’t client projects."
          />
          <Link className="inline-link" to="/work">
            All concepts <ArrowRight size={16} aria-hidden="true" />
          </Link>
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
                <h3>{p.label}</h3>
                <span>{p.industry}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className="wrap section">
        <SectionHead
          title="How a project runs."
          text="You see the direction before anything is built, and you know what’s next at every step."
        />
        <Process
          steps={[
            ["Discover", "We learn your business, customers and goals."],
            ["Direct", "We agree the look, the pages and the main journey."],
            ["Prototype", "You click through key pages before the build."],
            ["Build", "We develop, connect your tools and test on real devices."],
            ["Launch", "We go live, hand over and agree what comes next."],
          ]}
        />
      </section>
      <div className="wrap cross-service">
        <div>
          <small>After someone gets in touch</small>
          <h3>Make sure every inquiry gets a fast reply.</h3>
        </div>
        <Button to="/services/automation" secondary>
          See automation
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
    title: "Website and chat assistants",
    text: "Answer common questions, collect the details your team needs, and hand anything complex to a person.",
  },
  {
    icon: CalendarDays,
    title: "Booking without the back-and-forth",
    text: "Offer real open times from your calendar, then confirm and send reminders.",
  },
  {
    icon: Database,
    title: "CRM that keeps itself up to date",
    text: "Every inquiry lands in your CRM with its history, so nobody starts from zero.",
  },
  {
    icon: Headphones,
    title: "Missed-call follow-up",
    text: "A missed call gets a text or email with a way to book, with the customer’s consent.",
  },
  {
    icon: Reply,
    title: "Follow-ups that go out on time",
    text: "Quote reminders, review requests and check-ins sent when they’re useful.",
  },
  {
    icon: ShieldCheck,
    title: "Your team stays in control",
    text: "Clear rules, review points and alerts when something needs a human.",
  },
];
function Automation() {
  return (
    <div className="automation-service">
      <ServiceSwitch />
      <section className="wrap automation-hero">
        <div>
          <h1>
            Every inquiry answered, <span>even after hours.</span>
          </h1>
          <p>
            We connect your website, inbox, calendar and CRM so inquiries get
            a reply, the right questions and a booking. Your team approves
            what matters.
          </p>
          <div className="hero-buttons">
            <Button to="/contact?service=AI%20Automation">Get in touch</Button>
            <a className="button secondary" href="#automation-demo">
              Try the demo
            </a>
          </div>
        </div>
        <div className="operations-visual" aria-hidden="true">
          <div className="operations-header">
            <span>One inquiry, handled</span>
            <small>Sample</small>
          </div>
          <div className="operation-source">
            <MessageSquare size={20} />
            <div>
              <small>New inquiry, 22:14</small>
              <p>“Can I book an appointment this week?”</p>
            </div>
          </div>
          <div className="operation-connector">
            <i />
            <span>reply · qualify · book</span>
            <i />
          </div>
          <div className="operation-core">
            <div className="engine-icon">
              <Zap />
            </div>
            <div>
              <h3>Your automation</h3>
              <p>Replies in minutes, using your rules and your calendar.</p>
            </div>
          </div>
          <div className="operation-branches">
            <div>
              <CalendarDays size={20} />
              <b>Booked</b>
              <small>Thursday 10:30</small>
            </div>
            <div>
              <Database size={20} />
              <b>In your CRM</b>
              <small>With full history</small>
            </div>
            <div>
              <Check size={20} />
              <b>Team notified</b>
              <small>Ready for the morning</small>
            </div>
          </div>
        </div>
      </section>
      <section className="wrap section">
        <div className="automation-problem">
          <h2>
            Where good leads <span>get lost.</span>
          </h2>
          <div className="problem-rows">
            {[
              [
                "An inquiry arrives after hours.",
                "By the time someone replies in the morning, the customer has booked elsewhere.",
              ],
              [
                "Your team repeats the same answers.",
                "Prices, availability, directions: hours a week spent on questions with known answers.",
              ],
              [
                "Details live in five places.",
                "Inbox, phone, notes, spreadsheet. The next person to call the customer has no context.",
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
            title="Follow one inquiry through the system."
            text="Press play, or pick a step to see what triggers it and what it needs."
          />
          <Workflow />
        </div>
      </section>
      <section className="wrap section">
        <SectionHead
          title="Now try it as the customer."
          text="A scripted assistant for a dental practice, a hotel or an estate agent. No sign-up, no personal details."
        />
        <AssistantDemo />
      </section>
      <section className="wrap section">
        <SectionHead title="What we can automate." />
        <div className="feature-grid">
          {automationFeatures.map((f) => (
            <div className="feature" key={f.title}>
              <f.icon size={22} aria-hidden="true" />
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </div>
          ))}
        </div>
        <div className="integration-band">
          <span>Works with your</span>
          <b>CRM</b>
          <i>+</i>
          <b>Calendar</b>
          <i>+</i>
          <b>Email and SMS</b>
          <i>+</i>
          <b>WhatsApp</b>
          <span>Depends on each provider’s access and permissions</span>
        </div>
      </section>
      <section className="wrap section">
        <SectionHead
          title="Check the numbers for your business."
          text="Change any input. The result is an estimate, not a promise."
        />
        <ROICalculator />
      </section>
      <div className="wrap cross-service">
        <div>
          <small>Before someone gets in touch</small>
          <h3>Give them a website that makes them want to.</h3>
        </div>
        <Button to="/services/web-design" secondary>
          See web design
        </Button>
      </div>
      <FAQ />
      <CTA />
    </div>
  );
}
function Process({ steps }: { steps: string[][] }) {
  return (
    <ol className="process-list">
      {steps.map(([t, d], i) => (
        <li className="process-step" key={t}>
          <span>{String(i + 1).padStart(2, "0")}</span>
          <h3>{t}</h3>
          <p>{d}</p>
        </li>
      ))}
    </ol>
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

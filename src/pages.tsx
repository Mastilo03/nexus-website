import { useState, type ReactNode } from "react";
import {
  Link,
  Navigate,
  Routes,
  Route,
  useParams,
  useSearchParams,
} from "react-router-dom";
import {
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
  SectionHead,
  CTA,
  Comparison,
  Workflow,
  AssistantDemo,
  ROICalculator,
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
              to={`/work/${p.slug}`}
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
const previewCopy: Record<string, [string[], string]> = {
  AURA: [
    ["Garden room", "Terrace suite", "Entire retreat"],
    "Light-filled rooms and a reservation path that takes three taps.",
  ],
  FORME: [
    ["City apartment", "Garden residence", "Skyline penthouse"],
    "Explore the space, then request a viewing with your preferences attached.",
  ],
  APEX: [
    ["Signature detail", "Paint correction", "Ceramic protection"],
    "Pick a service, see what it includes, and book a consultation.",
  ],
  STILL: [
    ["Movement class", "Private session", "Restorative practice"],
    "Choose a session type and request a time that suits you.",
  ],
};
function ProjectPreview({ project }: { project: (typeof projects)[number] }) {
  const [options, text] = previewCopy[project.name] ?? previewCopy.STILL;
  const [selected, setSelected] = useState(options[0]),
    [prepared, setPrepared] = useState(false);
  if (project.type === "AI Automation")
    return project.name === "LUMEN" ? <AssistantDemo /> : <Workflow />;
  return (
    <>
      <div className="preview-options" role="group" aria-label="Options">
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
        <p>{text}</p>
        <button
          className="button"
          onClick={() => setPrepared(true)}
          disabled={prepared}
        >
          {prepared ? "Request ready" : "Send a sample request"}
          {prepared ? (
            <Check size={16} aria-hidden="true" />
          ) : (
            <ArrowRight size={16} aria-hidden="true" />
          )}
        </button>
        {prepared && (
          <p className="success-text">
            Sample request for “{selected}” ready. Nothing was actually sent.
          </p>
        )}
      </div>
      {project.name === "STILL" && (
        <div className="detail-demo">
          <h3>What happens after they book</h3>
          <p>The same request, followed through scheduling and follow-up.</p>
          <Workflow />
        </div>
      )}
    </>
  );
}
function ProjectDetail() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);
  if (!project) return <NotFound />;
  return (
    <>
      <section className="wrap section project-detail">
        <Link to="/work" className="back-link">
          <ArrowLeft size={16} aria-hidden="true" /> All concepts
        </Link>
        <div className="detail-heading">
          <div>
            <h1>{project.title}</h1>
            <p>{project.description}</p>
          </div>
          <span className="discipline-pill">
            {project.industry} · {project.type}
          </span>
        </div>
        <div className="detail-visual">
          <ProjectArt art={project.art} name={project.name} />
        </div>
        <div className="detail-demo">
          <h2>
            {project.name === "LUMEN"
              ? "Try the appointment assistant."
              : project.name === "FIELD"
                ? "Follow a missed call to a booked job."
                : "Try the main journey."}
          </h2>
          <p>
            {project.name} is an original concept, not a client project. The
            demo uses sample data and never sends or books anything.
          </p>
          <ProjectPreview key={project.slug} project={project} />
        </div>
      </section>
      <CTA />
    </>
  );
}
const filters = ["All", "3D Websites", "AI Automation", "Combined Solutions"];
const filterLabels: Record<string, string> = {
  All: "All",
  "3D Websites": "Websites",
  "AI Automation": "Automation",
  "Combined Solutions": "Both",
};
function Work() {
  const [params, setParams] = useSearchParams();
  const legacy = projects.find((p) => p.name === params.get("project"));
  if (legacy) return <Navigate to={`/work/${legacy.slug}`} replace />;
  const filter = filters.includes(params.get("filter") ?? "")
    ? params.get("filter")!
    : "All";
  return (
    <>
      <PageHero
        title="Concept projects"
        text="Six original concepts, each with a working demo. They show how we approach a brief; none of them are client work."
      />
      <section className="wrap section work-section">
        <div className="filter-tabs" role="group" aria-label="Filter projects">
          {filters.map((f) => (
            <button
              key={f}
              aria-pressed={filter === f}
              onClick={() => setParams(f === "All" ? {} : { filter: f })}
            >
              {filterLabels[f]}
              <span>
                {f === "All"
                  ? projects.length
                  : projects.filter((p) => p.type === f).length}
              </span>
            </button>
          ))}
        </div>
        <div className="portfolio-grid">
          {projects
            .filter((p) => filter === "All" || p.type === filter)
            .map((p) => (
              <Link
                className="project-card"
                to={`/work/${p.slug}`}
                key={p.slug}
              >
                <ProjectArt art={p.art} name={p.name} />
                <div className="project-info">
                  <h3>{p.label}</h3>
                  <span>{p.industry}</span>
                </div>
                <p>{p.description}</p>
              </Link>
            ))}
        </div>
      </section>
      <CTA />
    </>
  );
}
const tiers = [
  {
    name: "Website",
    type: "One-time project",
    icon: Layers,
    copy: "A custom site, from first conversation to launch.",
    items: [
      "Discovery and direction",
      "Custom design for every page",
      "Mobile-first development",
      "Search basics: titles, speed, structure",
      "Testing and launch support",
    ],
    service: "Web Design",
  },
  {
    name: "Automation",
    type: "Setup, then monthly",
    icon: WorkflowIcon,
    copy: "Workflows that answer, qualify and book, maintained over time.",
    items: [
      "Map how inquiries flow today",
      "Build and connect the automation",
      "Integrations with your tools",
      "Monitoring and fixes",
      "Ongoing improvements",
    ],
    service: "AI Automation",
  },
  {
    name: "Website + automation",
    type: "Project, then monthly",
    icon: Zap,
    copy: "Both, designed together as one customer journey.",
    items: [
      "Everything in both",
      "Inquiry forms wired to the automation",
      "CRM and booking set up end to end",
      "Analytics on what converts",
      "Ongoing improvements",
    ],
    service: "Complete Growth Suite",
  },
];
function Pricing() {
  return (
    <>
      <PageHero
        title="Pricing"
        text="Every business is different, so every project is quoted after a short call. Here’s what each option includes."
      />
      <section className="wrap section pricing-section">
        <div className="pricing-grid">
          {tiers.map((t, i) => (
            <div
              key={t.name}
              className={`price-card ${i === 2 ? "featured" : ""}`}
            >
              {i === 2 && <span className="price-badge">Best value</span>}
              <t.icon size={22} aria-hidden="true" />
              <h3>{t.name}</h3>
              <p>{t.copy}</p>
              <div className="quote">Custom quote</div>
              <span className="tiny">{t.type}</span>
              <ul className="check-list">
                {t.items.map((s) => (
                  <li key={s}>
                    <Check size={16} aria-hidden="true" />
                    {s}
                  </li>
                ))}
              </ul>
              <Button
                secondary={i !== 2}
                to={`/contact?service=${encodeURIComponent(t.service)}`}
              >
                Get a quote
              </Button>
            </div>
          ))}
        </div>
        <p className="disclaimer pricing-note">
          Third-party costs (hosting, AI usage, SMS, subscriptions), support
          terms and ownership are set out in your proposal before any work
          starts.
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
        title="A good-looking website is only half the job."
        text="NEXUS designs websites and builds the automation behind them, so the people your site brings in actually get looked after."
      />
      <section className="wrap section about-statement">
        <h2>Why both?</h2>
        <p>
          A great website gets attention. But if an inquiry then waits until
          tomorrow for a reply, that attention is wasted. Most agencies do one
          side or the other; we design them together.
        </p>
        <p>
          We start with how your business actually works, ask a lot of
          questions, and only then choose the tools. We’re ambitious about
          the result and honest about what it takes.
        </p>
      </section>
      <section className="wrap section">
        <SectionHead title="How we work." />
        <div className="feature-grid">
          {[
            [
              "The problem before the tool",
              "We find out where leads and time are lost before suggesting anything to build.",
            ],
            [
              "Design with a job to do",
              "Every visual choice should help someone understand, decide or act.",
            ],
            [
              "People stay in the loop",
              "Automation handles the routine. Decisions that need judgment go to your team.",
            ],
          ].map(([t, d]) => (
            <div className="feature" key={t}>
              <h3>{t}</h3>
              <p>{d}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="wrap section">
        <SectionHead
          title="From first call to launch."
          text="You know what we’re building, why, and what comes next."
        />
        <Process
          steps={[
            [
              "Discover",
              "Map your customers, processes and goals. Agree scope and how we’ll measure success.",
            ],
            [
              "Design",
              "Set the visual direction and test the key journeys before building.",
            ],
            [
              "Build",
              "Develop the site and connect the agreed tools, with clear boundaries.",
            ],
            [
              "Test and launch",
              "Check every device and failure case, then hand over with documentation.",
            ],
            [
              "Improve",
              "Use real results to decide what to change next.",
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
        title="What are slow replies costing you?"
        text="Enter your own numbers to estimate the revenue you could win back and the admin time you could save."
      />
      <section className="wrap section roi-section">
        <ROICalculator />
      </section>
      <section className="wrap section">
        <SectionHead title="Reading the result." />
        <div className="feature-grid">
          {[
            [
              "Use your real numbers",
              "Your actual inquiry volume, customer value and conversion rate give the most useful estimate.",
            ],
            [
              "Try a cautious version",
              "Win-back and time-saving rates depend on your process and your team. Run a conservative scenario too.",
            ],
            [
              "It’s not profit",
              "The estimate leaves out what the work costs, subscriptions and margins. A first call helps decide if it’s worth it.",
            ],
          ].map(([t, d]) => (
            <div className="feature" key={t}>
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
export function NotFound() {
  return (
    <section className="wrap not-found">
      <h1>This page doesn’t exist.</h1>
      <p>The link may be old, or the address mistyped.</p>
      <Button to="/">Back to the homepage</Button>
    </section>
  );
}
export default function Pages() {
  return (
    <Routes>
      <Route path="/services/web-design" element={<WebDesign />} />
      <Route path="/services/automation" element={<Automation />} />
      <Route path="/work" element={<Work />} />
      <Route path="/work/:slug" element={<ProjectDetail />} />
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

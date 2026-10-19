import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  ArrowRight,
  Play,
  RotateCcw,
  Check,
  Send,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import { industries, industryDetails, workflow, faqs } from "./data";
import { calculateROI, defaultInputs, limits } from "./roi.mjs";
export function Button({
  children,
  to = "/contact",
  secondary = false,
  className = "",
}: {
  children: ReactNode;
  to?: string;
  secondary?: boolean;
  className?: string;
}) {
  return (
    <Link
      className={`button ${secondary ? "secondary" : ""} ${className}`}
      to={to}
    >
      {children}
      <ArrowUpRight size={17} />
    </Link>
  );
}
export function Label({ children }: { children: ReactNode }) {
  return (
    <div className="eyebrow">
      <span />
      {children}
    </div>
  );
}
export function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -30px 0px" }}
      transition={{ duration: 0.55 }}
    >
      {children}
    </motion.div>
  );
}
export function SectionHead({
  label,
  title,
  text,
}: {
  label: string;
  title: string;
  text?: string;
}) {
  return (
    <Reveal className="section-head">
      <Label>{label}</Label>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </Reveal>
  );
}
export function CTA() {
  return (
    <section className="wrap cta">
      <div>
        <Label>THE NEXT CHAPTER</Label>
        <h2>
          Good ideas deserve
          <br />
          an <span className="accent">unfair advantage.</span>
        </h2>
        <p>Let's turn your digital ambition into a system that works.</p>
      </div>
      <Button>Book a Free Strategy Call</Button>
    </section>
  );
}
export function Comparison() {
  const [after, setAfter] = useState(true);
  return (
    <div className="comparison">
      <div className="demo-toolbar">
        <span className="tiny">CONCEPT DEMONSTRATION</span>
        <div className="segmented" aria-label="Website comparison">
          <button aria-pressed={!after} onClick={() => setAfter(false)}>
            Before
          </button>
          <button aria-pressed={after} onClick={() => setAfter(true)}>
            After <Sparkles size={12} />
          </button>
        </div>
      </div>
      <div className={`compare-scene ${after ? "premium" : "basic"}`}>
        <div className="mini-nav">
          <b>{after ? "A U R A" : "Aura Hotel"}</b>
          <span>Stay · Discover · Reserve</span>
        </div>
        <div className="arch arch-one" />
        <div className="arch arch-two" />
        <div className="compare-copy">
          <small>
            {after ? "A PLACE TO DISCONNECT" : "WELCOME TO OUR WEBSITE"}
          </small>
          <h3>
            {after ? (
              <>
                Some places
                <br />
                stay with you.
              </>
            ) : (
              "A comfortable hotel for your holiday."
            )}
          </h3>
          <p>
            {after
              ? "An intimate retreat. An extraordinary feeling."
              : "We offer rooms, breakfast, and a swimming pool."}
          </p>
          <Link to="/work?project=AURA">
            {after ? "Discover the escape" : "View our rooms"}{" "}
            <ArrowUpRight size={14} />
          </Link>
        </div>
        <span className="scene-caption">
          {after ? "01 / THE ART OF SLOW LIVING" : "Hotel website concept"}
        </span>
      </div>
      <div className="compare-bottom">
        <span>
          {after
            ? "Narrative. Atmosphere. Intent."
            : "Information without a distinctive experience."}
        </span>
        <span className="tiny">
          {after ? "NEXUS APPROACH" : "CONVENTIONAL APPROACH"}
        </span>
      </div>
    </div>
  );
}
export function Workflow() {
  const [active, setActive] = useState(0),
    [playing, setPlaying] = useState(false);
  useEffect(() => {
    if (!playing) return;
    const t = setInterval(
      () =>
        setActive((a) => {
          if (a === 4) {
            setPlaying(false);
            return a;
          }
          return a + 1;
        }),
      1400,
    );
    return () => clearInterval(t);
  }, [playing]);
  const step = workflow[active];
  return (
    <div className="workflow-panel">
      <div className="demo-toolbar">
        <span className="tiny">
          <span className="status-dot" /> INTERACTIVE WORKFLOW · SIMULATION
        </span>
        <button
          className="text-button"
          onClick={() => {
            setActive(0);
            setPlaying((p) => !p);
          }}
        >
          {playing ? <RotateCcw size={14} /> : <Play size={14} />}{" "}
          {playing ? "Stop" : "Play simulation"}
        </button>
      </div>
      <div className="workflow-nodes">
        {workflow.map((s, i) => (
          <button
            key={s.name}
            className={`workflow-node ${i === active ? "active" : ""} ${i < active ? "complete" : ""}`}
            onClick={() => {
              setPlaying(false);
              setActive(i);
            }}
            aria-pressed={i === active}
          >
            <span>{i < active ? <Check size={20} /> : s.icon}</span>
            <b>{s.name}</b>
          </button>
        ))}
      </div>
      <div className="workflow-detail" aria-live="polite">
        <div>
          <small>STEP {step.icon}</small>
          <h3>{step.name}</h3>
          <p>{step.benefit}</p>
        </div>
        <dl>
          <dt>Trigger</dt>
          <dd>{step.trigger}</dd>
          <dt>Action</dt>
          <dd>{step.action}</dd>
          <dt>Required data</dt>
          <dd>{step.data}</dd>
        </dl>
      </div>
      <p className="disclaimer">
        Illustrative workflow. No messages are sent, appointments booked or CRM
        records created.
      </p>
    </div>
  );
}
const demoFlows = [
  {
    name: "Dental clinic",
    opening: "Hi, I’d like an appointment this Friday.",
    reply: "Of course. What would you like to book?",
    choices: ["Routine check-up", "Hygiene appointment", "Discuss a treatment"],
    next: "Thanks. Do you prefer a morning or afternoon appointment?",
  },
  {
    name: "Boutique hotel",
    opening: "Hello, I’m planning a weekend away.",
    reply: "I can help prepare your stay request. What are you looking for?",
    choices: ["A quiet weekend for two", "A family stay", "A solo retreat"],
    next: "Lovely. Would you prefer a garden room or a suite?",
  },
  {
    name: "Real estate",
    opening: "Hi, I’d like to arrange a property viewing.",
    reply: "Happy to help. What kind of home are you interested in?",
    choices: ["City apartment", "Family home", "Investment property"],
    next: "Great. Would a weekday or weekend viewing suit you?",
  },
];
export function AssistantDemo() {
  const [industry, setIndustry] = useState(0),
    [step, setStep] = useState(0),
    [answers, setAnswers] = useState<string[]>([]);
  const flow = demoFlows[industry];
  const next = (answer: string) => {
    setAnswers((a) => [...a, answer]);
    setStep((s) => s + 1);
  };
  const options =
    step === 0
      ? flow.choices
      : step === 1
        ? industry === 0
          ? ["Morning", "Afternoon"]
          : industry === 1
            ? ["Garden room", "Suite"]
            : ["Weekday", "Weekend"]
        : step === 2
          ? ["Use sample contact: Alex · alex@example.com"]
          : step === 3
            ? ["Prepare demo request"]
            : [];
  return (
    <div className="assistant-grid">
      <div className="chat-panel">
        <div className="demo-toolbar">
          <div>
            <b>
              <span className="status-dot" /> NEXUS Assistant
            </b>
            <small>Scripted demo · no live AI connection</small>
          </div>
          <button
            className="icon-button"
            aria-label="Restart conversation"
            onClick={() => {
              setStep(0);
              setAnswers([]);
            }}
          >
            <RotateCcw size={17} />
          </button>
        </div>
        <div className="industry-tabs">
          {demoFlows.map((f, i) => (
            <button
              key={f.name}
              aria-pressed={industry === i}
              onClick={() => {
                setIndustry(i);
                setStep(0);
                setAnswers([]);
              }}
            >
              {f.name}
            </button>
          ))}
        </div>
        <div className="chat-messages" aria-live="polite">
          <div className="bubble customer">{flow.opening}</div>
          <div className="bubble bot">{flow.reply}</div>
          {answers.map((a, i) => (
            <div key={i}>
              <div className="bubble customer">{a}</div>
              <div className="bubble bot">
                {i === 0
                  ? flow.next
                  : i === 1
                    ? "Let’s attach a sample contact to this demonstration. Please don’t enter personal or health information."
                    : i === 2
                      ? "Your preferences are ready. Shall I prepare the sample request?"
                      : "Demo request prepared. A connected system could send this to your team for review. No real appointment or reservation was created."}
              </div>
            </div>
          ))}
        </div>
        <div className="chat-options">
          {options.map((o) => (
            <button key={o} onClick={() => next(o)}>
              {o}
              <ArrowRight size={14} />
            </button>
          ))}
          {step === 4 && (
            <span className="success-text">
              <Check size={16} /> Simulation complete
            </span>
          )}
        </div>
      </div>
      <div className="chat-journey">
        <Label>BEHIND THE CONVERSATION</Label>
        <h3>
          A simple conversation.
          <br />A connected journey.
        </h3>
        {[
          "Inquiry received",
          "Intent identified",
          "Preferences collected",
          "Sample contact attached",
          "Request & CRM record simulated",
        ].map((s, i) => (
          <div className={`journey-step ${step >= i ? "done" : ""}`} key={s}>
            <span>
              {step >= i ? <Check size={15} /> : String(i + 1).padStart(2, "0")}
            </span>
            <p>{s}</p>
            {step === i && <small>CURRENT</small>}
          </div>
        ))}
        <p className="disclaimer">
          Choose a response to move through the workflow. This demonstration
          uses predefined responses and sample data.
        </p>
      </div>
    </div>
  );
}
const fields: [keyof typeof defaultInputs, string, string, number][] = [
  ["leads", "Monthly incoming leads", "", 10],
  ["value", "Average customer value", "€", 50],
  ["conversion", "Lead-to-customer conversion", "%", 1],
  ["missed", "Leads lost to slow responses", "%", 1],
  ["recovery", "Expected missed-lead recovery", "%", 5],
  ["hours", "Administrative hours / week", "h", 1],
  ["saving", "Administrative time saved", "%", 5],
];
const presets = [
  defaultInputs,
  {
    leads: 100,
    value: 250,
    conversion: 25,
    missed: 20,
    recovery: 40,
    hours: 20,
    saving: 50,
  },
  {
    leads: 80,
    value: 1200,
    conversion: 10,
    missed: 30,
    recovery: 40,
    hours: 12,
    saving: 50,
  },
];
function AnimatedNumber({
  value,
  currency = false,
}: {
  value: number;
  currency?: boolean;
}) {
  const reduced = useReducedMotion();
  const [shown, setShown] = useState(value);
  const prev = useRef(value);
  useEffect(() => {
    if (reduced) {
      setShown(value);
      return;
    }
    const from = prev.current;
    const start = performance.now();
    let id = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / 380);
      const n = from + (value - from) * (1 - (1 - p) ** 3);
      setShown(n);
      prev.current = n;
      if (p < 1) id = requestAnimationFrame(tick);
      else prev.current = value;
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [value, reduced]);
  return (
    <>
      {currency ? "€" : ""}
      {Math.round(shown).toLocaleString("en-GB")}
    </>
  );
}
export function ROICalculator() {
  const [input, setInput] = useState({ ...defaultInputs });
  const result = calculateROI(input);
  const query = new URLSearchParams(
    Object.entries(input).map(([k, v]) => [k, String(v)]),
  ).toString();
  return (
    <div className="roi-grid">
      <div className="roi-controls">
        <div className="demo-toolbar">
          <b>Your business. Your assumptions.</b>
          <span className="tiny">EDIT EVERY INPUT</span>
        </div>
        <div className="industry-tabs">
          {["Custom baseline", "Dental practice", "Boutique hotel"].map(
            (s, i) => (
              <button key={s} onClick={() => setInput({ ...presets[i] })}>
                {s}
              </button>
            ),
          )}
        </div>
        {fields.map(([key, label, unit, step]) => (
          <div className="range-field" key={key}>
            <label htmlFor={`range-${key}`}>{label}</label>
            <div className="range-number">
              <input
                aria-label={label + " exact value"}
                type="number"
                min={limits[key][0]}
                max={limits[key][1]}
                step={step}
                value={input[key]}
                onChange={(e) =>
                  setInput({ ...input, [key]: Number(e.target.value) })
                }
                onBlur={() =>
                  setInput({
                    ...input,
                    [key]: Math.min(
                      limits[key][1],
                      Math.max(limits[key][0], input[key]),
                    ),
                  })
                }
              />
              <span>{unit}</span>
            </div>
            <input
              id={`range-${key}`}
              type="range"
              min={limits[key][0]}
              max={limits[key][1]}
              step={step}
              value={input[key]}
              style={
                {
                  "--range": `${((input[key] - limits[key][0]) / (limits[key][1] - limits[key][0])) * 100}%`,
                } as React.CSSProperties
              }
              onChange={(e) =>
                setInput({ ...input, [key]: Number(e.target.value) })
              }
            />
          </div>
        ))}
      </div>
      <div className="roi-results" aria-live="polite" aria-atomic="true">
        <Label>THE OPPORTUNITY IN YOUR NUMBERS</Label>
        <p>Estimated monthly revenue opportunity</p>
        <div className="result-value">
          <AnimatedNumber value={result.monthly} currency />
        </div>
        <div
          className="mini-chart"
          role="img"
          aria-label={`Cumulative opportunity: ${Math.round(result.monthly)} euros at one month, ${Math.round(result.annual)} euros at twelve months.`}
        >
          {[1, 3, 6, 9, 12].map((n) => (
            <div key={n}>
              <span
                title={`€${Math.round(result.monthly * n).toLocaleString('en-GB')} cumulative opportunity after ${n} months`}
                style={{ height: `${result.monthly === 0 ? 0 : 12 + n * 8}px` }}
              />
              <small>{n} mo</small>
            </div>
          ))}
        </div>
        <div className="result-secondary">
          <div>
            <b>
              <AnimatedNumber value={result.annual} currency />
            </b>
            <span>Annual revenue opportunity</span>
          </div>
          <div>
            <b>
              {Number(result.weeklyHours.toFixed(1))}
              <small> hrs</small>
            </b>
            <span>Saved each week</span>
          </div>
          <div>
            <b>
              <AnimatedNumber value={result.annualHours} />
              <small> hrs</small>
            </b>
            <span>Saved each year</span>
          </div>
        </div>
        <Button to={`/contact?${query}`}>Let's Build Your Growth System</Button>
        <p className="disclaimer">
          Illustrative estimates, not guaranteed outcomes. Revenue is not
          profit; implementation costs are excluded. Presets are example
          assumptions, not industry benchmarks.
        </p>
        <details className="formula">
          <summary>
            How we calculate this <ChevronDown size={13} />
          </summary>
          <p>
            Monthly leads × missed-lead % × recovery % × conversion % × customer
            value. Annual revenue = monthly × 12. Weekly hours = admin hours ×
            time-saving %. Annual hours = weekly × 52.
          </p>
        </details>
      </div>
    </div>
  );
}
export function Industries() {
  const [selected, setSelected] = useState(0);
  const item = industryDetails[selected];
  return (
    <section className="wrap section">
      <SectionHead
        label="BUILT AROUND YOUR BUSINESS"
        title="Different industries. Shared ambition."
        text="The right experience starts with understanding how your business actually works."
      />
      <div className="industry-layout">
        <div className="industry-menu">
          {industries.map((s, i) => (
            <button
              key={s}
              onClick={() => setSelected(i)}
              aria-pressed={selected === i}
            >
              <span>0{i + 1}</span>
              {s}
              <ArrowUpRight size={17} />
            </button>
          ))}
        </div>
        <div className="industry-content">
          <span className="tiny">
            INTELLIGENT GROWTH / {industries[selected].toUpperCase()}
          </span>
          <h3>{item.challenge}</h3>
          <div className="two-cols">
            <div>
              <small>A SMARTER WORKFLOW</small>
              <p>{item.automation}</p>
            </div>
            <div>
              <small>A BETTER EXPERIENCE</small>
              <p>{item.web}</p>
            </div>
          </div>
          <div className="industry-journey">{item.journey}</div>
          {item.note && <p className="disclaimer">{item.note}</p>}
          <Link
            className="inline-link"
            to={`/contact?industry=${encodeURIComponent(industries[selected])}`}
          >
            Explore your possibilities <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
export function FAQ() {
  return (
    <section className="wrap section faq-section">
      <div>
        <Label>A LITTLE MORE CLARITY</Label>
        <h2>
          Good questions.
          <br />
          Straight answers.
        </h2>
        <p>Every partnership starts with a conversation.</p>
      </div>
      <div>
        {faqs.map(([q, a]) => (
          <details className="faq" key={q}>
            <summary>
              {q}
              <ChevronDown size={17} />
            </summary>
            <p>{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

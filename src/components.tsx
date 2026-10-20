import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  ArrowRight,
  Play,
  Square,
  Check,
  RotateCcw,
  ChevronDown,
} from "lucide-react";
import { industries, industryDetails, workflow, faqs } from "./data";
import { calculateROI, defaultInputs, limits } from "./roi.mjs";
export function useReducedMotion() {
  const query = "(prefers-reduced-motion: reduce)";
  const [reduced, setReduced] = useState(
    () => typeof window !== "undefined" && window.matchMedia(query).matches,
  );
  useEffect(() => {
    const media = window.matchMedia(query);
    const update = () => setReduced(media.matches);
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  return reduced;
}
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
      <ArrowRight size={16} aria-hidden="true" />
    </Link>
  );
}
export function SectionHead({
  title,
  text,
}: {
  title: string;
  text?: string;
}) {
  return (
    <div className="section-head">
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}
export function CTA() {
  return (
    <section className="wrap cta">
      <div>
        <h2>Tell us where leads slip through.</h2>
        <p>
          A short call about your website and your follow-up, and whether we
          can help. No obligation.
        </p>
      </div>
      <Button>Get in touch</Button>
    </section>
  );
}
export function Comparison() {
  const [after, setAfter] = useState(true);
  return (
    <div className="comparison">
      <div className="demo-toolbar">
        <span className="demo-title">Same hotel, two websites</span>
        <div className="segmented" role="group" aria-label="Website version">
          <button aria-pressed={!after} onClick={() => setAfter(false)}>
            Typical
          </button>
          <button aria-pressed={after} onClick={() => setAfter(true)}>
            Redesigned
          </button>
        </div>
      </div>
      <div
        className={`compare-scene ${after ? "premium" : "basic"}`}
        aria-live="polite"
      >
        <div className="mini-nav">
          <b>{after ? "A U R A" : "Aura Hotel"}</b>
          <span>Stay · Discover · Reserve</span>
        </div>
        <div className="arch arch-one" aria-hidden="true" />
        <div className="arch arch-two" aria-hidden="true" />
        <div className="compare-copy">
          <small>
            {after ? "A place to disconnect" : "Welcome to our website"}
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
          <Link to="/work/aura">
            {after ? "Discover the escape" : "View our rooms"}{" "}
            <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </div>
      <p className="compare-bottom">
        {after
          ? "One clear story, one clear next step: reserve."
          : "All the facts, nothing that makes you want to stay."}
      </p>
    </div>
  );
}
export function Workflow() {
  const [active, setActive] = useState(0),
    [playing, setPlaying] = useState(false);
  useEffect(() => {
    if (!playing) return;
    if (active === workflow.length - 1) {
      setPlaying(false);
      return;
    }
    const t = setTimeout(() => setActive((a) => a + 1), 1400);
    return () => clearTimeout(t);
  }, [playing, active]);
  const step = workflow[active];
  return (
    <div className="workflow-panel">
      <div className="demo-toolbar">
        <span className="demo-title">One inquiry, start to finish</span>
        <button
          className="text-button"
          onClick={() => {
            if (playing) {
              setPlaying(false);
              return;
            }
            if (active === workflow.length - 1) setActive(0);
            setPlaying(true);
          }}
        >
          {playing ? (
            <Square size={14} aria-hidden="true" />
          ) : (
            <Play size={14} aria-hidden="true" />
          )}
          {playing ? "Pause" : "Play"}
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
            <span aria-hidden="true">
              {i < active ? <Check size={16} /> : i + 1}
            </span>
            <b>{s.name}</b>
          </button>
        ))}
      </div>
      <div className="workflow-detail" aria-live="polite">
        <div>
          <h3>{step.name}</h3>
          <p>{step.benefit}</p>
        </div>
        <dl>
          <dt>When</dt>
          <dd>{step.trigger}</dd>
          <dt>What happens</dt>
          <dd>{step.action}</dd>
          <dt>What it needs</dt>
          <dd>{step.data}</dd>
        </dl>
      </div>
      <p className="disclaimer">
        A simulation. Nothing is sent, booked or saved.
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
const journeySteps = [
  "Inquiry received",
  "Need understood",
  "Preferences collected",
  "Contact details added",
  "Request ready for your team",
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
          ? ["Use sample contact: Alex, alex@example.com"]
          : step === 3
            ? ["Send the request"]
            : [];
  return (
    <div className="assistant-grid">
      <div className="chat-panel">
        <div className="demo-toolbar">
          <div className="chat-identity">
            <b>Website assistant</b>
            <small>Scripted demo, no live AI</small>
          </div>
          <button
            className="icon-button"
            aria-label="Restart conversation"
            onClick={() => {
              setStep(0);
              setAnswers([]);
            }}
          >
            <RotateCcw size={16} aria-hidden="true" />
          </button>
        </div>
        <div className="industry-tabs" role="group" aria-label="Business type">
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
            <div className="bubble-pair" key={i}>
              <div className="bubble customer">{a}</div>
              <div className="bubble bot">
                {i === 0
                  ? flow.next
                  : i === 1
                    ? "Who should we send the confirmation to? Please don’t share health or other sensitive details here."
                    : i === 2
                      ? "Thanks. Shall I send this request to the team?"
                      : "Done. The team has your request and will confirm shortly."}
              </div>
            </div>
          ))}
        </div>
        <div className="chat-options">
          {options.map((o) => (
            <button key={o} onClick={() => next(o)}>
              {o}
              <ArrowRight size={14} aria-hidden="true" />
            </button>
          ))}
          {step === 4 && (
            <span className="success-text">
              <Check size={16} aria-hidden="true" /> That’s the whole flow.
              Nothing was actually sent.
            </span>
          )}
        </div>
      </div>
      <div className="chat-journey">
        <h3>What your team sees</h3>
        <p>
          Each answer moves the inquiry forward. By the end, your team gets a
          complete request instead of a vague message.
        </p>
        <ol>
          {journeySteps.map((s, i) => (
            <li
              className={`journey-step ${step > i ? "done" : ""} ${step === i ? "current" : ""}`}
              key={s}
            >
              <span aria-hidden="true">
                {step > i ? <Check size={14} /> : i + 1}
              </span>
              {s}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
const fields: [keyof typeof defaultInputs, string, string, number][] = [
  ["leads", "Inquiries per month", "", 10],
  ["value", "Average customer value", "€", 50],
  ["conversion", "Inquiries that become customers", "%", 1],
  ["missed", "Inquiries lost to slow replies", "%", 1],
  ["recovery", "Lost inquiries you could win back", "%", 5],
  ["hours", "Admin hours per week", "h", 1],
  ["saving", "Admin time automation could save", "%", 5],
];
const presets: [string, typeof defaultInputs][] = [
  ["Default", defaultInputs],
  [
    "Dental practice",
    {
      leads: 100,
      value: 250,
      conversion: 25,
      missed: 20,
      recovery: 40,
      hours: 20,
      saving: 50,
    },
  ],
  [
    "Boutique hotel",
    {
      leads: 80,
      value: 1200,
      conversion: 10,
      missed: 30,
      recovery: 40,
      hours: 12,
      saving: 50,
    },
  ],
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
  const activePreset = presets.findIndex(([, p]) =>
    (Object.keys(p) as (keyof typeof p)[]).every((k) => p[k] === input[k]),
  );
  return (
    <div className="roi-grid">
      <div className="roi-controls">
        <div className="industry-tabs" role="group" aria-label="Example numbers">
          {presets.map(([name, p], i) => (
            <button
              key={name}
              aria-pressed={activePreset === i}
              onClick={() => setInput({ ...p })}
            >
              {name}
            </button>
          ))}
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
                  "--range": `${Math.min(100, Math.max(0, ((input[key] - limits[key][0]) / (limits[key][1] - limits[key][0])) * 100))}%`,
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
        <p>Revenue you could win back each month</p>
        <div className="result-value">
          <AnimatedNumber value={result.monthly} currency />
        </div>
        <div className="result-secondary">
          <div>
            <b>
              <AnimatedNumber value={result.annual} currency />
            </b>
            <span>per year</span>
          </div>
          <div>
            <b>
              {Number(result.weeklyHours.toFixed(1))}
              <small> h</small>
            </b>
            <span>admin saved per week</span>
          </div>
          <div>
            <b>
              <AnimatedNumber value={result.annualHours} />
              <small> h</small>
            </b>
            <span>admin saved per year</span>
          </div>
        </div>
        <Button to={`/contact?${query}`}>Discuss these numbers</Button>
        <p className="disclaimer">
          An estimate from your inputs, not a promise. It’s revenue, not
          profit, and doesn’t include what the work costs. The presets are
          examples, not industry benchmarks.
        </p>
        <details className="formula">
          <summary>
            How it’s calculated <ChevronDown size={14} aria-hidden="true" />
          </summary>
          <p>
            Inquiries × lost % × won back % × conversion % × customer value =
            monthly. Yearly = monthly × 12. Weekly hours = admin hours × saved
            %. Yearly hours = weekly × 52.
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
        title="Built around how your business works."
        text="Pick your industry to see what we’d look at first."
      />
      <div className="industry-layout">
        <div className="industry-menu" role="group" aria-label="Industry">
          {industries.map((s, i) => (
            <button
              key={s}
              onClick={() => setSelected(i)}
              aria-pressed={selected === i}
            >
              {s}
              <ArrowRight size={16} aria-hidden="true" />
            </button>
          ))}
        </div>
        <div className="industry-content" aria-live="polite">
          <h3>{item.challenge}</h3>
          <div className="two-cols">
            <div>
              <h4>Automation</h4>
              <p>{item.automation}</p>
            </div>
            <div>
              <h4>Website</h4>
              <p>{item.web}</p>
            </div>
          </div>
          <div className="industry-journey">
            <span>A typical journey</span>
            {item.journey}
          </div>
          {item.note && <p className="disclaimer">{item.note}</p>}
          <Link
            className="inline-link"
            to={`/contact?industry=${encodeURIComponent(industries[selected])}`}
          >
            Talk to us about this <ArrowRight size={16} aria-hidden="true" />
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
        <h2>Questions people ask first.</h2>
        <p>
          Anything else, ask us directly. Every project starts with a
          conversation.
        </p>
      </div>
      <div>
        {faqs.map(([q, a]) => (
          <details className="faq" key={q}>
            <summary>
              {q}
              <ChevronDown size={18} aria-hidden="true" />
            </summary>
            <p>{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

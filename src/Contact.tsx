import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowUpRight, CalendarDays, Download, Send } from "lucide-react";
import { Label } from "./components";
import { industries } from "./data";
import { defaultInputs, limits } from "./roi.mjs";
export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name.").max(100),
  email: z.email("Please enter a valid business email.").max(254),
  company: z.string().trim().min(2, "Please enter your company name.").max(120),
  industry: z.string().min(1, "Choose your industry."),
  service: z.string().min(1, "Choose a service."),
  challenge: z
    .string()
    .trim()
    .min(20, "Tell us a little more—at least 20 characters.")
    .max(3000, "Please keep this under 3,000 characters."),
  website: z.union([
    z.literal(""),
    z
      .url("Use a complete URL, including https://.")
      .refine(
        (v) => /^https?:\/\//i.test(v),
        "Use an http or https website address.",
      ),
  ]),
  consent: z.boolean().refine((v) => v, "Please confirm your consent."),
});
type Inquiry = z.infer<typeof contactSchema>;
export function configuredURL(value: string | undefined) {
  if (!value) return "";
  try {
    const u = new URL(value);
    return u.protocol === "https:" ||
      u.hostname === "localhost" ||
      u.hostname === "127.0.0.1"
      ? u.href
      : "";
  } catch {
    return "";
  }
}
export default function Contact() {
  const [params] = useSearchParams();
  const endpoint = configuredURL(import.meta.env.VITE_CONTACT_ENDPOINT),
    booking = configuredURL(import.meta.env.VITE_BOOKING_URL),
    email = import.meta.env.VITE_CONTACT_EMAIL || "";
  const [status, setStatus] = useState<{
    kind: string;
    text: string;
  } | null>(null);
  const [includeROI, setIncludeROI] = useState(true);
  const hasROI = params.has("leads");
  const roi = Object.fromEntries(
    (Object.keys(defaultInputs) as (keyof typeof defaultInputs)[]).map((k) => {
      const raw = Number(params.get(k) ?? defaultInputs[k]);
      return [
        k,
        Math.min(
          limits[k][1],
          Math.max(limits[k][0], Number.isFinite(raw) ? raw : defaultInputs[k]),
        ),
      ];
    }),
  );
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inquiry>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      industry: industries.includes(params.get("industry") || "")
        ? params.get("industry")!
        : "",
      service: [
        "Web Design",
        "AI Automation",
        "Complete Growth Suite",
      ].includes(params.get("service") || "")
        ? params.get("service")!
        : "",
      challenge: "",
      website: "",
      consent: false,
    },
  });
  const download = (data: Inquiry) => {
    const brief = [
      "NEXUS — PROJECT INQUIRY",
      "",
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      `Company: ${data.company}`,
      `Industry: ${data.industry}`,
      `Service: ${data.service}`,
      `Website: ${data.website || "Not supplied"}`,
      "",
      data.challenge,
      ...(hasROI && includeROI
        ? [
            "",
            "Calculator assumptions (illustrative):",
            JSON.stringify(roi, null, 2),
          ]
        : []),
    ].join("\n");
    const url = URL.createObjectURL(
      new Blob([brief], { type: "text/plain;charset=utf-8" }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = "nexus-project-brief.txt";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setStatus({
      kind: "draft",
      text: "Your project brief has been downloaded to your device. It has not been submitted to NEXUS.",
    });
  };
  const submit = async (data: Inquiry) => {
    setStatus(null);
    if (!endpoint) {
      download(data);
      return;
    }
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          ...(hasROI && includeROI ? { roiAssumptions: roi } : {}),
          source: "nexus-website",
        }),
        signal: AbortSignal.timeout(15000),
      });
      if (!response.ok) throw new Error("Unable to confirm receipt.");
      const body = await response.json();
      if (body.received !== true || !body.id)
        throw new Error("Receipt was not confirmed.");
      setStatus({
        kind: "success",
        text: "Your inquiry has been received. The next step is a conversation about your goals, scope and the right approach.",
      });
      window.dispatchEvent(
        new CustomEvent("nexus:conversion", {
          detail: { event: "inquiry_received" },
        }),
      );
    } catch {
      setStatus({
        kind: "error",
        text: "We couldn’t confirm delivery. Your details are still here. Try again, or download a copy of your brief.",
      });
    }
  };
  const field = (
    key: keyof Inquiry,
    label: string,
    element: React.ReactNode,
    full = false,
  ) => (
    <div className={`form-field ${full ? "full" : ""}`}>
      <label htmlFor={key}>{label}</label>
      {element}
      {errors[key] && (
        <span id={`${key}-error`} className="field-error" role="alert">
          {String(errors[key]?.message)}
        </span>
      )}
    </div>
  );
  return (
    <>
      <section className="wrap page-hero">
        <Label>LET’S BUILD WHAT’S NEXT</Label>
        <h1>
          Your next stage of growth
          <br />
          <span className="accent">starts here.</span>
        </h1>
        <p>
          Tell us what you’re building. We’ll explore how better digital
          experiences and smarter workflows could help your business.
        </p>
      </section>
      <section className="wrap section contact-layout">
        <form
          className="contact-form"
          onSubmit={handleSubmit(submit)}
          noValidate
        >
          {!endpoint && (
            <div className="form-status">
              <b>Prepare your project brief.</b>
              <br />
              Online inquiries are not open yet. You can create and download a
              brief below; nothing will be sent.
            </div>
          )}
          {field(
            "name",
            "Full name",
            <input
              id="name"
              autoComplete="name"
              {...register("name")}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
              placeholder="Your name"
            />,
          )}
          {field(
            "email",
            "Business email",
            <input
              id="email"
              type="email"
              autoComplete="email"
              {...register("email")}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              placeholder="you@company.com"
            />,
          )}
          {field(
            "company",
            "Company name",
            <input
              id="company"
              autoComplete="organization"
              {...register("company")}
              aria-invalid={!!errors.company}
              aria-describedby={errors.company ? "company-error" : undefined}
              placeholder="Your business"
            />,
          )}
          {field(
            "industry",
            "Industry",
            <select
              id="industry"
              {...register("industry")}
              aria-invalid={!!errors.industry}
              aria-describedby={errors.industry ? "industry-error" : undefined}
            >
              <option value="">Select an industry</option>
              {industries.map((i) => (
                <option key={i}>{i}</option>
              ))}
              <option>Other</option>
            </select>,
          )}
          {field(
            "service",
            "Interested service",
            <select
              id="service"
              {...register("service")}
              aria-invalid={!!errors.service}
              aria-describedby={errors.service ? "service-error" : undefined}
            >
              <option value="">What would you like to explore?</option>
              {[
                "Web Design",
                "AI Automation",
                "Complete Growth Suite",
                "Help me decide",
              ].map((i) => (
                <option key={i}>{i}</option>
              ))}
            </select>,
            true,
          )}
          {field(
            "challenge",
            "What’s your main business challenge?",
            <textarea
              id="challenge"
              {...register("challenge")}
              aria-invalid={!!errors.challenge}
              aria-describedby={
                errors.challenge ? "challenge-error" : undefined
              }
              placeholder="Tell us where you are now and what you’d like to change."
            />,
            true,
          )}
          {field(
            "website",
            "Website URL (optional)",
            <input
              id="website"
              type="url"
              autoComplete="url"
              {...register("website")}
              aria-invalid={!!errors.website}
              aria-describedby={errors.website ? "website-error" : undefined}
              placeholder="https://yourcompany.com"
            />,
            true,
          )}
          {hasROI && (
            <div className="roi-context">
              <small>YOUR CALCULATOR ASSUMPTIONS</small>
              {roi.leads} leads/month · €{roi.value} customer value ·{" "}
              {roi.conversion}% conversion · {roi.missed}% missed leads ·{" "}
              {roi.recovery}% recovery · {roi.hours} admin hours/week ·{" "}
              {roi.saving}% time saved.
              <br />
              <label>
                <input
                  type="checkbox"
                  checked={includeROI}
                  onChange={(e) => setIncludeROI(e.target.checked)}
                />{" "}
                Include these illustrative assumptions in my brief.
              </label>
            </div>
          )}
          <div className="form-consent">
            <input
              type="checkbox"
              id="consent"
              {...register("consent")}
              aria-invalid={!!errors.consent}
              aria-describedby={errors.consent ? "consent-error" : undefined}
            />
            <label htmlFor="consent">
              I have read the <Link to="/privacy">privacy policy</Link> and
              agree to the use of these details to handle my inquiry. Please
              don’t include sensitive personal information.
            </label>
          </div>
          {errors.consent && (
            <span
              className="field-error form-status"
              id="consent-error"
              role="alert"
            >
              {errors.consent.message}
            </span>
          )}
          <div className="form-actions">
            <button className="button" type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? "Sending your inquiry…"
                : endpoint
                  ? "Send Your Inquiry"
                  : "Download My Project Brief"}
              {endpoint ? <Send size={16} /> : <Download size={16} />}
            </button>
            {endpoint && (
              <button
                className="text-button"
                type="button"
                onClick={handleSubmit(download)}
              >
                Download a copy
              </button>
            )}
          </div>
          {status && (
            <div className={`form-status ${status.kind}`} role="status">
              {status.text}
            </div>
          )}
        </form>
        <aside className="contact-aside">
          <Label>A USEFUL FIRST CONVERSATION</Label>
          <h3>
            Big ambition.
            <br />A simple first step.
          </h3>
          <p>
            A strategy call is a chance to understand your business and see
            whether we’re the right fit.
          </p>
          <ol>
            <li>Talk through your goals and challenges.</li>
            <li>Explore the most useful opportunities.</li>
            <li>Define a sensible next step together.</li>
          </ol>
          {booking ? (
            <a
              className="button"
              href={booking}
              target="_blank"
              rel="noreferrer"
            >
              Choose a Time <CalendarDays size={16} />
            </a>
          ) : (
            <div className="booking-note">
              <h3>Start with your brief.</h3>
              <p>
                Calendar booking is not available yet. Capture your priorities
                in the form so your first conversation can start with the right
                context.
              </p>
              {email && (
                <a className="inline-link" href={`mailto:${email}`}>
                  Email the Studio <ArrowUpRight size={16} />
                </a>
              )}
            </div>
          )}
          <p className="disclaimer">
            No obligation. Just a thoughtful conversation about what comes next.
          </p>
        </aside>
      </section>
    </>
  );
}

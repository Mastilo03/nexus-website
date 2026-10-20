import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
export default function Legal({ privacy = false }: { privacy?: boolean }) {
  const connected = Boolean(import.meta.env.VITE_CONTACT_ENDPOINT);
  return (
    <>
      <section className="wrap page-hero">
        <h1>
          {privacy ? "Privacy & your information." : "A clear understanding."}
        </h1>
        <p>
          {privacy
            ? "How this version of the NEXUS website handles information."
            : "Using the NEXUS website, its concepts and its interactive demonstrations."}
        </p>
      </section>
      <article className="wrap section legal">
        <p className="notice">
          Website notice · Updated 19 October 2026. Business registration
          details, the privacy contact and provider-specific terms must be
          completed before this website accepts public client inquiries.
        </p>
        {privacy ? (
          <>
            <h2>Information you choose to provide</h2>
            <p>
              The inquiry form asks for your name, business email, company,
              industry, service interest, challenge and an optional website
              address. Calculator assumptions can be included only when you
              choose to attach them.
            </p>
            <p>
              {connected
                ? "When you submit the form, those details are sent to the configured inquiry service. A confirmation is shown only after that service acknowledges receipt."
                : "Online inquiry delivery is not enabled in this version. Form details remain in the page’s memory and are not sent to NEXUS. Downloading a brief saves a text file on your own device."}
            </p>
            <h2>Interactive demos & calculator</h2>
            <p>
              The assistant and workflow demonstrations use predefined scripts
              and sample data. They do not connect to a live AI provider, send
              messages, create CRM records or book appointments. Calculator
              values stay in page memory; carrying them to the contact page
              places those non-personal assumptions in the page URL.
            </p>
            <h2>Storage & third-party services</h2>
            <p>
              This application does not set advertising cookies or install
              analytics tracking. Website hosting may process technical request
              information to deliver the site. Fonts are requested from Google
              Fonts, which receives technical information such as your IP
              address when those files are loaded.
            </p>
            <p>
              If a booking link is configured and you open it, the calendar
              provider handles that visit under its own terms and privacy
              notice. Your form information is not automatically passed to that
              provider.
            </p>
            <h2>Retention & control</h2>
            <p>
              Unsaved form entries and demonstration choices are cleared when
              the page is reloaded. Downloaded project briefs remain on your
              device until you delete them. If inquiry delivery is enabled
              later, the operator must publish the responsible business, contact
              details, service providers and retention arrangements here.
            </p>
            <h2>Questions about your information</h2>
            <p>
              Use the verified contact method provided by the business when it
              becomes available. Until that information is configured, do not
              submit sensitive personal, medical or financial information
              through this website.
            </p>
          </>
        ) : (
          <>
            <h2>Using this website</h2>
            <p>
              NEXUS presents web design and automation service concepts. You may
              browse the site, explore examples and use the calculator to
              consider possible projects. A website visit or a downloaded brief
              does not create a service agreement.
            </p>
            <h2>Concepts & demonstrations</h2>
            <p>
              Portfolio projects are original concept demonstrations. They are
              not presented as commissioned client work, verified results or
              customer endorsements. Simulations do not create real
              appointments, send communications or change external business
              records.
            </p>
            <h2>Estimates & proposals</h2>
            <p>
              Calculator outputs are illustrative estimates based on your
              assumptions. They are not revenue forecasts, profit calculations
              or guaranteed outcomes. Project scope, pricing, timelines,
              ownership, support and third-party costs are defined separately in
              an agreed proposal.
            </p>
            <h2>Responsible use</h2>
            <p>
              Please use the site for its intended purpose. Do not attempt to
              disrupt its operation, bypass access restrictions or submit
              information you are not entitled to share. Healthcare
              demonstrations concern administrative workflows only and do not
              provide clinical advice.
            </p>
            <h2>External services</h2>
            <p>
              Third-party booking platforms and integrations operate under their
              own terms. Their availability and capabilities must be assessed
              before a real implementation.
            </p>
            <h2>Project terms</h2>
            <p>
              Any paid engagement requires separate written terms with the
              identified service provider. Those terms should specify the actual
              parties, deliverables and responsibilities before work begins.
            </p>
          </>
        )}
        <Link to="/contact" className="inline-link">
          Back to the conversation <ArrowUpRight size={15} />
        </Link>
      </article>
    </>
  );
}

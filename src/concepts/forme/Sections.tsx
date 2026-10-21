import { useRef, useState } from "react";
import { NEXUS_ORIGIN } from "../config";
import { residences, samplePrice, type Residence } from "./residences";
function Plan({ residence: r }: { residence: Residence }) {
  return (
    <svg
      className="residence-plan"
      viewBox="0 0 580 420"
      role="img"
      aria-labelledby={`plan-${r.id}`}
    >
      <title
        id={`plan-${r.id}`}
      >{`${r.name} sample plan. ${r.bedrooms} bedrooms, open living and dining, kitchen, bathroom and terrace. Sample area ${r.area} square metres. Orientation ${r.orientation}. Diagram not to scale.`}</title>
      <g fill="none" stroke="currentColor">
        <path strokeWidth="5" d="M65 60H495V345H65Z" />
        <path
          strokeWidth="2"
          d="M240 60V175M240 205V345M240 155H495M240 250H495M355 250V345"
        />
        <path
          strokeWidth="1"
          d="M65 70H55V335H65M75 345V365H485V345M250 70H325V120H250ZM365 70H470V120H365ZM80 85H160V130H80ZM80 230H180V285H80ZM95 260H165M290 275H330V315H290Z"
        />
        <path
          strokeWidth="1"
          d="M240 175A30 30 0 0 1 270 205L240 205M370 250A30 30 0 0 1 400 280L400 250"
        />
      </g>
      <g
        fontFamily="Geist Mono Variable,monospace"
        fontSize="22"
        fill="currentColor"
      >
        <text x="90" y="190">
          Living
        </text>
        <text x="90" y="210">
          Open plan
        </text>
        <text x="280" y="140">
          {r.bedrooms > 1 ? "Bed 1" : "Bedroom"}
        </text>
        <text x="280" y="210">
          {r.bedrooms > 1 ? "Bed 2" : "Study"}
        </text>
        <text x="270" y="335">
          Bath
        </text>
        <text x="370" y="310">
          {r.bedrooms === 3 ? "Bed 3" : "Entry"}
        </text>
        <text x="180" y="395">
          Terrace / Sample plan
        </text>
      </g>
      <g stroke="#b93808" fill="none">
        <path d="M65 35H495M65 29V41M495 29V41M525 60V345M519 60H531M519 345H531" />
      </g>
      <g
        fill="#b93808"
        fontFamily="Geist Mono Variable,monospace"
        fontSize="22"
      >
        <text x="225" y="25">
          {r.area} m² sample area
        </text>
        <text x="535" y="210">
          N
        </text>
      </g>
    </svg>
  );
}
export default function FormeSections() {
  const [floor, setFloor] = useState(6),
    [selected, setSelected] = useState("P01"),
    [requested, setRequested] = useState("P01"),
    [confirmed, setConfirmed] = useState(false);
  const confirmation = useRef<HTMLDivElement>(null);
  const r = residences.find((r) => r.id === selected)!;
  const options = residences.filter((r) => r.floor === floor);
  const chooseFloor = (f: number) => {
    setFloor(f);
    setSelected(residences.find((r) => r.floor === f)!.id);
  };
  return (
    <>
      <section id="residences" className="forme-residences">
        <div className="forme-section-heading">
          <h2>
            Find your
            <br />
            point of view.
          </h2>
          <p>
            Eighteen residences. Seven distinct levels.
            <br />
            Choose a floor, then explore a sample plan.
          </p>
        </div>
        <div className="residence-configurator">
          <div className="elevation">
            <div className="forme-mono">Select a floor</div>
            <div
              className="elevation-stack"
              role="group"
              aria-label="Building floors"
            >
              {[6, 5, 4, 3, 2, 1, 0].map((f) => (
                <button
                  key={f}
                  type="button"
                  aria-pressed={floor === f}
                  style={{ width: `${76 + (6 - f) * 4}%` }}
                  onClick={() => chooseFloor(f)}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
                      e.preventDefault();
                      const next = Math.min(
                        6,
                        Math.max(0, f + (e.key === "ArrowUp" ? 1 : -1)),
                      );
                      chooseFloor(next);
                      (
                        e.currentTarget.parentElement?.querySelector(
                          `[data-floor="${next}"]`,
                        ) as HTMLElement
                      )?.focus();
                    }
                  }}
                  data-floor={f}
                >
                  <span>
                    {f === 0 ? "Ground" : `Level ${String(f).padStart(2, "0")}`}
                  </span>
                  <span>
                    {f === 6
                      ? "Penthouse"
                      : `${residences.filter((r) => r.floor === f).length} plans`}
                  </span>
                </button>
              ))}
            </div>
            <p>
              Arrow keys move between floors.
              <br />
              All residences shown are fictional.
            </p>
          </div>
          <div className="plan-panel">
            <div
              className="residence-tabs"
              role="group"
              aria-label="Residences on selected floor"
            >
              {options.map((item) => (
                <button
                  key={item.id}
                  aria-pressed={selected === item.id}
                  onClick={() => setSelected(item.id)}
                >
                  {item.id}
                </button>
              ))}
            </div>
            <Plan residence={r} />
            <p className="forme-mono plan-note">
              Illustrative layout. Not to scale. {r.bedrooms} bedrooms, living /
              dining, kitchen, bathroom and terrace.
            </p>
          </div>
          <div className="residence-detail" aria-live="polite">
            <h3>{r.name}</h3>
            <dl>
              <div>
                <dt>Sample plan area</dt>
                <dd>{r.area} m²</dd>
              </div>
              <div>
                <dt>Bedrooms</dt>
                <dd>{r.bedrooms}</dd>
              </div>
              <div>
                <dt>Orientation</dt>
                <dd>{r.orientation}</dd>
              </div>
              <div>
                <dt>Sample price</dt>
                <dd>{samplePrice(r.price)}</dd>
              </div>
            </dl>
            <a
              className="forme-action"
              href="#viewing"
              onClick={() => setRequested(r.id)}
            >
              Request a viewing ↗
            </a>
          </div>
        </div>
      </section>
      <section className="forme-materials">
        <div className="forme-section-heading">
          <h2>
            Honest materials.
            <br />
            Considered together.
          </h2>
          <p>
            Texture gives the building its character.
            <br />
            Four materials. Each with a purpose.
          </p>
        </div>
        <div className="materials-grid">
          {[
            [
              "concrete",
              "Concrete",
              "Board-formed surfaces hold the trace of the timber that shaped them.",
            ],
            [
              "oak",
              "Oak",
              "Warm soffits bring a quieter register to the terrace edge.",
            ],
            [
              "glass",
              "Glass",
              "Full-height glazing carries daylight deep into the plan.",
            ],
            [
              "stone",
              "Stone",
              "Honed limestone gives thresholds a calm, tactile finish.",
            ],
          ].map(([image, name, copy]) => (
            <figure key={image}>
              <img
                src={`/forme/${image}.webp`}
                alt={`${name} material close-up, generated concept imagery`}
                width="1000"
                height="1000"
                loading="lazy"
              />
              <figcaption>
                <h3>{name}</h3>
                <p>{copy}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
      <section className="forme-neighbourhood">
        <div>
          <h2>
            Life within
            <br />
            walking distance.
          </h2>
          <p>
            A fictional neighbourhood, planned around everyday rituals. A
            morning coffee. A walk by the water. A direct route home.
          </p>
          <ul>
            {[
              ["Waterside walk", "3 min"],
              ["Corner café", "4 min"],
              ["Neighbourhood park", "6 min"],
              ["Station", "9 min"],
            ].map(([place, time]) => (
              <li key={place}>
                <span>{place}</span>
                <span className="forme-mono">{time}</span>
              </li>
            ))}
          </ul>
          <p className="forme-mono">
            Illustrative map and sample walking times.
          </p>
        </div>
        <svg
          viewBox="0 0 600 500"
          role="img"
          aria-label="Fictional neighbourhood diagram: FORME is three minutes from the water, four from a café, six from the park and nine from a station."
        >
          <g fill="none" stroke="#8e9192" strokeWidth="1">
            <path d="M0 130H600M0 300H600M0 430H600M100 0V500M270 0V500M460 0V500M0 70L600 460" />
            <path d="M120 150H245V275H120ZM295 150H435V275H295ZM120 325H245V405H120ZM295 325H435V405H295Z" />
            <path d="M490 0Q420 160 530 300T560 500M510 0Q440 160 550 300T580 500" />
          </g>
          <g
            fill="#121417"
            fontFamily="Host Grotesk Variable,sans-serif"
            fontSize="24"
          >
            <text x="120" y="110">
              Park · 6 min
            </text>
            <text x="300" y="285">
              Café · 4 min
            </text>
            <text x="100" y="465">
              Station · 9 min
            </text>
            <text x="345" y="70">
              Water · 3 min
            </text>
          </g>
          <rect x="175" y="190" width="95" height="45" fill="#ff5b1f" />
          <text x="185" y="219" fontSize="24" fill="#121417">
            FORME
          </text>
          <path
            d="M225 235V300H460"
            fill="none"
            stroke="#b93808"
            strokeDasharray="5 5"
          />
        </svg>
      </section>
      <section id="viewing" className="forme-viewing">
        <div>
          <h2>
            See how
            <br />
            it could feel.
          </h2>
          <p>
            Explore the viewing request experience.
            <br />
            This is a local demo. Nothing is sent or booked.
          </p>
        </div>
        {confirmed ? (
          <div
            className="forme-confirmation"
            ref={confirmation}
            tabIndex={-1}
            role="status"
          >
            <h3>Your demo is complete.</h3>
            <p>
              You selected residence {requested}. This is a design concept.
              Nothing was sent and no viewing was booked. Your details have not
              been saved.
            </p>
            <button onClick={() => setConfirmed(false)}>
              Try another residence
            </button>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.currentTarget.reset();
              setConfirmed(true);
              setTimeout(() => confirmation.current?.focus(), 0);
            }}
          >
            <label>
              Residence
              <select
                value={requested}
                onChange={(e) => setRequested(e.target.value)}
              >
                {residences.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.id} · {r.name}
                  </option>
                ))}
              </select>
            </label>
            <div className="forme-field-pair">
              <label>
                Preferred day
                <input required type="date" name="day" />
              </label>
              <label>
                Preferred time
                <select name="time" required defaultValue="">
                  <option value="" disabled>
                    Choose a time
                  </option>
                  <option>10:00</option>
                  <option>13:00</option>
                  <option>16:00</option>
                </select>
              </label>
            </div>
            <label>
              Your name
              <input name="name" autoComplete="name" required maxLength={100} />
            </label>
            <label>
              Email address
              <input
                type="email"
                name="email"
                autoComplete="email"
                required
                maxLength={254}
              />
            </label>
            <button className="forme-action" type="submit">
              Complete the demo ↗
            </button>
          </form>
        )}
      </section>
      <footer className="forme-footer">
        <a className="forme-wordmark" href="#forme-top">
          FORME
        </a>
        <p>
          Space to see differently.
          <br />A fictional residential concept by NEXUS.
        </p>
        <a href={NEXUS_ORIGIN}>Built by NEXUS ↗</a>
      </footer>
    </>
  );
}

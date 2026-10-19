import { Check, MessageSquare, Zap } from "lucide-react";
export function ProjectArt({ art, name }: { art: string; name: string }) {
  return (
    <div className={`project-art art-${art}`}>
      <div className="art-texture" />
      <span className="art-label">NEXUS CONCEPT / {name}</span>
      {art === "hotel" ? (
        <>
          <div className="hotel-sun" />
          <div className="hotel-wall" />
          <div className="hotel-window" />
          <h3>
            AURA<span>A slower state of mind.</span>
          </h3>
        </>
      ) : art === "property" ? (
        <>
          <div className="building building-one" />
          <div className="building building-two" />
          <h3>
            FORME<span>Exceptional spaces. A new perspective.</span>
          </h3>
        </>
      ) : art === "dental" ? (
        <>
          <div className="demo-orb">✳</div>
          <div className="art-chat">
            A better welcome starts here.
            <span>
              <Check size={12} /> Appointment request prepared
            </span>
          </div>
        </>
      ) : art === "auto" ? (
        <>
          <div className="car-silhouette" />
          <h3>
            APEX<span>Precision is a feeling.</span>
          </h3>
        </>
      ) : art === "field" ? (
        <>
          <div className="field-nodes">
            <MessageSquare />
            <i />
            <Zap />
            <i />
            <Check />
          </div>
          <h3>
            FIELD<span>Stay on the tools. Stay connected.</span>
          </h3>
        </>
      ) : (
        <>
          <div className="wellness-circle" />
          <h3>
            STILL<span>Find your own rhythm.</span>
          </h3>
        </>
      )}
    </div>
  );
}

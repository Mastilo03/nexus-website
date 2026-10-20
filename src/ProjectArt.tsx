import { Check, MessageSquare, Zap } from "lucide-react";
export function ProjectArt({ art, name }: { art: string; name: string }) {
  return (
    <div className={`project-art art-${art}`} aria-hidden="true">
      {art === "hotel" ? (
        <>
          <div className="hotel-sun" />
          <div className="hotel-wall" />
          <div className="hotel-window" />
          <span className="art-mark">{name}</span>
        </>
      ) : art === "property" ? (
        <>
          <div className="building building-one" />
          <div className="building building-two" />
          <span className="art-mark">{name}</span>
        </>
      ) : art === "dental" ? (
        <div className="art-chat">
          A better welcome starts here.
          <span>
            <Check size={14} /> Appointment request ready
          </span>
        </div>
      ) : art === "auto" ? (
        <>
          <div className="car-silhouette" />
          <span className="art-mark">{name}</span>
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
          <span className="art-mark">{name}</span>
        </>
      ) : (
        <>
          <div className="wellness-circle" />
          <span className="art-mark">{name}</span>
        </>
      )}
    </div>
  );
}

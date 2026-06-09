import { Video } from "lucide-react";

export default function LiveSessionsEmptyCard({
  title,
  emptyTitle,
  emptyDescription,
  variant = "green",
}) {
  return (
    <div className="live-card">
      <div className="live-card__header">
        <span className={`live-card__section-icon ${variant}`}>
          <Video size={15} />
        </span>
        <h3>{title}</h3>
      </div>

      <div className="live-card__empty">
        <div className="live-card__empty-icon">
          <Video size={28} />
        </div>

        <h4>{emptyTitle}</h4>
        <p>{emptyDescription}</p>
      </div>
    </div>
  );
}
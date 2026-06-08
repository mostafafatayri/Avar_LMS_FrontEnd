export default function PositionStatusBadge({ active = true }) {
  return (
    <span className={`position-status ${active ? "active" : "inactive"}`}>
      {active ? "Active" : "Inactive"}
    </span>
  );
}
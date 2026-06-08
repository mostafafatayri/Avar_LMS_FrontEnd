import "./StatusBadge.scss";

export default function StatusBadge({ type, children }) {
  return <span className={`status-badge ${type}`}>{children}</span>;
}
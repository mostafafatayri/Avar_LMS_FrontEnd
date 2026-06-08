import "./ActionButton.scss";

export default function ActionButton({
  children,
  icon: Icon,
  variant = "primary",
  onClick,
  type = "button",
  disabled = false,
}) {
  return (
    <button
      type={type}
      className={`action-btn action-btn--${variant}`}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        onClick?.();
      }}
      disabled={disabled}
    >
      {Icon && <Icon size={18} />}
      <span>{children}</span>
    </button>
  );
}
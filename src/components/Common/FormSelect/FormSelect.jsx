import "./FormSelect.scss";

export default function FormSelect({
  label,
  required,
  name,
  value,
  onChange,
  options = [],
  disabled = false,
  placeholder,
}) {
  return (
    <div className="form-select">
      <label>
        {required && <span>*</span>} {label}
      </label>

      <select name={name} value={value} onChange={onChange} disabled={disabled}>
        <option value="">
          {placeholder || `Select ${label.toLowerCase()}`}
        </option>

        {options.map((option, index) => (
          <option key={option.id || option.name || index} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
}
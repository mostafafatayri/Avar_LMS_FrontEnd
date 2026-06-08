import "./FormField.scss";

export default function FormField({
  label,
  required,
  type = "text",
  placeholder,
  value,
  onChange,
  name,
}) {
  return (
    <div className="form-field">
      <label>
        {required && <span>*</span>} {label}
      </label>

      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
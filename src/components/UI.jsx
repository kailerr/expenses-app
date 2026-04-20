export function Card({ children, className = "" }) {
  return (
    <div className={`card ${className}`}>{children}</div>
  );
}

export function Button({ children, onClick, variant = "primary", type = "button", disabled = false }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`btn btn-${variant}`}
    >
      {children}
    </button>
  );
}

export function Input({ label, type = "text", value, onChange, placeholder, required }) {
  return (
    <div className="input-group">
      {label && <label>{label}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
}

export function Select({ label, value, onChange, options }) {
  return (
    <div className="input-group">
      {label && <label>{label}</label>}
      <select value={value} onChange={onChange}>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}

export function Badge({ children, color }) {
  return <span className={`badge badge-${color}`}>{children}</span>;
}
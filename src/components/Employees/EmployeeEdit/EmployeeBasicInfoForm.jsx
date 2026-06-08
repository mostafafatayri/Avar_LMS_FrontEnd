export default function EmployeeBasicInfoForm({
  formData,
  onChange,
  nationalities = [],
}) {
  return (
    <section className="employee-edit-card">
      <h3>Personal Information</h3>

      <div className="employee-form-grid">
        <FormInput
          label="Employee ID"
          value={formData.employeeId}
          onChange={(value) => onChange("employeeId", value)}
          placeholder="EMP-0001"
        />

        <FormInput
          label="First Name"
          value={formData.firstName}
          onChange={(value) => onChange("firstName", value)}
          placeholder="Enter first name"
        />

        <FormInput
          label="Middle Name"
          value={formData.middleName}
          onChange={(value) => onChange("middleName", value)}
          placeholder="Enter middle name"
        />

        <FormInput
          label="Last Name"
          value={formData.lastName}
          onChange={(value) => onChange("lastName", value)}
          placeholder="Enter last name"
        />

        <FormInput
          label="Email"
          value={formData.email}
          onChange={(value) => onChange("email", value)}
          placeholder="Enter email"
          type="email"
        />

        <FormInput
          label="Phone"
          value={formData.phoneNumber}
          onChange={(value) => onChange("phoneNumber", value)}
          placeholder="Enter phone number"
        />

        <div className="form-group">
          <label>Status</label>
          <select
            value={formData.active ? "ACTIVE" : "INACTIVE"}
            onChange={(e) => onChange("active", e.target.value === "ACTIVE")}
          >
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
          </select>
        </div>

        <div className="form-group">
          <label>Gender</label>
          <select
            value={formData.gender || ""}
            onChange={(e) => onChange("gender", e.target.value)}
          >
            <option value="">Select gender</option>
            <option value="MAN">Man</option>
            <option value="WOMAN">Woman</option>
          </select>
        </div>

        <div className="form-group">
          <label>Nationality</label>
          <select
            value={formData.nationalityId || ""}
            onChange={(e) => onChange("nationalityId", e.target.value)}
          >
            <option value="">Select nationality</option>

            {nationalities.map((nationality) => (
              <option key={nationality.id} value={nationality.id}>
                {nationality.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </section>
  );
}

function FormInput({
  label,
  value,
  onChange,
  type = "text",
  placeholder = "",
}) {
  return (
    <div className="form-group">
      <label>{label}</label>
      <input
        type={type}
        value={value || ""}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

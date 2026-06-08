export default function EmployeeCompanyInfoForm({
  formData,
  onChange,
  departments,
  positions,
}) {
  const filteredPositions = positions.filter((position) => {
    if (!formData.departmentId) return true;

    return (
      Number(position.departmentId) === Number(formData.departmentId) ||
      Number(position.department?.id) === Number(formData.departmentId)
    );
  });

  return (
    <section className="employee-edit-card">
      <h3>Company Information</h3>

      <div className="employee-form-grid">
        <div className="form-group">
          <label>Department</label>
          <select
            value={formData.departmentId}
            onChange={(e) => {
              onChange("departmentId", e.target.value);
              onChange("positionId", "");
            }}
          >
            <option value="">Select department</option>
            {departments.map((department) => (
              <option key={department.id} value={department.id}>
                {department.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Position</label>
          <select
            value={formData.positionId}
            onChange={(e) => onChange("positionId", e.target.value)}
          >
            <option value="">Select position</option>
            {filteredPositions.map((position) => (
              <option key={position.id} value={position.id}>
                {position.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group full">
          <label>Manager ID</label>
          <input
            value={formData.managerId || ""}
            onChange={(e) => onChange("managerId", e.target.value)}
            placeholder="Manager employee database ID"
          />
        </div>
      </div>
    </section>
  );
}
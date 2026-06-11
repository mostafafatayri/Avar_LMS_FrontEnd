import { useState } from "react";
import { X } from "lucide-react";

import { useDepartments } from "../../hooks/useDepartments";
import { useEmployees } from "../../hooks/useEmployees";
import { useCreateSubTeam } from "../../hooks/useSubTeams";

import "./AddSubTeamModal.scss";

export default function AddSubTeamModal({ onClose }) {
  const createSubTeamMutation = useCreateSubTeam();

  const { data: departmentsData = [], isLoading: departmentsLoading } =
    useDepartments();

  const { data: employeesData = [], isLoading: employeesLoading } =
    useEmployees();

  const departments = Array.isArray(departmentsData)
    ? departmentsData
    : departmentsData?.data || [];

  const employees = Array.isArray(employeesData)
    ? employeesData
    : employeesData?.data || [];

  const [formData, setFormData] = useState({
    name: "",
    departmentId: "",
    leadEmployeeId: "",
    description: "",
    active: true,
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    if (!formData.name.trim()) {
      setErrorMessage("Sub-Team name is required.");
      return;
    }

    if (!formData.departmentId) {
      setErrorMessage("Department is required.");
      return;
    }

    try {
      await createSubTeamMutation.mutateAsync({
        name: formData.name,
        departmentId: Number(formData.departmentId),
        leadEmployeeId: formData.leadEmployeeId
          ? Number(formData.leadEmployeeId)
          : null,
        description: formData.description,
        active: formData.active,
      });

      onClose();
    } catch (error) {
      setErrorMessage(
        error?.response?.data?.message || "Failed to create sub-team."
      );
    }
  };

  return (
    <div className="modal-overlay">
      <form className="subteam-modal" onSubmit={handleSubmit}>
        <div className="modal-header">
          <div>
            <h2>Add Sub-Team</h2>
          </div>

          <button type="button" className="close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          {errorMessage && <div className="modal-error">{errorMessage}</div>}

          <div className="form-grid single-column">
            <div className="form-group">
              <label>Sub-Team Name *</label>
              <input
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Example: IT Support"
              />
            </div>

            <div className="form-group">
              <label>Department *</label>
              <select
                value={formData.departmentId}
                onChange={(e) => handleChange("departmentId", e.target.value)}
                disabled={departmentsLoading}
              >
                <option value="">
                  {departmentsLoading ? "Loading departments..." : "Select department"}
                </option>

                {departments.map((department) => (
                  <option key={department.id} value={department.id}>
                    {department.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Lead</label>
              <select
                value={formData.leadEmployeeId}
                onChange={(e) => handleChange("leadEmployeeId", e.target.value)}
                disabled={employeesLoading}
              >
                <option value="">
                  {employeesLoading ? "Loading employees..." : "Select lead"}
                </option>

                {employees.map((employee) => (
                  <option key={employee.id} value={employee.id}>
                    {employee.fullName} {employee.email ? `(${employee.email})` : ""}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Description</label>
              <input
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder="Short sub-team description"
              />
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button type="button" className="btn-secondary" onClick={onClose}>
            Cancel
          </button>

          <button
            type="submit"
            className="btn-primary"
            disabled={createSubTeamMutation.isPending}
          >
            {createSubTeamMutation.isPending ? "Creating..." : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
}
import { useState } from "react";
import { X } from "lucide-react";

import { createEmployee } from "../../services/employeeService";
import { useDepartments } from "../../hooks/useDepartments";
import { useSubTeams } from "../../hooks/useSubTeams";
import { usePositions } from "../../hooks/usePositions";

import "./AddEmployeeModal.scss";

export default function AddEmployeeModal({ onClose, onSuccess }) {
  const { data: departmentsData = [], isLoading: departmentsLoading } =
    useDepartments();

  const { data: subTeamsData = [], isLoading: subTeamsLoading } = useSubTeams();

  const { data: positionsData = [], isLoading: positionsLoading } =
    usePositions();

  const departments = Array.isArray(departmentsData)
    ? departmentsData
    : departmentsData?.data || [];

  const subTeams = Array.isArray(subTeamsData)
    ? subTeamsData
    : subTeamsData?.data || [];

  const positions = Array.isArray(positionsData)
    ? positionsData
    : positionsData?.data || [];

  const [formData, setFormData] = useState({
    employeeId: "",
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    departmentId: "",
    subTeamId: "",
    positionId: "",
    hireDate: "",
    active: true,
  });

  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const filteredSubTeams = subTeams.filter((team) => {
    if (!formData.departmentId) return true;
    return String(team.departmentId) === String(formData.departmentId);
  });

  const filteredPositions = positions.filter((position) => {
    if (!formData.departmentId) return true;
    return String(position.departmentId) === String(formData.departmentId);
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
      ...(field === "departmentId"
        ? {
            subTeamId: "",
            positionId: "",
          }
        : {}),
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    if (!formData.firstName.trim()) {
      setErrorMessage("First name is required.");
      return;
    }

    if (!formData.lastName.trim()) {
      setErrorMessage("Last name is required.");
      return;
    }

    if (!formData.email.trim()) {
      setErrorMessage("Email is required.");
      return;
    }

    try {
      setIsSaving(true);

      await createEmployee({
        employeeId: formData.employeeId || null,
        firstName: formData.firstName,
        middleName: formData.middleName || null,
        lastName: formData.lastName,
        email: formData.email,
        phoneNumber: formData.phoneNumber || null,
        departmentId: formData.departmentId
          ? Number(formData.departmentId)
          : null,
        subTeamId: formData.subTeamId ? Number(formData.subTeamId) : null,
        positionId: formData.positionId ? Number(formData.positionId) : null,
        hireDate: formData.hireDate || null,
        active: formData.active,
      });

      onSuccess?.();
      onClose();
    } catch (error) {
      setErrorMessage(
        error?.response?.data?.message || "Failed to create employee."
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="modal-overlay">
      <form className="employee-modal" onSubmit={handleSubmit}>
        <div className="modal-header">
          <div>
            <h2>Add Employee</h2>
            <p>Create a new employee profile.</p>
          </div>

          <button type="button" className="close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          {errorMessage && <div className="modal-error">{errorMessage}</div>}

          <div className="form-grid">
            <div className="form-group">
              <label>Employee ID</label>
              <input
                placeholder="EMP-001"
                value={formData.employeeId}
                onChange={(e) => handleChange("employeeId", e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>First Name *</label>
              <input
                placeholder="John"
                value={formData.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Middle Name</label>
              <input
                placeholder="Michael"
                value={formData.middleName}
                onChange={(e) => handleChange("middleName", e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Last Name *</label>
              <input
                placeholder="Doe"
                value={formData.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                placeholder="john@company.com"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input
                placeholder="+961 xx xxx xxx"
                value={formData.phoneNumber}
                onChange={(e) => handleChange("phoneNumber", e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Department</label>
              <select
                value={formData.departmentId}
                onChange={(e) => handleChange("departmentId", e.target.value)}
                disabled={departmentsLoading}
              >
                <option value="">
                  {departmentsLoading ? "Loading..." : "Select Department"}
                </option>

                {departments.map((department) => (
                  <option key={department.id} value={department.id}>
                    {department.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Sub Team</label>
              <select
                value={formData.subTeamId}
                onChange={(e) => handleChange("subTeamId", e.target.value)}
                disabled={subTeamsLoading}
              >
                <option value="">
                  {subTeamsLoading ? "Loading..." : "Select Team"}
                </option>

                {filteredSubTeams.map((team) => (
                  <option key={team.id} value={team.id}>
                    {team.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Role / Title</label>
              <select
                value={formData.positionId}
                onChange={(e) => handleChange("positionId", e.target.value)}
                disabled={positionsLoading}
              >
                <option value="">
                  {positionsLoading ? "Loading..." : "Select Role / Title"}
                </option>

                {filteredPositions.map((position) => (
                  <option key={position.id} value={position.id}>
                    {position.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Hire Date</label>
              <input
                type="date"
                value={formData.hireDate}
                onChange={(e) => handleChange("hireDate", e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Status</label>
              <select
                value={formData.active ? "ACTIVE" : "INACTIVE"}
                onChange={(e) =>
                  handleChange("active", e.target.value === "ACTIVE")
                }
              >
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button type="button" className="btn-secondary" onClick={onClose}>
            Cancel
          </button>

          <button type="submit" className="btn-primary" disabled={isSaving}>
            {isSaving ? "Saving..." : "Save Employee"}
          </button>
        </div>
      </form>
    </div>
  );
}
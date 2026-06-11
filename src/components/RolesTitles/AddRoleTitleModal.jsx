import { useState } from "react";
import { X } from "lucide-react";
import "./AddRoleTitleModal.scss";

export default function AddRoleTitleModal({ activeTab, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    department: "",
    subTeam: "",
    seniority: "Mid",
    description: "",
    active: true,
  });

  const getTitle = () => {
    if (activeTab === "roles") return "Add Role";
    if (activeTab === "jobTitles") return "Add Job Title";
    return "Add Specialization";
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (activeTab === "roles") {
      console.log("Create role", formData);
    }

    if (activeTab === "jobTitles") {
      console.log("Create job title", formData);
    }

    if (activeTab === "specializations") {
      console.log("Create specialization", formData);
    }

    onClose();
  };

  return (
    <div className="modal-overlay">
      <form className="role-title-modal" onSubmit={handleSubmit}>
        <div className="modal-header">
          <div>
            <h2>{getTitle()}</h2>
            <p>Create employee master data for your organization.</p>
          </div>

          <button type="button" className="close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          <div className="form-grid single-column">
            {activeTab === "jobTitles" ? (
              <div className="form-group">
                <label>Title *</label>
                <input
                  value={formData.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  placeholder="Frontend Developer"
                />
              </div>
            ) : (
              <div className="form-group">
                <label>Name *</label>
                <input
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder={
                    activeTab === "roles"
                      ? "Training Manager"
                      : "Safety Training"
                  }
                />
              </div>
            )}

            <div className="form-group">
              <label>Department</label>
              <select
                value={formData.department}
                onChange={(e) => handleChange("department", e.target.value)}
              >
                <option value="">Select</option>
                <option value="Human Resources">Human Resources</option>
                <option value="Information Technology">
                  Information Technology
                </option>
                <option value="Learning">Learning</option>
                <option value="Operations">Operations</option>
                <option value="Finance">Finance</option>
              </select>
            </div>

            {activeTab === "roles" && (
              <div className="form-group">
                <label>Seniority Level</label>
                <select
                  value={formData.seniority}
                  onChange={(e) => handleChange("seniority", e.target.value)}
                >
                  <option value="Junior">Junior</option>
                  <option value="Mid">Mid</option>
                  <option value="Senior">Senior</option>
                  <option value="Lead">Lead</option>
                  <option value="Manager">Manager</option>
                </select>
              </div>
            )}

            {activeTab === "specializations" && (
              <div className="form-group">
                <label>Sub-Team</label>
                <select
                  value={formData.subTeam}
                  onChange={(e) => handleChange("subTeam", e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="Compliance">Compliance</option>
                  <option value="IT Support">IT Support</option>
                  <option value="Learning Operations">
                    Learning Operations
                  </option>
                  <option value="Accounting">Accounting</option>
                </select>
              </div>
            )}

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

            <div className="form-group">
              <label>Description</label>
              <textarea
                rows="3"
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder="Write a short description..."
              />
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button type="button" className="btn-secondary" onClick={onClose}>
            Cancel
          </button>

          <button type="submit" className="btn-primary">
            Create
          </button>
        </div>
      </form>
    </div>
  );
}
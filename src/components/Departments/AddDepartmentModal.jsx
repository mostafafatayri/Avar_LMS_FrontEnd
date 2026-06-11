import { useEffect, useState } from "react";
import { X } from "lucide-react";

import {
  useCreateDepartment,
  useUpdateDepartment,
} from "../../hooks/useDepartments";

import "./AddDepartmentModal.scss";

export default function AddDepartmentModal({ onClose, editingDepartment }) {
  const isEditMode = Boolean(editingDepartment);

  const createDepartmentMutation = useCreateDepartment();
  const updateDepartmentMutation = useUpdateDepartment();

  const [formData, setFormData] = useState({
    name: "",
    code: "",
    managerName: "",
    active: true,
    description: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!editingDepartment) return;

    setFormData({
      name: editingDepartment.name || "",
      code: editingDepartment.code || "",
      managerName: editingDepartment.managerName || "",
      active: editingDepartment.active ?? true,
      description: editingDepartment.description || "",
    });
  }, [editingDepartment]);

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
      setErrorMessage("Department name is required.");
      return;
    }

    const payload = {
      name: formData.name,
      code: formData.code,
      managerName: formData.managerName,
      active: formData.active,
      description: formData.description,
    };

    try {
      if (isEditMode) {
        await updateDepartmentMutation.mutateAsync({
          id: editingDepartment.id,
          payload,
        });
      } else {
        await createDepartmentMutation.mutateAsync(payload);
      }

      onClose();
    } catch (error) {
      setErrorMessage(
        error?.response?.data?.message ||
          `Failed to ${isEditMode ? "update" : "create"} department.`
      );
    }
  };

  const isSaving =
    createDepartmentMutation.isPending || updateDepartmentMutation.isPending;

  return (
    <div className="modal-overlay">
      <form className="department-modal" onSubmit={handleSubmit}>
        <div className="modal-header">
          <div>
            <h2>{isEditMode ? "Edit Department" : "Add Department"}</h2>
            <p>
              {isEditMode
                ? "Update department information."
                : "Create a new department."}
            </p>
          </div>

          <button type="button" className="close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          {errorMessage && <div className="modal-error">{errorMessage}</div>}

          <div className="form-grid">
            <div className="form-group">
              <label>Name *</label>
              <input
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Human Resources"
              />
            </div>

            <div className="form-group">
              <label>Code</label>
              <input
                value={formData.code}
                onChange={(e) => handleChange("code", e.target.value)}
                placeholder="HR"
              />
            </div>

            <div className="form-group">
              <label>Manager</label>
              <input
                value={formData.managerName}
                onChange={(e) => handleChange("managerName", e.target.value)}
                placeholder="Sarah Johnson"
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

            <div className="form-group full-width">
              <label>Description</label>
              <textarea
                rows="4"
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder="Write a short department description..."
              />
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button type="button" className="btn-secondary" onClick={onClose}>
            Cancel
          </button>

          <button type="submit" className="btn-primary" disabled={isSaving}>
            {isSaving
              ? "Saving..."
              : isEditMode
              ? "Update Department"
              : "Save Department"}
          </button>
        </div>
      </form>
    </div>
  );
}
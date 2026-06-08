import { useState } from "react";
import { BriefcaseBusiness, X } from "lucide-react";
import { useCreatePosition } from "../../hooks/usePositions";
import "./PositionModal.scss";

export default function AddPositionModal({ isOpen, onClose, departments = [] }) {
  const createMutation = useCreatePosition();

  const [formData, setFormData] = useState({
    name: "",
    code: "",
    description: "",
    departmentId: "",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "departmentId" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    createMutation.mutate(formData, {
      onSuccess: () => {
        setFormData({
          name: "",
          code: "",
          description: "",
          departmentId: "",
        });
        onClose();
      },
    });
  };

  return (
    <div className="position-modal-overlay">
      <div className="position-modal">
        <div className="position-modal-header">
          <div className="title-section">
            <div className="icon-wrapper">
              <BriefcaseBusiness size={22} />
            </div>
            <div>
              <h2>Add Position</h2>
              <p>Create a new position in the company</p>
            </div>
          </div>

          <button className="close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="position-form-grid">
            <div className="form-group">
              <label>Position Name *</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Example: Technician"
                required
              />
            </div>

            <div className="form-group">
              <label>Position Code *</label>
              <input
                name="code"
                value={formData.code}
                onChange={handleChange}
                placeholder="Example: TECH"
                required
              />
            </div>

            <div className="form-group">
              <label>Department *</label>
              <select
                name="departmentId"
                value={formData.departmentId}
                onChange={handleChange}
                required
              >
                <option value="">Select department</option>
                {departments.map((department) => (
                  <option key={department.id} value={department.id}>
                    {department.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group full">
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe this position"
              />
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>

            <button
              type="submit"
              className="save-btn"
              disabled={createMutation.isPending}
            >
              {createMutation.isPending ? "Creating..." : "Create Position"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
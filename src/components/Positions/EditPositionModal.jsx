import { useEffect, useState } from "react";
import { BriefcaseBusiness, X } from "lucide-react";
import { useUpdatePosition } from "../../hooks/usePositions";
import "./PositionModal.scss";

export default function EditPositionModal({
  isOpen,
  onClose,
  position,
  departments = [],
}) {
  const updateMutation = useUpdatePosition();

  const [formData, setFormData] = useState({
    name: "",
    code: "",
    description: "",
    departmentId: "",
  });

  useEffect(() => {
    if (position) {
      setFormData({
        name: position.name || "",
        code: position.code || position.positionCode || "",
        description: position.description || "",
        departmentId:
          position.departmentId || position.department?.id || "",
      });
    }
  }, [position]);

  if (!isOpen || !position) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "departmentId" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    updateMutation.mutate(
      {
        id: position.id,
        payload: formData,
      },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
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
              <h2>Edit Position</h2>
              <p>Update position information</p>
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
                required
              />
            </div>

            <div className="form-group">
              <label>Position Code *</label>
              <input
                name="code"
                value={formData.code}
                onChange={handleChange}
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
              disabled={updateMutation.isPending}
            >
              {updateMutation.isPending ? "Updating..." : "Update Position"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
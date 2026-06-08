import { X } from "lucide-react";
import "./AddDepartmentModal.scss";

export default function AddDepartmentModal({
  onClose,
}) {
  return (
    <div className="modal-overlay">
      <div className="department-modal">
        <div className="modal-header">
          <div>
            <h2>Add Department</h2>
            <p>Create a new department.</p>
          </div>

          <button
            className="close-btn"
            onClick={onClose}
          >
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          <div className="form-grid">
            <div className="form-group">
              <label>Name</label>
              <input />
            </div>

            <div className="form-group">
              <label>Code</label>
              <input />
            </div>

            <div className="form-group">
              <label>Manager</label>
              <select>
                <option>Select Manager</option>
              </select>
            </div>

            <div className="form-group">
              <label>Status</label>
              <select>
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>

            <div className="form-group full-width">
              <label>Description</label>
              <textarea rows="4" />
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button
            className="btn-secondary"
            onClick={onClose}
          >
            Cancel
          </button>

          <button className="btn-primary">
            Save Department
          </button>
        </div>
      </div>
    </div>
  );
}
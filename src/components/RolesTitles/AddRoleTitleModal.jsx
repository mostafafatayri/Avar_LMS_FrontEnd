import { X } from "lucide-react";
import "./AddRoleTitleModal.scss";

export default function AddRoleTitleModal({ onClose }) {
  return (
    <div className="modal-overlay">
      <div className="role-title-modal">
        <div className="modal-header">
          <div>
            <h2>Add Role / Title</h2>
            <p>Create a new system role, custom role, or job title.</p>
          </div>

          <button className="close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          <div className="form-grid">
            <div className="form-group">
              <label>Name</label>
              <input placeholder="Example: HR Specialist" />
            </div>

            <div className="form-group">
              <label>Type</label>
              <select>
                <option>System Role</option>
                <option>Custom Role</option>
                <option>Job Title</option>
              </select>
            </div>

            <div className="form-group">
              <label>Status</label>
              <select>
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>

            <div className="form-group">
              <label>Default Permission Group</label>
              <select>
                <option>Select Permission Group</option>
                <option>Admin Access</option>
                <option>Manager Access</option>
                <option>Viewer Access</option>
              </select>
            </div>

            <div className="form-group full-width">
              <label>Description</label>
              <textarea rows="4" placeholder="Write a short description..." />
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>
            Cancel
          </button>

          <button className="btn-primary">Save Role / Title</button>
        </div>
      </div>
    </div>
  );
}
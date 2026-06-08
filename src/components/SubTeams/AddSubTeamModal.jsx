import { X } from "lucide-react";
import "./AddSubTeamModal.scss";

export default function AddSubTeamModal({ onClose }) {
  return (
    <div className="modal-overlay">
      <div className="subteam-modal">
        <div className="modal-header">
          <div>
            <h2>Add Sub Team</h2>
            <p>Create a sub team under a department.</p>
          </div>

          <button className="close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          <div className="form-grid">
            <div className="form-group">
              <label>Sub Team Name</label>
              <input placeholder="Example: IT Support" />
            </div>

            <div className="form-group">
              <label>Department</label>
              <select>
                <option>Select Department</option>
                <option>Human Resources</option>
                <option>Information Technology</option>
                <option>Finance</option>
              </select>
            </div>

            <div className="form-group">
              <label>Team Lead</label>
              <select>
                <option>Select Team Lead</option>
                <option>Sarah Johnson</option>
                <option>Michael Chen</option>
                <option>David Wilson</option>
              </select>
            </div>

            <div className="form-group">
              <label>Parent Team</label>
              <input placeholder="Example: IT Services" />
            </div>

            <div className="form-group">
              <label>Status</label>
              <select>
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>

            <div className="form-group">
              <label>Created On</label>
              <input type="date" />
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

          <button className="btn-primary">Save Sub Team</button>
        </div>
      </div>
    </div>
  );
}
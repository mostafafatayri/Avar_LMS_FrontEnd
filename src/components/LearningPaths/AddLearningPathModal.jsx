import { X } from "lucide-react";
import "./AddLearningPathModal.scss";

export default function AddLearningPathModal({ onClose }) {
  return (
    <div className="modal-overlay">
      <div className="learning-path-modal">
        <div className="modal-header">
          <div>
            <h2>Create Learning Path</h2>
            <p>Define a structured training journey.</p>
          </div>

          <button className="close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="learning-path-modal-body">
          <div className="form-grid single-column">
            <div className="form-group">
              <label>Name *</label>
              <input />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea rows="4" />
            </div>

            <div className="form-group">
              <label>Duration (days)</label>
              <input type="number" defaultValue="0" />
            </div>

            <div className="form-group">
              <label>Completion Requirement</label>
              <select>
                <option>All Mandatory</option>
                <option>Any Training</option>
                <option>Manager Approval</option>
              </select>
            </div>

            <div className="form-group">
              <label>Status</label>
              <select>
                <option>Draft</option>
                <option>Published</option>
                <option>Archived</option>
              </select>
            </div>

            <div className="approval-row">
              <label className="switch">
                <input type="checkbox" defaultChecked />
                <span />
              </label>

              <p>Approval Required</p>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>
            Cancel
          </button>

          <button className="btn-primary">Create</button>
        </div>
      </div>
    </div>
  );
}
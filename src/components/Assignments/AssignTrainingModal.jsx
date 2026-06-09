import { X } from "lucide-react";
import "./AssignTrainingModal.scss";

export default function AssignTrainingModal({ onClose }) {
  return (
    <div className="modal-overlay">
      <div className="assign-training-modal">
        <div className="modal-header">
          <div>
            <h2>Assign Training</h2>
            <p>Assign a training to an employee.</p>
          </div>

          <button className="close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="assign-training-modal-body">
          <div className="form-grid single-column">
            <div className="form-group">
              <label>Employee *</label>
              <select>
                <option>Select employee</option>
                <option>Wael Abed</option>
                <option>Sarah Haddad</option>
                <option>Omar Al-Masri</option>
              </select>
            </div>

            <div className="form-group">
              <label>Training *</label>
              <select>
                <option>Select training</option>
                <option>Health & Safety Basics</option>
                <option>Fire Safety Awareness</option>
                <option>Cybersecurity Awareness</option>
              </select>
            </div>

            <div className="form-group">
              <label>Due Date</label>
              <input type="date" defaultValue="2026-06-09" />
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>
            Cancel
          </button>

          <button className="btn-primary">Assign</button>
        </div>
      </div>
    </div>
  );
}
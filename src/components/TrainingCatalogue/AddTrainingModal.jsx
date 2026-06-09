import { X, FileText, UploadCloud, Video } from "lucide-react";
import "./AddTrainingModal.scss";

export default function AddTrainingModal({ onClose }) {
  return (
    <div className="modal-overlay">
      <div className="training-modal">
        <div className="modal-header">
          <div>
            <h2>Add Training</h2>
            <p>Create a new training catalogue item.</p>
          </div>

          <button className="close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="training-modal-body">
          <div className="form-grid">
            <div className="form-group full-width">
              <label>Title *</label>
              <input />
            </div>

            <div className="form-group">
              <label>Code</label>
              <input placeholder="e.g. HSE-001" />
            </div>

            <div className="form-group">
              <label>Category</label>
              <input />
            </div>

            <div className="form-group full-width">
              <label>Description</label>
              <textarea rows="3" />
            </div>

            <div className="form-group">
              <label>Training Type</label>
              <select>
                <option>Online</option>
                <option>Classroom</option>
                <option>Blended</option>
                <option>External</option>
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

            <div className="form-group">
              <label>Duration (hours)</label>
              <input type="number" defaultValue="0" />
            </div>

            <div className="form-group">
              <label>Validity (months)</label>
              <input type="number" defaultValue="0" />
            </div>

            <div className="form-group">
              <label>Passing Score (%)</label>
              <input type="number" defaultValue="70" />
            </div>

            <div className="form-group">
              <label>Trainer</label>
              <input />
            </div>

            <div className="form-group full-width">
              <label>Trainer Email</label>
              <input type="email" />
            </div>

            <div className="form-group full-width">
              <label className="section-label">
                <FileText size={15} />
                Course Materials (PPT / PDF)
              </label>

              <button type="button" className="upload-box">
                <UploadCloud size={17} />
                Upload PPT / PDF / Video
              </button>
            </div>

            <div className="form-group full-width">
              <label className="section-label live">
                <Video size={15} />
                Live Session
              </label>

              <div className="toggle-row">
                <label className="switch">
                  <input type="checkbox" />
                  <span />
                </label>

                <p>This training has a live session</p>
              </div>
            </div>

            <div className="form-group full-width">
              <label>Options</label>

              <div className="options-grid">
                {["Mandatory", "Refresher", "Certificate", "Assessment", "Approval"].map(
                  (option) => (
                    <div className="option-item" key={option}>
                      <label className="switch">
                        <input type="checkbox" defaultChecked />
                        <span />
                      </label>
                      <p>{option}</p>
                    </div>
                  )
                )}
              </div>
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
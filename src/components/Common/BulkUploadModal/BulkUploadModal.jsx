import { UploadCloud, X } from "lucide-react";
import "./BulkUploadModal.scss";

export default function BulkUploadModal({ onClose }) {
  return (
    <div className="bulk-overlay">
      <div className="bulk-modal">
        <div className="bulk-header">
          <div>
            <h2>Bulk Upload Employees</h2>
            <p>
              Upload an Excel file to create employees in bulk.
            </p>
          </div>

          <button className="close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="upload-zone">
          <UploadCloud size={50} />

          <h3>Drop Excel File Here</h3>

          <p>
            Supported formats: .xlsx .xls
          </p>

          <button className="browse-btn">
            Browse File
          </button>
        </div>

        <div className="bulk-footer">
          <button className="btn-secondary" onClick={onClose}>
            Cancel
          </button>

          <button className="btn-primary">
            Upload Employees
          </button>
        </div>
      </div>
    </div>
  );
}
import { FileText, X } from "lucide-react";
import "./UploadedFileCard.scss";

export default function UploadedFileCard({ fileName, status, onRemove }) {
  return (
    <div className="uploaded-file-card">
      <div className="uploaded-file-info">
        <div className="uploaded-file-icon">
          <FileText size={20} />
        </div>

        <div>
          <p>{fileName}</p>
          {status && <small>{status}</small>}
        </div>
      </div>

      <button type="button" className="remove-file-btn" onClick={onRemove}>
        <X size={20} />
      </button>
    </div>
  );
}
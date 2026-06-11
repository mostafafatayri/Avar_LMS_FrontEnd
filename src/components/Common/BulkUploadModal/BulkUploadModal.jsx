import { useRef, useState } from "react";
import { UploadCloud, X } from "lucide-react";
import "./BulkUploadModal.scss";

export default function BulkUploadModal({
  onClose,
  onUpload,
  isLoading = false,
  title = "Bulk Upload",
  description = "Upload an Excel file to create records in bulk.",
  uploadButtonText = "Upload File",
}) {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const isExcel =
      file.name.endsWith(".xlsx") || file.name.endsWith(".xls");

    if (!isExcel) {
      setErrorMessage("Please select a valid Excel file.");
      setSelectedFile(null);
      return;
    }

    setErrorMessage("");
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setErrorMessage("Please select a file first.");
      return;
    }

    await onUpload(selectedFile);
  };

  return (
    <div className="bulk-overlay">
      <div className="bulk-modal">
        <div className="bulk-header">
          <div>
            <h2>{title}</h2>
            <p>{description}</p>
          </div>

          <button className="close-btn" onClick={onClose} type="button">
            <X size={18} />
          </button>
        </div>

        <div className="upload-zone">
          <UploadCloud size={50} />

          <h3>{selectedFile ? selectedFile.name : "Drop Excel File Here"}</h3>
          <p>Supported formats: .xlsx .xls</p>

          {errorMessage && <div className="bulk-error">{errorMessage}</div>}

          <input
            ref={fileInputRef}
            type="file"
            accept=".xlsx,.xls"
            hidden
            onChange={handleFileChange}
          />

          <button
            className="browse-btn"
            type="button"
            onClick={() => fileInputRef.current?.click()}
          >
            Browse File
          </button>
        </div>

        <div className="bulk-footer">
          <button className="btn-secondary" onClick={onClose} type="button">
            Cancel
          </button>

          <button
            className="btn-primary"
            type="button"
            onClick={handleUpload}
            disabled={isLoading}
          >
            {isLoading ? "Uploading..." : uploadButtonText}
          </button>
        </div>
      </div>
    </div>
  );
}
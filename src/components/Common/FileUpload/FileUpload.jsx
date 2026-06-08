import { UploadCloud } from "lucide-react";
import "./FileUpload.scss";

export default function FileUpload({ onFilesChange }) {
  const handleChange = (e) => {
    const files = Array.from(e.target.files || []);
    onFilesChange(files);
  };

  return (
    <label className="file-upload">
      <input
        type="file"
        multiple
        hidden
        onChange={handleChange}
      />

      <UploadCloud size={28} />
      <p>
        Drag and drop files here, or <span>click to browse</span>
      </p>
      <small>Supports: JPG, PNG, PDF, DOC, XLS Max 10MB</small>
    </label>
  );
}

/*
export default function FileUpload({ onFilesChange }) {
  const handleChange = (e) => {
    const files = Array.from(e.target.files);
    onFilesChange(files);
  };

  return (
    <label className="file-upload">
      <input type="file" multiple hidden onChange={handleChange} />
       <UploadCloud size={28} />
      <p>
        Drag and drop files here, or <span>click to browse</span>
      </p>
      <small>Supports: JPG, PNG, PDF, DOC, XLS Max 10MB</small>
    </label>
  );
}*/


/*
export default function FileUpload() {
  return (
    
    <div className="file-upload">
      <UploadCloud size={28} />
      <p>
        Drag and drop files here, or <span>click to browse</span>
      </p>
      <small>Supports: JPG, PNG, PDF, DOC, XLS Max 10MB</small>
    </div>
  );
}

*/
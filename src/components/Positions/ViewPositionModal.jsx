import { BriefcaseBusiness, X } from "lucide-react";
import PositionStatusBadge from "./PositionStatusBadge";
import "./PositionModal.scss";

export default function ViewPositionModal({ isOpen, onClose, position }) {
  if (!isOpen || !position) return null;

  return (
    <div className="position-modal-overlay">
      <div className="position-modal">
        <div className="position-modal-header">
          <div className="title-section">
            <div className="icon-wrapper">
              <BriefcaseBusiness size={22} />
            </div>
            <div>
              <h2>View Position</h2>
              <p>Position details and configuration</p>
            </div>
          </div>

          <button className="close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="position-view-body">
          <div className="view-row">
            <span>Position Name</span>
            <strong>{position.name || "-"}</strong>
          </div>

          <div className="view-row">
            <span>Position Code</span>
            <strong>{position.code || position.positionCode || "-"}</strong>
          </div>

          <div className="view-row">
            <span>Department</span>
            <strong>{position.departmentName || position.department?.name || "-"}</strong>
          </div>

          <div className="view-row">
            <span>Status</span>
            <PositionStatusBadge active={position.active !== false} />
          </div>

          <div className="view-row">
            <span>Assigned To</span>
            <strong>{position.assignedCount || position.assignedTo || 0}</strong>
          </div>

          <div className="view-row full">
            <span>Description</span>
            <strong>{position.description || "-"}</strong>
          </div>

          <div className="view-row">
            <span>Created At</span>
            <strong>
              {position.creationDate
                ? new Date(position.creationDate).toLocaleDateString()
                : "-"}
            </strong>
          </div>

          <div className="view-row">
            <span>Modified At</span>
            <strong>
              {position.modifiedDate
                ? new Date(position.modifiedDate).toLocaleDateString()
                : "-"}
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
}
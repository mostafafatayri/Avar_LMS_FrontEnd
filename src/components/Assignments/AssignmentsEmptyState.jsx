import { ClipboardList } from "lucide-react";

export default function AssignmentsEmptyState() {
  return (
    <div className="assignments-empty-card">
      <div className="assignments-empty-icon">
        <ClipboardList size={32} />
      </div>

      <h3>No assignments found</h3>
      <p>Start assigning trainings to employees</p>
    </div>
  );
}
import { ArrowLeft, Save, X, UserRound } from "lucide-react";

export default function EmployeeEditHeader({
  employee,
  onBack,
  onCancel,
  onSave,
  isSaving,
}) {
  return (
    <div className="employee-edit-header">
      <div className="employee-edit-title-block">
        <div className="employee-edit-icon">
          <UserRound size={28} />
        </div>

        <div>
          <div className="breadcrumb">
            <span>Employees</span>
            <span>/</span>
            <span>Edit Employee</span>
          </div>

          <h1>Edit Employee</h1>
          <p>{employee?.fullName || "Update employee information"}</p>
        </div>
      </div>

      <div className="employee-edit-actions">
        <button className="secondary-action" onClick={onBack}>
          <ArrowLeft size={18} />
          Back
        </button>

        <button className="secondary-action" onClick={onCancel}>
          <X size={18} />
          Cancel
        </button>

        <button className="primary-action" onClick={onSave} disabled={isSaving}>
          <Save size={18} />
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
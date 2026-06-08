import { UserRound } from "lucide-react";

export default function EmployeeInfoTab({ employee }) {
  return (
    <div className="employee-tab-grid">
      <section className="details-card wide">
        <div className="card-title">
          <div className="card-icon">
            <UserRound size={18} />
          </div>
          <h3>Personal Information</h3>
        </div>

        <div className="info-grid">
          <Info label="First Name" value={employee.firstName} />
          <Info label="Middle Name" value={employee.middleName} />
          <Info label="Last Name" value={employee.lastName} />
          <Info label="Full Name" value={employee.fullName} />
          <Info label="Email" value={employee.email} />
          <Info label="Phone" value={employee.phoneNumber} />
          <Info label="Gender" value={employee.gender} />
          <Info label="Nationality" value={employee.nationalityName } />
          <Info label="Address" value={employee.address} />
        </div>
      </section>

      <section className="details-card">
        <div className="card-title">
          <div className="card-icon">
            <UserRound size={18} />
          </div>
          <h3>Employment Summary</h3>
        </div>

        <div className="summary-list">
            <Info label="Username" value={employee.username} />
          
          <Info label="Status" value={employee.status || "ACTIVE"} />
          <Info label="Created On" value={formatDate(employee.creationDate)} />
          <Info label="Last Updated" value={formatDate(employee.modifiedDate)} />
        </div>
      </section>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div className="info-row">
      <span>{label}</span>
      <strong>{value || "-"}</strong>
    </div>
  );
}

function formatDate(date) {
  return date ? new Date(date).toLocaleDateString() : "-";
}
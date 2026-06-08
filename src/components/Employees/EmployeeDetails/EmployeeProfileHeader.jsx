import {
  BadgeCheck,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Mail,
  Phone,
} from "lucide-react";

export default function EmployeeProfileHeader({ employee }) {
  const initials =
    employee.fullName
      ?.split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "E";

  return (
    <section className="employee-profile-card">
      <div className="profile-left">
        <div className="employee-photo">{initials}</div>

        <div>
          <h2>{employee.fullName || "-"}</h2>
          <p>{employee.jobTitle || "-"}</p>

          <div className="profile-badges">
            <span className="status active">
              {employee.status === "INACTIVE" ? "Inactive" : "Active"}
            </span>
            <span className="employee-code">
              System id : {employee.id || `EMP-${employee.id}`}
            </span>
          </div>
        </div>
      </div>

      <div className="profile-info-grid">
        <Info icon={<Mail size={18} />} label="Email" value={employee.email} />
        <Info icon={<Phone size={18} />} label="Phone" value={employee.phoneNumber || "-"} />
        <Info icon={<BadgeCheck size={18} />} label="Employee Code" value={employee.employeeId} />
        <Info icon={<Building2 size={18} />} label="Department" value={employee.departmentName || "-"} />
        <Info icon={<BriefcaseBusiness size={18} />} label="Job Title" value={employee.positionName || "-"} />
        <Info icon={<CalendarDays size={18} />} label="Date of Join" value={employee.dateOfJoin || "-"} />
      </div>
    </section>
  );
}

function Info({ icon, label, value }) {
  return (
    <div className="profile-info-item">
      <div className="info-icon">{icon}</div>
      <div>
        <span>{label}</span>
        <strong>{value || "-"}</strong>
      </div>
    </div>
  );
}
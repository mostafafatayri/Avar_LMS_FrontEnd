//import "./EmployeeStatusBadge.scss";

export default function EmployeeStatusBadge({ status }) {
  const labels = {
    ACTIVE: "Active",
    INACTIVE: "Inactive",
    ON_LEAVE: "On Leave",
  };

  return (
    <span className={`employee-status ${status?.toLowerCase()}`}>
      {labels[status] || status}
    </span>
  );
}
export default function EmployeeStatusBadge({ status }) {
  const normalizedStatus = status || "INACTIVE";

  const labels = {
    ACTIVE: "Active",
    INACTIVE: "Inactive",
    ON_LEAVE: "On Leave",
  };

  return (
    <span className={`employee-status ${normalizedStatus.toLowerCase()}`}>
      {labels[normalizedStatus] || normalizedStatus}
    </span>
  );
}
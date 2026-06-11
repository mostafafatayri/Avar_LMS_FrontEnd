import { MoreHorizontal } from "lucide-react";
import EmployeeStatusBadge from "./EmployeeStatusBadge";

export default function EmployeesTable({ employees = [], isLoading = false }) {
  if (isLoading) {
    return (
      <div className="employees-table-wrapper">
        <div className="table-empty">Loading employees...</div>
      </div>
    );
  }

  return (
    <div className="employees-table-wrapper">
      <table className="employees-table">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Job Title</th>
            <th>Status</th>
            <th />
          </tr>
        </thead>

        <tbody>
          {employees.length === 0 && (
            <tr>
              <td colSpan="7" className="table-empty">
                No employees found.
              </td>
            </tr>
          )}

          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.employeeId}</td>
              <td>{employee.fullName}</td>
              <td>{employee.email}</td>
              <td>{employee.department}</td>
              <td>{employee.jobTitle}</td>
              <td>
                <EmployeeStatusBadge status={employee.status} />
              </td>
              <td>
                <button className="action-icon" type="button">
                  <MoreHorizontal size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
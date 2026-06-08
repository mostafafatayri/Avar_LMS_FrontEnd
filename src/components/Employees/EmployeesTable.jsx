import {
  MoreHorizontal,
} from "lucide-react";

export default function EmployeesTable() {
  const employees = [
    {
      id: "EMP-001",
      name: "Wael Abed",
      department: "Product",
      role: "Product Manager",
      status: "Active",
    },
    {
      id: "EMP-002",
      name: "Sarah Haddad",
      department: "Design",
      role: "UI/UX Designer",
      status: "Active",
    },
    {
      id: "EMP-003",
      name: "Omar Masri",
      department: "Engineering",
      role: "Frontend Developer",
      status: "Active",
    },
  ];

  return (
    <div className="employees-table-wrapper">
      <table className="employees-table">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Name</th>
            <th>Department</th>
            <th>Role</th>
            <th>Status</th>
            <th />
          </tr>
        </thead>

        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.department}</td>
              <td>{employee.role}</td>

              <td>
                <span className="status active">
                  {employee.status}
                </span>
              </td>

              <td>
                <button className="action-icon">
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
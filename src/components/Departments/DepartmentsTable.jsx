import TableActions from "../Common/TableActions/TableActions";
import "../Common/TableActions/TableActions.scss";

export default function DepartmentsTable() {
  const departments = [
    {
      name: "Human Resources",
      code: "HR",
      manager: "Sarah Johnson",
      employees: 28,
      teams: 3,
      status: "Active",
    },
    {
      name: "Information Technology",
      code: "IT",
      manager: "Michael Brown",
      employees: 42,
      teams: 5,
      status: "Active",
    },
    {
      name: "Finance",
      code: "FIN",
      manager: "Emily Davis",
      employees: 19,
      teams: 2,
      status: "Active",
    },
  ];

  return (
    <div className="departments-table-wrapper">
      <table className="departments-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Code</th>
            <th>Manager</th>
            <th>Employees</th>
            <th>Sub Teams</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {departments.map((dept) => (
            <tr key={dept.code}>
              <td>{dept.name}</td>
              <td>{dept.code}</td>
              <td>{dept.manager}</td>
              <td>{dept.employees}</td>
              <td>{dept.teams}</td>
              <td>
                <span className="status active">{dept.status}</span>
              </td>
              <td>
                <TableActions
                  onEdit={() => console.log("Edit", dept)}
                  onDelete={() => console.log("Delete", dept)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
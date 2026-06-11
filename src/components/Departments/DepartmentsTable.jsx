import TableActions from "../Common/TableActions/TableActions";
import "../Common/TableActions/TableActions.scss";

export default function DepartmentsTable({ departments = [], isLoading = false }) {
  if (isLoading) {
    return (
      <div className="departments-table-wrapper">
        <div className="table-empty">Loading departments...</div>
      </div>
    );
  }

  if (!departments.length) {
    return (
      <div className="departments-table-wrapper">
        <div className="table-empty">No departments found.</div>
      </div>
    );
  }

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
            <tr key={dept.id || dept.code}>
              <td>{dept.name}</td>
              <td>{dept.code || "-"}</td>
              <td>{dept.managerName || "-"}</td>
              <td>{dept.employeeCount ?? 0}</td>
              <td>{dept.subTeamCount ?? 0}</td>
              <td>
                <span className={`status ${dept.active ? "active" : "inactive"}`}>
                  {dept.active ? "Active" : "Inactive"}
                </span>
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
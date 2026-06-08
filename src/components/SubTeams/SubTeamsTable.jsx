import TableActions from "../Common/TableActions/TableActions";
import "../Common/TableActions/TableActions.scss";

export default function SubTeamsTable() {
  const subTeams = [
    {
      name: "Recruitment",
      department: "Human Resources",
      lead: "Sarah Johnson",
      leadInitials: "SJ",
      members: 8,
      parentTeam: "HR Operations",
      status: "Active",
    },
    {
      name: "Employee Relations",
      department: "Human Resources",
      lead: "Michael Chen",
      leadInitials: "MC",
      members: 6,
      parentTeam: "HR Operations",
      status: "Active",
    },
    {
      name: "IT Support",
      department: "Information Technology",
      lead: "David Wilson",
      leadInitials: "DW",
      members: 12,
      parentTeam: "IT Services",
      status: "Active",
    },
    {
      name: "Infrastructure",
      department: "Information Technology",
      lead: "Lisa Martinez",
      leadInitials: "LM",
      members: 9,
      parentTeam: "IT Services",
      status: "Active",
    },
    {
      name: "Accounts Payable",
      department: "Finance",
      lead: "James Wong",
      leadInitials: "JW",
      members: 7,
      parentTeam: "Accounting",
      status: "Active",
    },
    {
      name: "Accounts Receivable",
      department: "Finance",
      lead: "Amanda King",
      leadInitials: "AK",
      members: 5,
      parentTeam: "Accounting",
      status: "Inactive",
    },
  ];

  return (
    <div className="subteams-table-wrapper">
      <table className="subteams-table">
        <thead>
          <tr>
            <th>
              <input type="checkbox" />
            </th>
            <th>Sub Team Name</th>
            <th>Department</th>
            <th>Team Lead</th>
            <th>Members</th>
            <th>Parent Team</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {subTeams.map((team) => (
            <tr key={`${team.department}-${team.name}`}>
              <td>
                <input type="checkbox" />
              </td>

              <td>{team.name}</td>

              <td>
                <span className="department-pill">{team.department}</span>
              </td>

              <td>
                <div className="team-lead-cell">
                  <span className="lead-avatar">{team.leadInitials}</span>
                  <span>{team.lead}</span>
                </div>
              </td>

              <td>{team.members}</td>
              <td>{team.parentTeam}</td>

              <td>
                <span className={`status ${team.status.toLowerCase()}`}>
                  {team.status}
                </span>
              </td>

              <td>
                <TableActions
                  onEdit={() => console.log("Edit", team)}
                  onDelete={() => console.log("Delete", team)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="table-footer">
        <p>Showing 1 to 6 of 25 results</p>

        <div className="pagination">
          <button>‹</button>
          <button className="active">1</button>
          <button>2</button>
          <button>3</button>
          <button>...</button>
          <button>5</button>
          <button>›</button>
        </div>
      </div>
    </div>
  );
}
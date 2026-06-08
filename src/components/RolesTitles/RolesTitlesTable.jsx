import { useState } from "react";
import { Users } from "lucide-react";
import TableActions from "../Common/TableActions/TableActions";
import "../Common/TableActions/TableActions.scss";

export default function RolesTitlesTable() {
  const [activeTab, setActiveTab] = useState("roles");

  const roles = [
    {
      name: "Admin",
      type: "System",
      description: "Full system access and management",
      users: 4,
      status: "Active",
      createdOn: "May 10, 2025",
    },
    {
      name: "Manager",
      type: "System",
      description: "Manage team and resources",
      users: 18,
      status: "Active",
      createdOn: "May 09, 2025",
    },
    {
      name: "Instructor",
      type: "Custom",
      description: "Create and manage learning content",
      users: 12,
      status: "Active",
      createdOn: "May 08, 2025",
    },
    {
      name: "HR Specialist",
      type: "Custom",
      description: "Manage employee data and HR tasks",
      users: 8,
      status: "Active",
      createdOn: "May 07, 2025",
    },
    {
      name: "Viewer",
      type: "System",
      description: "View-only access",
      users: 63,
      status: "Inactive",
      createdOn: "May 05, 2025",
    },
  ];

  const titles = [
    {
      name: "Product Manager",
      type: "Title",
      description: "Owns product planning and delivery",
      users: 7,
      status: "Active",
      createdOn: "May 10, 2025",
    },
    {
      name: "Frontend Developer",
      type: "Title",
      description: "Builds user interfaces",
      users: 14,
      status: "Active",
      createdOn: "May 09, 2025",
    },
  ];

  const data = activeTab === "roles" ? roles : titles;

  return (
    <div className="roles-titles-table-wrapper">
      <div className="roles-tabs">
        <button
          className={activeTab === "roles" ? "active" : ""}
          onClick={() => setActiveTab("roles")}
        >
          Roles (32)
        </button>

        <button
          className={activeTab === "titles" ? "active" : ""}
          onClick={() => setActiveTab("titles")}
        >
          Titles (78)
        </button>
      </div>

      <table className="roles-titles-table">
        <thead>
          <tr>
            <th>Role / Title Name</th>
            <th>Type</th>
            <th>Description</th>
            <th>Users</th>
            <th>Status</th>
            <th>Created On</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr key={item.name}>
              <td>{item.name}</td>

              <td>
                <span className={`type-pill ${item.type.toLowerCase()}`}>
                  {item.type}
                </span>
              </td>

              <td>{item.description}</td>

              <td>
                <div className="users-cell">
                  <Users size={16} />
                  {item.users}
                </div>
              </td>

              <td>
                <span className={`status ${item.status.toLowerCase()}`}>
                  {item.status}
                </span>
              </td>

              <td>{item.createdOn}</td>

              <td>
                <TableActions
                  showView
                  onView={() => console.log("View", item)}
                  onEdit={() => console.log("Edit", item)}
                  onDelete={() => console.log("Delete", item)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="table-footer">
        <p>Showing 1 to 5 of {activeTab === "roles" ? "32" : "78"} results</p>

        <div className="pagination">
          <button>‹</button>
          <button className="active">1</button>
          <button>2</button>
          <button>3</button>
          <button>...</button>
          <button>7</button>
          <button>›</button>
        </div>
      </div>
    </div>
  );
}
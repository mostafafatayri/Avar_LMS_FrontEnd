import { BriefcaseBusiness } from "lucide-react";
import TableActions from "../Common/TableActions/TableActions";
import "../Common/TableActions/TableActions.scss";

export default function RolesTitlesTable({ data = [], activeTab }) {
  const emptyText =
    activeTab === "roles"
      ? "No roles"
      : activeTab === "jobTitles"
      ? "No job titles"
      : "No specializations";

  if (!data.length) {
    return (
      <div className="roles-master-empty-card">
        <div className="roles-master-empty-icon">
          <BriefcaseBusiness size={32} />
        </div>

        <h3>{emptyText}</h3>
      </div>
    );
  }

  return (
    <div className="roles-master-table-wrapper">
      <table className="roles-master-table">
        <thead>
          {activeTab === "roles" && (
            <tr>
              <th>Name</th>
              <th>Department</th>
              <th>Seniority</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          )}

          {activeTab === "jobTitles" && (
            <tr>
              <th>Title</th>
              <th>Department</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          )}

          {activeTab === "specializations" && (
            <tr>
              <th>Name</th>
              <th>Department</th>
              <th>Sub-Team</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          )}
        </thead>

        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              {activeTab === "roles" && (
                <>
                  <td>{item.name}</td>
                  <td>{item.department || "—"}</td>
                  <td>
                    <span className="seniority-pill">
                      {item.seniority || "Mid"}
                    </span>
                  </td>
                  <td>
                    <span className={`status ${item.active ? "active" : "inactive"}`}>
                      {item.active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td>
                    <TableActions
                      onEdit={() => console.log("Edit", item)}
                      onDelete={() => console.log("Delete", item)}
                    />
                  </td>
                </>
              )}

              {activeTab === "jobTitles" && (
                <>
                  <td>{item.title}</td>
                  <td>{item.department || "—"}</td>
                  <td>
                    <span className={`status ${item.active ? "active" : "inactive"}`}>
                      {item.active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td>
                    <TableActions
                      onEdit={() => console.log("Edit", item)}
                      onDelete={() => console.log("Delete", item)}
                    />
                  </td>
                </>
              )}

              {activeTab === "specializations" && (
                <>
                  <td>{item.name}</td>
                  <td>{item.department || "—"}</td>
                  <td>{item.subTeam || "—"}</td>
                  <td>
                    <span className={`status ${item.active ? "active" : "inactive"}`}>
                      {item.active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td>
                    <TableActions
                      onEdit={() => console.log("Edit", item)}
                      onDelete={() => console.log("Delete", item)}
                    />
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
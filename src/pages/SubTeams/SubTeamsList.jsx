import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";

import Sidebar from "../../components/Layout/Sidebar/Sidebar";
import Topbar from "../../components/Layout/Topbar/Topbar";
import ActionButton from "../../components/Common/ActionButton/ActionButton";
import AddSubTeamModal from "../../components/SubTeams/AddSubTeamModal";

import { useSubTeams, useDeleteSubTeam } from "../../hooks/useSubTeams";

import "./SubTeamsList.scss";

function SubTeamsList() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingSubTeam, setEditingSubTeam] = useState(null);

  const { data, isLoading, isError, error } = useSubTeams();
  const deleteSubTeamMutation = useDeleteSubTeam();

  const subTeams = Array.isArray(data) ? data : data?.data || [];

  const openCreateModal = () => {
    setEditingSubTeam(null);
    setShowAddModal(true);
  };

  const openEditModal = (team) => {
    setEditingSubTeam(team);
    setShowAddModal(true);
  };

  const closeModal = () => {
    setEditingSubTeam(null);
    setShowAddModal(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this sub-team?")) return;
    await deleteSubTeamMutation.mutateAsync(id);
  };

  return (
    <div className="subteams-page">
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        isMobileOpen={isMobileSidebarOpen}
        onToggle={() => setIsSidebarCollapsed((prev) => !prev)}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      <main
        className={`subteams-content ${
          isSidebarCollapsed ? "sidebar-collapsed" : ""
        }`}
      >
        <Topbar onMenuClick={() => setIsMobileSidebarOpen(true)} />

        <section className="page-header">
          <div>
            <h1>Sub-Team Management</h1>
            <p>{subTeams.length} sub-teams</p>
          </div>

          <div className="page-actions">
            <ActionButton icon={Plus} onClick={openCreateModal}>
              Add Sub-Team
            </ActionButton>
          </div>
        </section>

        {isError && (
          <div className="page-error">
            {error?.response?.data?.message || "Failed to load sub-teams."}
          </div>
        )}

        <div className="subteams-table-card">
          <table className="subteams-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Department</th>
                <th>Lead</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {isLoading && (
                <tr>
                  <td colSpan="5" className="table-empty">
                    Loading sub-teams...
                  </td>
                </tr>
              )}

              {!isLoading &&
                subTeams.map((team) => (
                  <tr key={team.id}>
                    <td>{team.name}</td>
                    <td>{team.departmentName || "—"}</td>
                    <td>{team.leadEmployeeName || "—"}</td>
                    <td>
                      <span
                        className={`status ${
                          team.active ? "active" : "inactive"
                        }`}
                      >
                        {team.active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td>
                      <div className="subteams-actions">
                        <button type="button" onClick={() => openEditModal(team)}>
                          <Pencil size={17} />
                        </button>

                        <button
                          type="button"
                          className="delete"
                          onClick={() => handleDelete(team.id)}
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

              {!isLoading && subTeams.length === 0 && (
                <tr>
                  <td colSpan="5" className="table-empty">
                    No sub-teams found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>

      {showAddModal && (
        <AddSubTeamModal onClose={closeModal} editingSubTeam={editingSubTeam} />
      )}
    </div>
  );
}

export default SubTeamsList;
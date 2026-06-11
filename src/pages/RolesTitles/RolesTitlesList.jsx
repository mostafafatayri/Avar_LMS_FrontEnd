import { useState } from "react";
import { Plus, Pencil, Trash2, BriefcaseBusiness } from "lucide-react";

import Sidebar from "../../components/Layout/Sidebar/Sidebar";
import Topbar from "../../components/Layout/Topbar/Topbar";
import ActionButton from "../../components/Common/ActionButton/ActionButton";

import RolesTabs from "../../components/RolesTitles/RolesTabs";
import AddRoleModal from "../../components/RolesTitles/AddRoleModal";

import "./RolesTitlesList.scss";

function RolesTitlesList() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const [activeTab, setActiveTab] = useState("roles");
  const [showAddModal, setShowAddModal] = useState(false);

  const [roles, setRoles] = useState([
    {
      id: 1,
      name: "Training Manager",
      department: "Learning",
      seniority: "Senior",
      active: true,
    },
    {
      id: 2,
      name: "Instructor",
      department: "Learning",
      seniority: "Mid",
      active: true,
    },
  ]);

  const [jobTitles, setJobTitles] = useState([
    {
      id: 1,
      title: "Frontend Developer",
      department: "Information Technology",
      active: true,
    },
    {
      id: 2,
      title: "HR Coordinator",
      department: "Human Resources",
      active: true,
    },
  ]);

  const [specializations, setSpecializations] = useState([
    {
      id: 1,
      name: "Safety Training",
      department: "Operations",
      subTeam: "Compliance",
      active: true,
    },
  ]);

  const handleCreateRole = (payload) => {
    setRoles((prev) => [...prev, { id: Date.now(), ...payload }]);
    setShowAddModal(false);
  };

  const handleCreateJobTitle = (payload) => {
    setJobTitles((prev) => [...prev, { id: Date.now(), ...payload }]);
    setShowAddModal(false);
  };

  const handleCreateSpecialization = (payload) => {
    setSpecializations((prev) => [...prev, { id: Date.now(), ...payload }]);
    setShowAddModal(false);
  };

  const getAddButtonText = () => {
    if (activeTab === "roles") return "Add Role";
    if (activeTab === "jobTitles") return "Add Job Title";
    return "Add Specialization";
  };

  return (
    <div className="roles-page">
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        isMobileOpen={isMobileSidebarOpen}
        onToggle={() => setIsSidebarCollapsed((prev) => !prev)}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      <main className={`roles-content ${isSidebarCollapsed ? "sidebar-collapsed" : ""}`}>
        <Topbar onMenuClick={() => setIsMobileSidebarOpen(true)} />

        <section className="page-header">
          <div>
            <h1>Roles, Titles & Specializations</h1>
          </div>

          <div className="page-actions">
            <ActionButton icon={Plus} onClick={() => setShowAddModal(true)}>
              {getAddButtonText()}
            </ActionButton>
          </div>
        </section>

        <RolesTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          rolesCount={roles.length}
          jobTitlesCount={jobTitles.length}
          specializationsCount={specializations.length}
        />

        {activeTab === "roles" && (
          <div className="roles-table-card">
            <table className="roles-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Department</th>
                  <th>Seniority</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {roles.map((role) => (
                  <tr key={role.id}>
                    <td>{role.name}</td>
                    <td>{role.department || "—"}</td>
                    <td>
                      <span className="seniority-pill">{role.seniority}</span>
                    </td>
                    <td>
                      <span className={`status ${role.active ? "active" : "inactive"}`}>
                        {role.active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td>
                      <div className="roles-actions">
                        <button type="button">
                          <Pencil size={17} />
                        </button>
                        <button type="button" className="delete">
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "jobTitles" && (
          <div className="roles-table-card">
            <table className="roles-table job-title-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Department</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {jobTitles.map((jobTitle) => (
                  <tr key={jobTitle.id}>
                    <td>{jobTitle.title}</td>
                    <td>{jobTitle.department || "—"}</td>
                    <td>
                      <span className={`status ${jobTitle.active ? "active" : "inactive"}`}>
                        {jobTitle.active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td>
                      <div className="roles-actions">
                        <button type="button">
                          <Pencil size={17} />
                        </button>
                        <button type="button" className="delete">
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "specializations" && (
          <>
            {specializations.length > 0 ? (
              <div className="roles-table-card">
                <table className="roles-table specialization-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Department</th>
                      <th>Sub-Team</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {specializations.map((specialization) => (
                      <tr key={specialization.id}>
                        <td>{specialization.name}</td>
                        <td>{specialization.department || "—"}</td>
                        <td>{specialization.subTeam || "—"}</td>
                        <td>
                          <span
                            className={`status ${
                              specialization.active ? "active" : "inactive"
                            }`}
                          >
                            {specialization.active ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td>
                          <div className="roles-actions">
                            <button type="button">
                              <Pencil size={17} />
                            </button>
                            <button type="button" className="delete">
                              <Trash2 size={17} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="roles-empty-card">
                <div className="roles-empty-icon">
                  <BriefcaseBusiness size={32} />
                </div>
                <h3>No specializations</h3>
              </div>
            )}
          </>
        )}
      </main>

      {showAddModal && (
        <AddRoleModal
          activeTab={activeTab}
          onClose={() => setShowAddModal(false)}
          onCreateRole={handleCreateRole}
          onCreateJobTitle={handleCreateJobTitle}
          onCreateSpecialization={handleCreateSpecialization}
        />
      )}
    </div>
  );
}

export default RolesTitlesList;
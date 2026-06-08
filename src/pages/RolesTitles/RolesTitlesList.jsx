import { useState } from "react";
import { Plus, UploadCloud } from "lucide-react";

import Sidebar from "../../components/Layout/Sidebar/Sidebar";
import Topbar from "../../components/Layout/Topbar/Topbar";
import ActionButton from "../../components/Common/ActionButton/ActionButton";
import BulkUploadModal from "../../components/Common/BulkUploadModal/BulkUploadModal";

import RolesTitlesStats from "../../components/RolesTitles/RolesTitlesStats";
import RolesTitlesFilterBar from "../../components/RolesTitles/RolesTitlesFilterBar";
import RolesTitlesTable from "../../components/RolesTitles/RolesTitlesTable";
import AddRoleTitleModal from "../../components/RolesTitles/AddRoleTitleModal";

import "./RolesTitlesList.scss";

function RolesTitlesList() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showBulkModal, setShowBulkModal] = useState(false);

  return (
    <div className="roles-titles-page">
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        isMobileOpen={isMobileSidebarOpen}
        onToggle={() => setIsSidebarCollapsed((prev) => !prev)}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      <main className={`roles-titles-content ${isSidebarCollapsed ? "sidebar-collapsed" : ""}`}>
        <Topbar onMenuClick={() => setIsMobileSidebarOpen(true)} />

        <section className="page-header">
          <div>
            <h1>Roles & Titles</h1>
            <p>Manage job roles and titles used across the organization.</p>
          </div>

          <div className="page-actions">
            <ActionButton
              icon={UploadCloud}
              variant="secondary"
              onClick={() => setShowBulkModal(true)}
            >
              Import Roles & Titles
            </ActionButton>

            <ActionButton icon={Plus} onClick={() => setShowAddModal(true)}>
              Add Role / Title
            </ActionButton>
          </div>
        </section>

        <RolesTitlesStats />
        <RolesTitlesFilterBar />
        <RolesTitlesTable />
      </main>

      {showAddModal && <AddRoleTitleModal onClose={() => setShowAddModal(false)} />}
      {showBulkModal && <BulkUploadModal onClose={() => setShowBulkModal(false)} />}
    </div>
  );
}

export default RolesTitlesList;
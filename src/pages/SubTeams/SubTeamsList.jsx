import { useState } from "react";
import { Plus, UploadCloud } from "lucide-react";

import Sidebar from "../../components/Layout/Sidebar/Sidebar";
import Topbar from "../../components/Layout/Topbar/Topbar";
import ActionButton from "../../components/Common/ActionButton/ActionButton";
import BulkUploadModal from "../../components/Common/BulkUploadModal/BulkUploadModal";

import SubTeamStats from "../../components/SubTeams/SubTeamStats";
import SubTeamsFilterBar from "../../components/SubTeams/SubTeamsFilterBar";
import SubTeamsTable from "../../components/SubTeams/SubTeamsTable";
import AddSubTeamModal from "../../components/SubTeams/AddSubTeamModal";

import "./SubTeamsList.scss";

function SubTeamsList() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showBulkModal, setShowBulkModal] = useState(false);

  return (
    <div className="subteams-page">
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        isMobileOpen={isMobileSidebarOpen}
        onToggle={() => setIsSidebarCollapsed((prev) => !prev)}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      <main className={`subteams-content ${isSidebarCollapsed ? "sidebar-collapsed" : ""}`}>
        <Topbar onMenuClick={() => setIsMobileSidebarOpen(true)} />

        <section className="page-header">
          <div>
            <h1>Sub Teams</h1>
            <p>Manage sub teams and their assignments.</p>
          </div>

          <div className="page-actions">
            <ActionButton
              icon={UploadCloud}
              variant="secondary"
              onClick={() => setShowBulkModal(true)}
            >
              Import Sub Teams
            </ActionButton>

            <ActionButton icon={Plus} onClick={() => setShowAddModal(true)}>
              Add Sub Team
            </ActionButton>
          </div>
        </section>

        <SubTeamStats />
        <SubTeamsFilterBar />
        <SubTeamsTable />
      </main>

      {showAddModal && <AddSubTeamModal onClose={() => setShowAddModal(false)} />}

      {showBulkModal && <BulkUploadModal onClose={() => setShowBulkModal(false)} />}
    </div>
  );
}

export default SubTeamsList;
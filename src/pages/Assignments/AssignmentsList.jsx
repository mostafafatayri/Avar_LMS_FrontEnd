import { useState } from "react";
import { Plus } from "lucide-react";

import Sidebar from "../../components/Layout/Sidebar/Sidebar";
import Topbar from "../../components/Layout/Topbar/Topbar";
import ActionButton from "../../components/Common/ActionButton/ActionButton";

import AssignmentsFilterBar from "../../components/Assignments/AssignmentsFilterBar";
import AssignmentsEmptyState from "../../components/Assignments/AssignmentsEmptyState";
import AssignTrainingModal from "../../components/Assignments/AssignTrainingModal";

import "./AssignmentsList.scss";

function AssignmentsList() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);

  return (
    <div className="assignments-page">
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        isMobileOpen={isMobileSidebarOpen}
        onToggle={() => setIsSidebarCollapsed((prev) => !prev)}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      <main
        className={`assignments-content ${
          isSidebarCollapsed ? "sidebar-collapsed" : ""
        }`}
      >
        <Topbar onMenuClick={() => setIsMobileSidebarOpen(true)} />

        <section className="page-header">
          <div>
            <h1>Training Assignments </h1>
            <p>0 total assignments</p>
          </div>
   
          <div className="page-actions">
            <ActionButton icon={Plus} onClick={() => setShowAssignModal(true)}>
              Assign Training
            </ActionButton>
          </div>
        </section>

        <AssignmentsFilterBar />
        <AssignmentsEmptyState />
      </main>

      {showAssignModal && (
        <AssignTrainingModal onClose={() => setShowAssignModal(false)} />
      )}
    </div>
  );
}

export default AssignmentsList;
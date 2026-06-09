import { useState } from "react";
import { Plus } from "lucide-react";

import Sidebar from "../../components/Layout/Sidebar/Sidebar";
import Topbar from "../../components/Layout/Topbar/Topbar";
import ActionButton from "../../components/Common/ActionButton/ActionButton";

import LearningPathsEmptyState from "../../components/LearningPaths/LearningPathsEmptyState";
import AddLearningPathModal from "../../components/LearningPaths/AddLearningPathModal";

import "./LearningPathsList.scss";

function LearningPathsList() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div className="learning-paths-page">
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        isMobileOpen={isMobileSidebarOpen}
        onToggle={() => setIsSidebarCollapsed((prev) => !prev)}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      <main
        className={`learning-paths-content ${
          isSidebarCollapsed ? "sidebar-collapsed" : ""
        }`}
      >
        <Topbar onMenuClick={() => setIsMobileSidebarOpen(true)} />

        <section className="page-header">
          <div>
            <h1>Learning Paths</h1>
            <p>0 learning paths configured</p>
          </div>

          <div className="page-actions">
            <ActionButton icon={Plus} onClick={() => setShowAddModal(true)}>
              Create Path
            </ActionButton>
          </div>
        </section>

        <LearningPathsEmptyState />
      </main>

      {showAddModal && (
        <AddLearningPathModal onClose={() => setShowAddModal(false)} />
      )}
    </div>
  );
}

export default LearningPathsList;
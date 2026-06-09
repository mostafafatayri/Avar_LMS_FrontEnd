import { useState } from "react";
import { Plus } from "lucide-react";

import Sidebar from "../../components/Layout/Sidebar/Sidebar";
import Topbar from "../../components/Layout/Topbar/Topbar";
import ActionButton from "../../components/Common/ActionButton/ActionButton";

import TrainingCatalogueFilterBar from "../../components/TrainingCatalogue/TrainingCatalogueFilterBar";
import TrainingCatalogueTable from "../../components/TrainingCatalogue/TrainingCatalogueTable";
import AddTrainingModal from "../../components/TrainingCatalogue/AddTrainingModal";

import "./TrainingCatalogueList.scss";

function TrainingCatalogueList() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div className="training-page">
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        isMobileOpen={isMobileSidebarOpen}
        onToggle={() => setIsSidebarCollapsed((prev) => !prev)}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      <main className={`training-content ${isSidebarCollapsed ? "sidebar-collapsed" : ""}`}>
        <Topbar onMenuClick={() => setIsMobileSidebarOpen(true)} />

        <section className="page-header">
          <div>
            <h1>Training Catalogue</h1>
            <p>0 trainings in catalogue</p>
          </div>

          <div className="page-actions">
            <ActionButton icon={Plus} onClick={() => setShowAddModal(true)}>
              Add Training
            </ActionButton>
          </div>
        </section>

        <TrainingCatalogueFilterBar />
        <TrainingCatalogueTable />
      </main>

      {showAddModal && <AddTrainingModal onClose={() => setShowAddModal(false)} />}
    </div>
  );
}

export default TrainingCatalogueList;
import { useState } from "react";

import Sidebar from "../../components/Layout/Sidebar/Sidebar";
import Topbar from "../../components/Layout/Topbar/Topbar";

import MyTrainingsStats from "../../components/MyTrainings/MyTrainingsStats";
import MyTrainingsProgress from "../../components/MyTrainings/MyTrainingsProgress";
import MyTrainingsEmptyState from "../../components/MyTrainings/MyTrainingsEmptyState";

import "./MyTrainingsList.scss";

function MyTrainingsList() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="my-trainings-page">
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        isMobileOpen={isMobileSidebarOpen}
        onToggle={() => setIsSidebarCollapsed((prev) => !prev)}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      <main
        className={`my-trainings-content ${
          isSidebarCollapsed ? "sidebar-collapsed" : ""
        }`}
      >
        <Topbar onMenuClick={() => setIsMobileSidebarOpen(true)} />

        <section className="page-header">
          <div>
            <h1>My Trainings</h1>
            <p>Track your learning progress and access training materials</p>
          </div>
        </section>

        <MyTrainingsStats />
        <MyTrainingsProgress />
        <MyTrainingsEmptyState />
      </main>
    </div>
  );
}

export default MyTrainingsList;
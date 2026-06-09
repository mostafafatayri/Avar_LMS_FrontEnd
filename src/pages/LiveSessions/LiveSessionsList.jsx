import Sidebar from "../../components/Layout/Sidebar/Sidebar";
import Topbar from "../../components/Layout/Topbar/Topbar";
import LiveSessionsEmptyCard from "../../components/LiveSessions/LiveSessionsEmptyCard";
import { useState } from "react";

import "./LiveSessionsList.scss";

function LiveSessionsList() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="live-sessions-page">
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        isMobileOpen={isMobileSidebarOpen}
        onToggle={() => setIsSidebarCollapsed((prev) => !prev)}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      <main
        className={`live-sessions-content ${
          isSidebarCollapsed ? "sidebar-collapsed" : ""
        }`}
      >
        <Topbar onMenuClick={() => setIsMobileSidebarOpen(true)} />

        <section className="page-header">
          <div>
            <h1>Live Sessions</h1>
            <p>
              Manage live training sessions, assignments and recording access
              requests
            </p>
          </div>
        </section>

        <LiveSessionsEmptyCard
          title="Live Training Sessions"
          variant="green"
          emptyTitle="No live sessions"
          emptyDescription="Mark trainings as 'Live Session' in the Training Catalogue to see them here"
        />

        <LiveSessionsEmptyCard
          title="Recording Access Requests"
          variant="purple"
          emptyTitle="No recording requests"
          emptyDescription="Requests from employees who missed live sessions will appear here"
        />
      </main>
    </div>
  );
}

export default LiveSessionsList;
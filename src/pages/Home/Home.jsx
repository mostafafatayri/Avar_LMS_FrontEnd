import { useState } from "react";
import Sidebar from "../../components/Layout/Sidebar/Sidebar";
import Topbar from "../../components/Layout/Topbar/Topbar";
import "./Home.scss";

export default function Home() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="home-page">
     <Sidebar
  isCollapsed={isSidebarCollapsed}
  isMobileOpen={isMobileSidebarOpen}
  onToggle={() => setIsSidebarCollapsed((prev) => !prev)}
  onCloseMobile={() => setIsMobileSidebarOpen(false)}
/>


      <main className="home-main">
        <Topbar onMenuClick={() => setIsMobileSidebarOpen((prev) => !prev)} />

        <section className="home-content"></section>
      </main>
    </div>
  );
}
import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Building2,
  GraduationCap,
  BookOpen,
  ClipboardList,
  Video,
  Award,
  BarChart3,
  Settings,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  Layers,
  BriefcaseBusiness,
  GitBranch,
  UserCheck,
  ExternalLink,
  ClipboardCheck,
} from "lucide-react";

import "./Sidebar.scss";

const menuGroups = [
  {
    title: "Overview",
    items: [
      {
        label: "Dashboard",
        path: "/dashboard",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    title: "Organization",
    items: [
      {
        label: "Employees",
        path: "/employees",
        icon: Users,
      },
      {
        label: "Departments",
        path: "/departments",
        icon: Building2,
      },
      {
        label: "Sub-Teams",
        path: "/sub-teams",
        icon: Layers,
      },
      {
        label: "Roles & Titles",
        path: "/roles-titles",
        icon: BriefcaseBusiness,
      },
    ],
  },
  {
    title: "Learning",
    items: [
      {
        label: "Training Catalogue",
        path: "/training-catalogue",
        icon: BookOpen,
      },
      {
        label: "Learning Paths",
        path: "/learning-paths",
        icon: GitBranch,
      },
      {
        label: "Assignments",
        path: "/assignments",
        icon: ClipboardList,
      },
      {
        label: "Live Sessions",
        path: "/live-sessions",
        icon: Video,
      },
      {
        label: "My Trainings",
        path: "/my-trainings",
        icon: UserCheck,
      },
      {
        label: "External Trainings",
        path: "/external-trainings",
        icon: ExternalLink,
      },
      {
        label: "Assessments",
        path: "/assessments",
        icon: ClipboardCheck,
      },
      {
        label: "Certificates",
        path: "/certificates",
        icon: Award,
      },
    ],
  },
  {
    title: "AVAR Academy",
    items: [
      {
        label: "Academy Dashboard",
        path: "/academy-dashboard",
        icon: GraduationCap,
      },
      {
        label: "Academy Learning Paths",
        path: "/academy-learning-paths",
        icon: GitBranch,
      },
    ],
  },
  {
    title: "Analytics",
    items: [
      {
        label: "Analytics Dashboard",
        path: "/analytics",
        icon: BarChart3,
      },
    ],
  },
  {
    title: "System",
    items: [
      {
        label: "Settings",
        path: "/settings",
        icon: Settings,
      },
    ],
  },
];

export default function Sidebar({
  isCollapsed,
  isMobileOpen,
  onToggle,
  onCloseMobile,
}) {
  const [openGroups, setOpenGroups] = useState({
    Overview: true,
    Organization: true,
    Learning: true,
    "AVAR Academy": true,
    Analytics: false,
    System: false,
  });

  const toggleGroup = (title) => {
    setOpenGroups((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <>
      <aside
        className={`sidebar ${isCollapsed ? "collapsed" : ""} ${
          isMobileOpen ? "mobile-open" : ""
        }`}
      >
        <div className="sidebar__header">
          <div className="sidebar__brand">
            <div className="sidebar__logo">A</div>

            {!isCollapsed && (
              <div>
                <h2>AVAR LMS</h2>
                <p>Learning Management</p>
              </div>
            )}
          </div>

          <button className="sidebar__mobile-close" onClick={onCloseMobile}>
            <X size={18} />
          </button>
        </div>

        <nav className="sidebar__nav">
          {menuGroups.map((group) => {
            const isOpen = openGroups[group.title];

            return (
              <div className="sidebar__group" key={group.title}>
                {!isCollapsed && (
                  <button
                    className="sidebar__group-header"
                    onClick={() => toggleGroup(group.title)}
                  >
                    <span>{group.title}</span>
                    {isOpen ? (
                      <ChevronDown size={14} />
                    ) : (
                      <ChevronRight size={14} />
                    )}
                  </button>
                )}

                {(isCollapsed || isOpen) && (
                  <div className="sidebar__items">
                    {group.items.map((item) => {
                      const Icon = item.icon;

                      return (
                        <NavLink
                          key={item.path}
                          to={item.path}
                          className={({ isActive }) =>
                            `sidebar__item ${isActive ? "active" : ""}`
                          }
                          onClick={onCloseMobile}
                        >
                          <Icon size={17} />
                          {!isCollapsed && <span>{item.label}</span>}
                        </NavLink>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="sidebar__footer">
          <button className="sidebar__collapse-btn" onClick={onToggle}>
            <Menu size={16} />
            {!isCollapsed && <span>Collapse</span>}
          </button>
        </div>
      </aside>

      {isMobileOpen && <div className="sidebar-overlay" onClick={onCloseMobile} />}
    </>
  );
}
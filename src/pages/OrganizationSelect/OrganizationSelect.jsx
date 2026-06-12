import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Building2,
  ChevronDown,
  Moon,
  Bell,
  Plus,
  ArrowRight,
  MoreVertical,
  Info,
  MessageCircle,
  Leaf,
  Loader2,
  Settings,
  Edit,
  Shield,
} from "lucide-react";

import { useMyOrganizations } from "../../hooks/useMyOrganizations";
import { setSelectedOrganization } from "../../services/authService";
import "./OrganizationSelect.scss";

const cardThemes = ["blue", "green", "purple"];

function getOrganizationTheme(index) {
  return cardThemes[index % cardThemes.length];
}

function getOrganizationIcon(organization, index) {
  const theme = getOrganizationTheme(index);

  if (theme === "green") return <Leaf size={42} />;
  if (theme === "purple") return <Building2 size={42} />;

  return <span>{organization.name?.charAt(0)?.toUpperCase() || "A"}</span>;
}

export default function OrganizationSelect() {
  const navigate = useNavigate();
  const [openMenuId, setOpenMenuId] = useState(null);

  const {
    data: organizations = [],
    isLoading,
    isError,
    error,
  } = useMyOrganizations();

  const handleSelectOrganization = (organization) => {
    setSelectedOrganization(organization);
    navigate("/home", { replace: true });
  };

  const handleAddOrganization = () => {
    navigate("/organizations/new");
  };

  const handleManageOrganization = (organization) => {
    navigate(`/organizations/${organization.id}/manage`);
  };

  return (
    <div className="org-select-page">
      <header className="org-topbar">
        <div className="org-brand">
          <div className="org-logo">A</div>
          <div>
            <h2>AVAR LMS</h2>
            <p>Learning Management</p>
          </div>
        </div>

        <div className="org-topbar-actions">
          <button className="icon-btn" type="button">
            <Moon size={20} />
          </button>

          <button className="icon-btn notification" type="button">
            <Bell size={20} />
            <span />
          </button>

          <div className="org-user">
            <div className="avatar">SA</div>
            <div>
              <h4>System Admin</h4>
              <p>System User</p>
            </div>
            <ChevronDown size={18} />
          </div>
        </div>
      </header>

      <main className="org-select-content">
        <section className="org-hero">
          <div className="hero-icon">
            <Building2 size={42} />
          </div>

          <h1>Welcome back, System Admin! 👋</h1>
          <p>Select an organization to continue to your dashboard.</p>
        </section>

        <section className="org-section-title">
          <h2>Your Organizations</h2>
          <span />
        </section>

        {isLoading && (
          <div className="org-state-card">
            <Loader2 className="spin" size={30} />
            <h3>Loading your organizations...</h3>
            <p>Please wait while we fetch your available organizations.</p>
          </div>
        )}

        {isError && (
          <div className="org-state-card error">
            <h3>Failed to load organizations</h3>
            <p>
              {error?.response?.data?.message ||
                "Something went wrong while loading your organizations."}
            </p>
          </div>
        )}

        {!isLoading && !isError && (
          <section className="org-grid">
            {organizations.map((organization, index) => {
              const theme = getOrganizationTheme(index);
              const isMenuOpen = openMenuId === organization.id;

              return (
                <div className="org-card" key={organization.id}>
                  <div className={`org-card-icon ${theme}`}>
                    {getOrganizationIcon(organization, index)}
                  </div>

                  <h3>{organization.name}</h3>
                  <h5 className={theme}>{organization.code}</h5>

                  <p>
                    {organization.industry ||
                      organization.description ||
                      "Learning management organization"}
                  </p>

                  <div className="org-card-actions">
                    <button
                      className={`select-org-btn ${theme}`}
                      type="button"
                      onClick={() => handleSelectOrganization(organization)}
                    >
                      Select Organization
                      <ArrowRight size={18} />
                    </button>

                    <div className="org-menu-wrapper">
                      <button
                        className="more-btn"
                        type="button"
                        onClick={() =>
                          setOpenMenuId(isMenuOpen ? null : organization.id)
                        }
                      >
                        <MoreVertical size={20} />
                      </button>

                      {isMenuOpen && (
                        <div className="org-dropdown-menu">
                          <button
                            type="button"
                            onClick={() => handleManageOrganization(organization)}
                          >
                            <Settings size={17} />
                            Manage Organization
                          </button>

                          <button
                            type="button"
                            onClick={() => handleManageOrganization(organization)}
                          >
                            <Edit size={17} />
                            Edit Organization
                          </button>

                          <button
                            type="button"
                            onClick={() => handleManageOrganization(organization)}
                          >
                            <Shield size={17} />
                            License & Access
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            <button
              className="add-org-card"
              type="button"
              onClick={handleAddOrganization}
            >
              <div className="add-icon">
                <Plus size={44} />
              </div>

              <h3>Add Organization</h3>
              <p>Don’t see your organization? Request to add a new one.</p>

              <span>Add Organization</span>
            </button>
          </section>
        )}

        <section className="org-help-card">
          <div className="help-left">
            <div className="help-icon">
              <Info size={24} />
            </div>

            <div>
              <h4>Can’t find the organization you're looking for?</h4>
              <p>
                If you believe you should have access to another organization,
                please contact your system administrator.
              </p>
            </div>
          </div>

          <button type="button">
            <MessageCircle size={18} />
            Contact Administrator
          </button>
        </section>

        <footer className="org-footer">
          © 2025 Avar LMS. All rights reserved.
        </footer>
      </main>
    </div>
  );
}
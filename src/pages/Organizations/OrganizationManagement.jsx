import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Building2,
  CalendarDays,
  Clock,
  Edit,
  ShieldCheck,
  Users,
  Settings,
  UserCog,
  AlertTriangle,
  Loader2,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import { getOrganizationById } from "../../services/organizationsService";
import OrganizationOverview from "../../components/Organizations/OrganizationOverview";
import OrganizationLicense from "../../components/Organizations/OrganizationLicense";
import "./OrganizationManagement.scss";

const tabs = [
  { id: "overview", label: "Overview", icon: Building2 },
  { id: "license", label: "License", icon: ShieldCheck },
  { id: "admins", label: "Administrators", icon: UserCog },
  { id: "users", label: "Users", icon: Users },
  { id: "settings", label: "Settings", icon: Settings },
];

function formatDate(value) {
  if (!value) return "Not set";

  return new Date(value).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function getDaysRemaining(endDate) {
  if (!endDate) return null;

  const today = new Date();
  const end = new Date(endDate);
  const diff = end.getTime() - today.getTime();

  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export default function OrganizationManagement() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("overview");

  const {
    data: organization,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["organization", id],
    queryFn: () => getOrganizationById(id),
    enabled: Boolean(id),
  });

  const daysRemaining = useMemo(
    () => getDaysRemaining(organization?.licenseEndDate),
    [organization?.licenseEndDate]
  );

  const isLicenseExpired = daysRemaining !== null && Number(daysRemaining) < 0;

  if (isLoading) {
    return (
      <div className="org-management-page">
        <div className="org-management-state">
          <Loader2 className="spin" size={34} />
          <h2>Loading organization...</h2>
          <p>Please wait while we load the organization details.</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="org-management-page">
        <div className="org-management-state error">
          <AlertTriangle size={36} />
          <h2>Failed to load organization</h2>
          <p>
            {error?.response?.data?.message ||
              "Something went wrong while loading this organization."}
          </p>

          <button type="button" onClick={() => navigate("/select-organization")}>
            Back to Organizations
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="org-management-page">
      <header className="org-management-header">
        <button type="button" onClick={() => navigate("/select-organization")}>
          <ArrowLeft size={18} />
          Back
        </button>

        <div className="org-management-title">
          <div className="org-management-avatar">
            {organization?.name?.charAt(0)?.toUpperCase() || "O"}
          </div>

          <div>
            <h1>{organization?.name || "Manage Organization"}</h1>
            <p>
              {organization?.code || `Organization ID: ${id}`} ·{" "}
              {organization?.industry || "No industry set"}
            </p>
          </div>
        </div>

        <button className="edit-org-btn" type="button">
          <Edit size={18} />
          Edit Organization
        </button>
      </header>

      <main className="org-management-layout">
        <section className="org-summary-card">
          <div>
            <span className="summary-label">Status</span>
            <h3>{organization?.active ? "Active" : "Inactive"}</h3>
          </div>

          <span
            className={
              organization?.active ? "status-pill active" : "status-pill inactive"
            }
          >
            {organization?.active ? "Active" : "Inactive"}
          </span>
        </section>

        <section className="org-summary-card">
          <div>
            <span className="summary-label">Max Users</span>
            <h3>{organization?.maxUsers || 0}</h3>
          </div>
          <Users size={28} />
        </section>

        <section className="org-summary-card">
          <div>
            <span className="summary-label">License Ends</span>
            <h3>{formatDate(organization?.licenseEndDate)}</h3>
          </div>
          <CalendarDays size={28} />
        </section>

        <section className="org-summary-card">
          <div>
            <span className="summary-label">Days Remaining</span>
            <h3>
              {daysRemaining === null
                ? "Not set"
                : isLicenseExpired
                ? "Expired"
                : `${daysRemaining} days`}
            </h3>
          </div>
          <Clock size={28} />
        </section>

        <section className="org-management-main">
          <aside className="org-tabs">
            {tabs.map((tab) => {
              const Icon = tab.icon;

              return (
                <button
                  key={tab.id}
                  type="button"
                  className={activeTab === tab.id ? "active" : ""}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              );
            })}
          </aside>

          <section className="org-tab-content">
            {activeTab === "overview" && (
              <OrganizationOverview organization={organization} />
            )}

            {activeTab === "license" && (
              <OrganizationLicense
                organization={organization}
                organizationId={id}
                daysRemaining={daysRemaining}
                isLicenseExpired={isLicenseExpired}
              />
            )}

            {activeTab === "admins" && (
              <div className="tab-card">
                <div className="tab-header">
                  <div>
                    <h2>Administrators</h2>
                    <p>Manage users who administer this organization.</p>
                  </div>
                  <UserCog size={26} />
                </div>

                <div className="empty-tab">
                  <UserCog size={40} />
                  <h3>No administrator management yet</h3>
                  <p>Next step: connect organization admins from the backend.</p>
                </div>
              </div>
            )}

            {activeTab === "users" && (
              <div className="tab-card">
                <div className="tab-header">
                  <div>
                    <h2>Users</h2>
                    <p>View user limits and organization access.</p>
                  </div>
                  <Users size={26} />
                </div>

                <div className="empty-tab">
                  <Users size={40} />
                  <h3>User usage coming next</h3>
                  <p>
                    We will connect this to employees/users after the API is
                    ready.
                  </p>
                </div>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="tab-card">
                <div className="tab-header">
                  <div>
                    <h2>Settings</h2>
                    <p>Advanced settings and organization control.</p>
                  </div>
                  <Settings size={26} />
                </div>

                <div className="settings-actions">
                  <button type="button" className="secondary-action">
                    <Edit size={18} />
                    Edit Organization
                  </button>

                  <button type="button" className="danger-action">
                    <AlertTriangle size={18} />
                    Deactivate Organization
                  </button>
                </div>
              </div>
            )}
          </section>
        </section>
      </main>
    </div>
  );
}
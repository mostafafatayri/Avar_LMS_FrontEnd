import { useEffect, useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Save,
  ShieldCheck,
} from "lucide-react";

import { useUpdateOrganization } from "../../hooks/useUpdateOrganization";
import "./OrganizationLicense.scss";
function formatDate(value) {
  if (!value) return "Not set";

  return new Date(value).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function toDateInputValue(value) {
  if (!value) return "";
  return String(value).slice(0, 10);
}

export default function OrganizationLicense({
  organization,
  organizationId,
  daysRemaining,
  isLicenseExpired,
}) {
  const [licenseForm, setLicenseForm] = useState({
    licenseStartDate: "",
    licenseEndDate: "",
    maxUsers: 50,
  });

  const updateOrganizationMutation = useUpdateOrganization(organizationId);

  useEffect(() => {
    if (!organization) return;

    setLicenseForm({
      licenseStartDate: toDateInputValue(organization.licenseStartDate),
      licenseEndDate: toDateInputValue(organization.licenseEndDate),
      maxUsers: organization.maxUsers || 50,
    });
  }, [organization]);

  const handleLicenseChange = (event) => {
    const { name, value } = event.target;

    setLicenseForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveLicense = () => {
    if (!organization) return;

    updateOrganizationMutation.mutate({
      code: organization.code,
      name: organization.name,
      industry: organization.industry,
      contactEmail: organization.contactEmail,
      contactPhone: organization.contactPhone,
      logoUrl: organization.logoUrl,
      active: organization.active,
      licenseStartDate: licenseForm.licenseStartDate || null,
      licenseEndDate: licenseForm.licenseEndDate || null,
      maxUsers: Number(licenseForm.maxUsers || 50),
    });
  };

  return (
    <div className="tab-card">
      <div className="tab-header">
        <div>
          <h2>License & Subscription</h2>
          <p>Manage license dates, limits, and subscription health.</p>
        </div>
        <ShieldCheck size={26} />
      </div>

      <div className="license-panel">
        <div className="license-status">
          {isLicenseExpired ? (
            <AlertTriangle size={34} />
          ) : (
            <CheckCircle2 size={34} />
          )}

          <div>
            <h3>{isLicenseExpired ? "License Expired" : "License Active"}</h3>
            <p>
              {daysRemaining === null
                ? "No license end date has been configured."
                : isLicenseExpired
                ? "This organization license has expired."
                : `${daysRemaining} days remaining before expiry.`}
            </p>
          </div>
        </div>

        <div className="license-form-grid">
          <div className="license-field">
            <label>License Start Date</label>
            <input
              type="date"
              name="licenseStartDate"
              value={licenseForm.licenseStartDate}
              onChange={handleLicenseChange}
            />
            <span>Current: {formatDate(organization?.licenseStartDate)}</span>
          </div>

          <div className="license-field">
            <label>License End Date</label>
            <input
              type="date"
              name="licenseEndDate"
              value={licenseForm.licenseEndDate}
              onChange={handleLicenseChange}
            />
            <span>Current: {formatDate(organization?.licenseEndDate)}</span>
          </div>

          <div className="license-field">
            <label>Maximum Users</label>
            <input
              type="number"
              name="maxUsers"
              min="1"
              value={licenseForm.maxUsers}
              onChange={handleLicenseChange}
            />
            <span>Current limit: {organization?.maxUsers || 0}</span>
          </div>

          <div className="license-field readonly">
            <label>Current Plan</label>
            <input value="Standard" readOnly />
            <span>Plan upgrade will be added later.</span>
          </div>
        </div>

        {updateOrganizationMutation.isError && (
          <div className="license-error">
            {updateOrganizationMutation.error?.response?.data?.message ||
              "Failed to update license."}
          </div>
        )}

        {updateOrganizationMutation.isSuccess && (
          <div className="license-success">License updated successfully.</div>
        )}

        <div className="license-actions">
          <button
            type="button"
            className="save-license-btn"
            onClick={handleSaveLicense}
            disabled={updateOrganizationMutation.isPending}
          >
            <Save size={18} />
            {updateOrganizationMutation.isPending ? "Saving..." : "Save License"}
          </button>
        </div>
      </div>
    </div>
  );
}
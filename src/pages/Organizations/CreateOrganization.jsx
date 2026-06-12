import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Building2,
  Mail,
  Phone,
  Calendar,
  Users,
  BriefcaseBusiness,
  Save,
} from "lucide-react";

import { createOrganization } from "../../services/organizationsService";
import "./CreateOrganization.scss";

const initialFormData = {
  name: "",
  code: "",
  industry: "",
  contactEmail: "",
  contactPhone: "",
  logoUrl: "",
  licenseStartDate: "",
  licenseEndDate: "",
  maxUsers: 50,
  active: true,
};

export default function CreateOrganization() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialFormData);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    if (!formData.name.trim() || !formData.code.trim()) {
      setErrorMessage("Organization name and code are required.");
      return;
    }

    try {
      setIsSaving(true);

      await createOrganization({
        ...formData,
        maxUsers: Number(formData.maxUsers || 50),
      });

      navigate("/select-organization", { replace: true });
    } catch (error) {
      console.error("Create organization error:", error);

      setErrorMessage(
        error?.response?.data?.message ||
          error?.response?.data?.error ||
          "Failed to create organization."
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="create-org-page">
      <header className="create-org-topbar">
        <div className="create-org-brand">
          <div className="create-org-logo">A</div>
          <div>
            <h2>AVAR LMS</h2>
            <p>Organization Management</p>
          </div>
        </div>

        <button
          className="back-btn"
          type="button"
          onClick={() => navigate("/select-organization")}
        >
          <ArrowLeft size={18} />
          Back to organizations
        </button>
      </header>

      <main className="create-org-content">
        <section className="create-org-hero">
          <div className="hero-icon">
            <Building2 size={38} />
          </div>

          <h1>Create New Organization</h1>
          <p>Add a new tenant organization to AVAR LMS.</p>
        </section>

        <form className="create-org-card" onSubmit={handleSubmit}>
          {errorMessage && (
            <div className="create-org-error">{errorMessage}</div>
          )}

          <div className="form-grid">
            <div className="form-field">
              <label>Organization Name *</label>
              <div className="input-shell">
                <Building2 size={19} />
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Avar Facilities"
                />
              </div>
            </div>

            <div className="form-field">
              <label>Organization Code *</label>
              <div className="input-shell">
                <BriefcaseBusiness size={19} />
                <input
                  name="code"
                  value={formData.code}
                  onChange={handleChange}
                  placeholder="e.g. AVAR-FAC"
                />
              </div>
            </div>

            <div className="form-field">
              <label>Industry</label>
              <div className="input-shell">
                <BriefcaseBusiness size={19} />
                <input
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  placeholder="e.g. Facility Management"
                />
              </div>
            </div>

            <div className="form-field">
              <label>Maximum Users</label>
              <div className="input-shell">
                <Users size={19} />
                <input
                  type="number"
                  name="maxUsers"
                  value={formData.maxUsers}
                  onChange={handleChange}
                  min="1"
                />
              </div>
            </div>

            <div className="form-field">
              <label>Contact Email</label>
              <div className="input-shell">
                <Mail size={19} />
                <input
                  type="email"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleChange}
                  placeholder="admin@company.com"
                />
              </div>
            </div>

            <div className="form-field">
              <label>Contact Phone</label>
              <div className="input-shell">
                <Phone size={19} />
                <input
                  name="contactPhone"
                  value={formData.contactPhone}
                  onChange={handleChange}
                  placeholder="+961 ..."
                />
              </div>
            </div>

            <div className="form-field">
              <label>License Start Date</label>
              <div className="input-shell">
                <Calendar size={19} />
                <input
                  type="date"
                  name="licenseStartDate"
                  value={formData.licenseStartDate}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-field">
              <label>License End Date</label>
              <div className="input-shell">
                <Calendar size={19} />
                <input
                  type="date"
                  name="licenseEndDate"
                  value={formData.licenseEndDate}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-field full-width">
              <label>Logo URL</label>
              <div className="input-shell">
                <Building2 size={19} />
                <input
                  name="logoUrl"
                  value={formData.logoUrl}
                  onChange={handleChange}
                  placeholder="https://..."
                />
              </div>
            </div>
          </div>

          <label className="active-toggle">
            <input
              type="checkbox"
              name="active"
              checked={formData.active}
              onChange={handleChange}
            />
            Organization is active
          </label>

          <div className="form-actions">
            <button
              className="cancel-btn"
              type="button"
              onClick={() => navigate("/select-organization")}
            >
              Cancel
            </button>

            <button className="save-btn" type="submit" disabled={isSaving}>
              <Save size={18} />
              {isSaving ? "Creating..." : "Create Organization"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
import { Building2, Mail, Phone } from "lucide-react";

function formatDate(value) {
  if (!value) return "Not set";

  return new Date(value).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function OrganizationOverview({ organization }) {
  return (
    <div className="tab-card">
      <div className="tab-header">
        <div>
          <h2>Organization Overview</h2>
          <p>Basic organization profile and contact information.</p>
        </div>
        <Building2 size={26} />
      </div>

      <div className="details-grid">
        <div>
          <label>Organization Name</label>
          <p>{organization?.name || "Not set"}</p>
        </div>

        <div>
          <label>Organization Code</label>
          <p>{organization?.code || "Not set"}</p>
        </div>

        <div>
          <label>Industry</label>
          <p>{organization?.industry || "Not set"}</p>
        </div>

        <div>
          <label>Status</label>
          <p>{organization?.active ? "Active" : "Inactive"}</p>
        </div>

        <div>
          <label>Contact Email</label>
          <p>
            <Mail size={16} />
            {organization?.contactEmail || "Not set"}
          </p>
        </div>

        <div>
          <label>Contact Phone</label>
          <p>
            <Phone size={16} />
            {organization?.contactPhone || "Not set"}
          </p>
        </div>

        <div>
          <label>Created At</label>
          <p>{formatDate(organization?.creationDate)}</p>
        </div>

        <div>
          <label>Last Modified</label>
          <p>{formatDate(organization?.modificationDate)}</p>
        </div>
      </div>
    </div>
  );
}
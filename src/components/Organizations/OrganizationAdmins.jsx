import { useState } from "react";
import "./OrganizationAdmins.scss";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  AlertTriangle,
  Globe2,
  Loader2,
  Mail,
  Plus,
  Search,
  ShieldCheck,
  Trash2,
  UserCog,
} from "lucide-react";

import {
  attachOrganizationDomain,
  getOrganizationAdmins,
  getOrganizationDomain,
  removeOrganizationDomain,
} from "../../services/organizationsService";

export default function OrganizationAdmins({ organization, organizationId }) {
  const queryClient = useQueryClient();

  const [domainValue, setDomainValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: domain,
    isLoading: domainLoading,
    isError: domainError,
  } = useQuery({
    queryKey: ["organization-domain", organizationId],
    queryFn: () => getOrganizationDomain(organizationId),
    enabled: Boolean(organizationId),
  });

  const {
    data: admins = [],
    isLoading: adminsLoading,
    isError: adminsError,
  } = useQuery({
    queryKey: ["organization-admins", organizationId],
    queryFn: () => getOrganizationAdmins(organizationId),
    enabled: Boolean(organizationId),
  });

  const attachDomainMutation = useMutation({
    mutationFn: () =>
      attachOrganizationDomain(organizationId, {
        domain: domainValue,
        allowed: true,
      }),
    onSuccess: () => {
      setDomainValue("");

      queryClient.invalidateQueries({
        queryKey: ["organization-domain", organizationId],
      });

      queryClient.invalidateQueries({
        queryKey: ["organization", organizationId],
      });
    },
  });

  const removeDomainMutation = useMutation({
    mutationFn: () => removeOrganizationDomain(organizationId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["organization-domain", organizationId],
      });

      queryClient.invalidateQueries({
        queryKey: ["organization", organizationId],
      });
    },
  });

  const filteredAdmins = admins.filter((user) => {
    const keyword = searchTerm.trim().toLowerCase();

    if (!keyword) return true;

    return (
      user.fullName?.toLowerCase().includes(keyword) ||
      user.username?.toLowerCase().includes(keyword) ||
      user.email?.toLowerCase().includes(keyword)
    );
  });

  const handleAttachDomain = () => {
    if (!domainValue.trim()) return;
    attachDomainMutation.mutate();
  };

  return (
    <div className="tab-card">
      <div className="tab-header">
        <div>
          <h2>Administrators</h2>
          <p>
            Manage users who can administer{" "}
            {organization?.name || "this organization"}.
          </p>
        </div>

        <UserCog size={26} />
      </div>

      <section className="org-domain-card">
        <div className="org-domain-header">
          <div className="org-domain-icon">
            <Globe2 size={24} />
          </div>

          <div>
            <h3>Organization Domain</h3>
            <p>
              Attach a company domain. Users from this domain will be managed in
              the Users tab.
            </p>
          </div>
        </div>

        {domainLoading && (
          <div className="domain-state">
            <Loader2 className="spin" size={22} />
            Loading domain...
          </div>
        )}

        {domainError && (
          <div className="domain-alert error">
            <AlertTriangle size={18} />
            Failed to load organization domain.
          </div>
        )}

        {!domainLoading && !domain && (
          <div className="domain-form">
            <input
              type="text"
              placeholder="example: fatayritech.com"
              value={domainValue}
              onChange={(event) => setDomainValue(event.target.value)}
            />

            <button
              type="button"
              onClick={handleAttachDomain}
              disabled={attachDomainMutation.isPending}
            >
              <Plus size={18} />
              {attachDomainMutation.isPending ? "Attaching..." : "Attach Domain"}
            </button>
          </div>
        )}

        {!domainLoading && domain && (
          <div className="attached-domain">
            <div>
              <span>Attached Domain</span>
              <h4>@{domain.domain}</h4>
              <p>{domain.allowed ? "Domain is allowed" : "Domain is blocked"}</p>
            </div>

            <button
              type="button"
              onClick={() => removeDomainMutation.mutate()}
              disabled={removeDomainMutation.isPending}
            >
              <Trash2 size={17} />
              {removeDomainMutation.isPending ? "Removing..." : "Remove"}
            </button>
          </div>
        )}
      </section>

      <section className="domain-users-section">
        <div className="admins-toolbar">
          <div>
            <h3>Current Administrators</h3>
            <p>
              Only users with ADMIN or SUPER_ADMIN roles assigned to this
              organization appear here.
            </p>
          </div>

          <button type="button">
            <Mail size={18} />
            Invite Admin
          </button>
        </div>

        <div className="domain-users-filter">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search administrators by name, username, or email..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>

        {adminsLoading && (
          <div className="empty-tab">
            <Loader2 className="spin" size={36} />
            <h3>Loading administrators...</h3>
            <p>Please wait while we fetch organization administrators.</p>
          </div>
        )}

        {adminsError && (
          <div className="empty-tab">
            <AlertTriangle size={40} />
            <h3>Failed to load administrators</h3>
            <p>Something went wrong while loading organization admins.</p>
          </div>
        )}

        {!adminsLoading && !adminsError && filteredAdmins.length === 0 && (
          <div className="empty-tab">
            <ShieldCheck size={40} />
            <h3>No administrators found</h3>
            <p>No admin users are currently assigned to this organization.</p>
          </div>
        )}

        {!adminsLoading && !adminsError && filteredAdmins.length > 0 && (
          <div className="admins-table">
            {filteredAdmins.map((user) => (
              <div className="admin-row" key={user.id}>
                <div className="admin-avatar">
                  {user.fullName?.charAt(0)?.toUpperCase() ||
                    user.username?.charAt(0)?.toUpperCase() ||
                    "A"}
                </div>

                <div className="admin-info">
                  <h4>{user.fullName || user.username}</h4>
                  <p>
                    <Mail size={15} />
                    {user.email}
                  </p>
                </div>

                <span className="admin-role">Administrator</span>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
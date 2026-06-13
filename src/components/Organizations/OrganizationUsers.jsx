import { useState } from "react";
import "./OrganizationUsers.scss";
import { useQuery } from "@tanstack/react-query";
import {
  AlertTriangle,
  Loader2,
  Mail,
  Search,
  ShieldCheck,
  Users,
} from "lucide-react";

import { getOrganizationDomainUsers } from "../../services/organizationsService";

export default function OrganizationUsers({ organization, organizationId }) {
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: users = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["organization-domain-users", organizationId],
    queryFn: () => getOrganizationDomainUsers(organizationId),
    enabled: Boolean(organizationId),
  });

  const filteredUsers = users.filter((user) => {
    const keyword = searchTerm.trim().toLowerCase();

    if (!keyword) return true;

    return (
      user.fullName?.toLowerCase().includes(keyword) ||
      user.username?.toLowerCase().includes(keyword) ||
      user.email?.toLowerCase().includes(keyword)
    );
  });

  return (
    <div className="tab-card">
      <div className="tab-header">
        <div>
          <h2>Users</h2>
          <p>
            Users connected to {organization?.name || "this organization"} by
            domain.
          </p>
        </div>

        <Users size={26} />
      </div>

      <div className="org-users-toolbar">
        <div>
          <h3>Domain Users</h3>
          <p>
            These users have the same email domain attached to this organization.
          </p>
        </div>

        <span>{users.length} users</span>
      </div>

      <div className="org-users-filter">
        <Search size={18} />
        <input
          type="text"
          placeholder="Search users by name, username, or email..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </div>

      {isLoading && (
        <div className="empty-tab">
          <Loader2 className="spin" size={36} />
          <h3>Loading users...</h3>
          <p>Please wait while we fetch organization domain users.</p>
        </div>
      )}

      {isError && (
        <div className="empty-tab">
          <AlertTriangle size={40} />
          <h3>Failed to load users</h3>
          <p>Something went wrong while loading users.</p>
        </div>
      )}

      {!isLoading && !isError && filteredUsers.length === 0 && (
        <div className="empty-tab">
          <Users size={40} />
          <h3>No users found</h3>
          <p>No users currently match this organization domain.</p>
        </div>
      )}

      {!isLoading && !isError && filteredUsers.length > 0 && (
        <div className="org-users-table">
          {filteredUsers.map((user) => (
            <div className="org-user-row" key={user.id}>
              <div className="org-user-avatar">
                {user.fullName?.charAt(0)?.toUpperCase() ||
                  user.username?.charAt(0)?.toUpperCase() ||
                  "U"}
              </div>

              <div className="org-user-info">
                <h4>{user.fullName || user.username}</h4>
                <p>
                  <Mail size={15} />
                  {user.email}
                </p>
              </div>

              <span className="org-user-badge">Domain User</span>

              <button type="button" className="promote-user-btn">
                <ShieldCheck size={17} />
                Make Admin
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
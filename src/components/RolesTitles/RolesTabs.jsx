export default function RolesTabs({
  activeTab,
  onTabChange,
  rolesCount,
  jobTitlesCount,
  specializationsCount,
}) {
  return (
    <div className="roles-tabs">
      <button
        type="button"
        className={activeTab === "roles" ? "active" : ""}
        onClick={() => onTabChange("roles")}
      >
        Roles ({rolesCount})
      </button>

      <button
        type="button"
        className={activeTab === "jobTitles" ? "active" : ""}
        onClick={() => onTabChange("jobTitles")}
      >
        Job Titles ({jobTitlesCount})
      </button>

      <button
        type="button"
        className={activeTab === "specializations" ? "active" : ""}
        onClick={() => onTabChange("specializations")}
      >
        Specializations ({specializationsCount})
      </button>
    </div>
  );
}
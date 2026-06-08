import { RotateCcw, Search } from "lucide-react";

export default function PositionFilterBar({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  departmentFilter,
  setDepartmentFilter,
  departments,
}) {
  return (
    <div className="position-filter-bar">
      <div className="position-search">
        <Search size={18} />
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by position name, code, or description..."
        />
      </div>

      <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
        <option value="ALL">All Statuses</option>
        <option value="ACTIVE">Active</option>
        <option value="INACTIVE">Inactive</option>
      </select>

      <select
        value={departmentFilter}
        onChange={(e) => setDepartmentFilter(e.target.value)}
      >
        <option value="ALL">All Departments</option>
        {departments.map((department) => (
          <option key={department} value={department}>
            {department}
          </option>
        ))}
      </select>

      <button
        type="button"
        className="clear-filter-btn"
        onClick={() => {
          setSearchTerm("");
          setStatusFilter("ALL");
          setDepartmentFilter("ALL");
        }}
      >
        <RotateCcw size={16} />
        Clear Filters
      </button>
    </div>
  );
}
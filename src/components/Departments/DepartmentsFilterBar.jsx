import { Search, SlidersHorizontal } from "lucide-react";
import FilterCard from "../Common/FilterCard/FilterCard";
import "../Common/FilterCard/FilterCard.scss";

export default function DepartmentsFilterBar({
  searchTerm,
  statusFilter,
  sortBy,
  onSearchChange,
  onStatusChange,
  onSortChange,
}) {
  return (
    <FilterCard>
      <div className="filter-search">
        <label>Search</label>
        <div className="search-input">
          <Search size={18} />
          <input
            placeholder="Search departments..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>

      <div className="filter-field">
        <label>Status</label>
        <select
          value={statusFilter}
          onChange={(e) => onStatusChange(e.target.value)}
        >
          <option value="ALL">All Status</option>
          <option value="ACTIVE">Active</option>
          <option value="INACTIVE">Inactive</option>
        </select>
      </div>

      <div className="filter-field">
        <label>Sort By</label>
        <select value={sortBy} onChange={(e) => onSortChange(e.target.value)}>
          <option value="NAME_ASC">Name (A-Z)</option>
          <option value="NAME_DESC">Name (Z-A)</option>
          <option value="EMPLOYEES_DESC">Most Employees</option>
          <option value="EMPLOYEES_ASC">Least Employees</option>
        </select>
      </div>

      <button className="filter-btn" type="button">
        <SlidersHorizontal size={17} />
        Filters
      </button>
    </FilterCard>
  );
}
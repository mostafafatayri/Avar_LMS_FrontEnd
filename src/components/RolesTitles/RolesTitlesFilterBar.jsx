import { Search, SlidersHorizontal } from "lucide-react";
import FilterCard from "../Common/FilterCard/FilterCard";
import "../Common/FilterCard/FilterCard.scss";

export default function RolesTitlesFilterBar() {
  return (
    <FilterCard>
      <div className="filter-search">
        <label>Search</label>
        <div className="search-input">
          <Search size={18} />
          <input placeholder="Search roles or titles..." />
        </div>
      </div>

      <div className="filter-field">
        <label>Type</label> 
        <select>
          <option>All Types</option>
          <option>System</option>
          <option>Custom</option>
          <option>Title</option>
        </select>
      </div>

      <div className="filter-field">
        <label>Status</label>
        <select>
          <option>All Status</option>
          <option>Active</option>
          <option>Inactive</option>
        </select>
      </div>

      <div className="filter-field">
        <label>Sort By</label>
        <select>
          <option>Name (A-Z)</option>
          <option>Name (Z-A)</option>
          <option>Most Users</option>
          <option>Newest</option>
        </select>
      </div>

      <button className="filter-btn">
        <SlidersHorizontal size={17} />
        Filters
      </button>
    </FilterCard>
  );
}
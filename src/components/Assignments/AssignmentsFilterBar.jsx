import { Search } from "lucide-react";
import FilterCard from "../Common/FilterCard/FilterCard";
import "../Common/FilterCard/FilterCard.scss";

export default function AssignmentsFilterBar() {
  return (
    <FilterCard>
      <div className="filter-search">
        <div className="search-input">
          <Search size={18} />
          <input placeholder="Search by employee or training..." />
        </div>
      </div>

      <div className="filter-field">
        <select>
          <option>All Status</option>
          <option>Assigned</option>
          <option>In Progress</option>
          <option>Completed</option>
          <option>Overdue</option>
        </select>
      </div>
    </FilterCard>
  );
}
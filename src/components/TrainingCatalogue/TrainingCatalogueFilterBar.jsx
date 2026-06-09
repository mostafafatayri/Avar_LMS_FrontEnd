import { Search } from "lucide-react";
import FilterCard from "../Common/FilterCard/FilterCard";
import "../Common/FilterCard/FilterCard.scss";

export default function TrainingCatalogueFilterBar() {
  return (
    <FilterCard>
      <div className="filter-search">
        <div className="search-input">
          <Search size={18} />
          <input placeholder="Search trainings..." />
        </div>
      </div>

      <div className="filter-field">
        <select>
          <option>All Status</option>
          <option>Draft</option>
          <option>Published</option>
          <option>Archived</option>
        </select>
      </div>
    </FilterCard>
  );
}
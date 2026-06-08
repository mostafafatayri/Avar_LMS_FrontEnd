import { Search } from "lucide-react";

export default function EmployeesFilterBar() {
  return (
    <div className="employees-filter-bar">
      <div className="search-box">
        <Search size={18} />
        <input
          placeholder="Search employees..."
        />
      </div>

      <select>
        <option>Department</option>
      </select>

      <select>
        <option>Role</option>
      </select>

      <select>
        <option>Status</option>
      </select>
    </div>
  );
}
import { useMemo, useState } from "react";
import { Plus, UploadCloud } from "lucide-react";

import Sidebar from "../../components/Layout/Sidebar/Sidebar";
import Topbar from "../../components/Layout/Topbar/Topbar";
import ActionButton from "../../components/Common/ActionButton/ActionButton";
import BulkUploadModal from "../../components/Common/BulkUploadModal/BulkUploadModal";

import DepartmentStats from "../../components/Departments/DepartmentStats";
import DepartmentsFilterBar from "../../components/Departments/DepartmentsFilterBar";
import DepartmentsTable from "../../components/Departments/DepartmentsTable";
import AddDepartmentModal from "../../components/Departments/AddDepartmentModal";

import { useDepartments } from "../../hooks/useDepartments";
import { useBulkUploadDepartments } from "../../hooks/useBulkUploadDepartments";

import "./DepartmentsList.scss";

function DepartmentsList() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showBulkModal, setShowBulkModal] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [sortBy, setSortBy] = useState("NAME_ASC");
const handleBulkUpload = async (file) => {
  await bulkUploadMutation.mutateAsync(file);
  setShowBulkModal(false);
};
  const { data, isLoading, isError, error } = useDepartments();
  const bulkUploadMutation = useBulkUploadDepartments();

  const departments = Array.isArray(data) ? data : data?.data || [];

  const filteredDepartments = useMemo(() => {
    let result = [...departments];

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();

      result = result.filter((department) => {
        return (
          department.name?.toLowerCase().includes(term) ||
          department.code?.toLowerCase().includes(term) ||
          department.managerName?.toLowerCase().includes(term)
        );
      });
    }

    if (statusFilter !== "ALL") {
      result = result.filter((department) =>
        statusFilter === "ACTIVE" ? department.active === true : department.active === false
      );
    }

    if (sortBy === "NAME_ASC") {
      result.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
    }

    if (sortBy === "NAME_DESC") {
      result.sort((a, b) => (b.name || "").localeCompare(a.name || ""));
    }

    if (sortBy === "EMPLOYEES_DESC") {
      result.sort((a, b) => (b.employeeCount || 0) - (a.employeeCount || 0));
    }

    if (sortBy === "EMPLOYEES_ASC") {
      result.sort((a, b) => (a.employeeCount || 0) - (b.employeeCount || 0));
    }

    return result;
  }, [departments, searchTerm, statusFilter, sortBy]);



  return (
    <div className="departments-page">
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        isMobileOpen={isMobileSidebarOpen}
        onToggle={() => setIsSidebarCollapsed((prev) => !prev)}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      <main
        className={`departments-content ${
          isSidebarCollapsed ? "sidebar-collapsed" : ""
        }`}
      >
        <Topbar onMenuClick={() => setIsMobileSidebarOpen(true)} />

        <section className="page-header">
          <div>
            <h1>Departments</h1>
            <p>Manage departments and their structure.</p>
          </div>

          <div className="page-actions">
            <ActionButton
              icon={UploadCloud}
              variant="secondary"
              onClick={() => setShowBulkModal(true)}
            >
              Import Departments
            </ActionButton>

            <ActionButton icon={Plus} onClick={() => setShowAddModal(true)}>
              Add Department
            </ActionButton>
          </div>
        </section>

        {isError && (
          <div className="page-error">
            {error?.response?.data?.message || "Failed to load departments."}
          </div>
        )}

        <DepartmentStats departments={departments} />

        <DepartmentsFilterBar
          searchTerm={searchTerm}
          statusFilter={statusFilter}
          sortBy={sortBy}
          onSearchChange={setSearchTerm}
          onStatusChange={setStatusFilter}
          onSortChange={setSortBy}
        />

        <DepartmentsTable
          departments={filteredDepartments}
          isLoading={isLoading}
        />
      </main>

      {showAddModal && (
        <AddDepartmentModal onClose={() => setShowAddModal(false)} />
      )}

      {showBulkModal && (
          <BulkUploadModal
           onClose={() => setShowBulkModal(false)}
           onUpload={handleBulkUpload}
           isLoading={bulkUploadMutation.isPending}
           title="Import Departments"
           description="Upload an Excel file to create departments in bulk."
           uploadButtonText="Upload Departments"/>)}
    </div>
  );
}

export default DepartmentsList;
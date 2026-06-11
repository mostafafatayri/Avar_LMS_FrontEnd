import { useMemo, useState } from "react";
import { Plus, UploadCloud } from "lucide-react";

import Sidebar from "../../components/Layout/Sidebar/Sidebar";
import Topbar from "../../components/Layout/Topbar/Topbar";
import ActionButton from "../../components/Common/ActionButton/ActionButton";

import EmployeeStats from "../../components/Employees/EmployeeStats";
import EmployeesFilterBar from "../../components/Employees/EmployeesFilterBar";
import EmployeesTable from "../../components/Employees/EmployeesTable";
import AddEmployeeModal from "../../components/Employees/AddEmployeeModal";
import BulkUploadModal from "../../components/Common/BulkUploadModal/BulkUploadModal";

import { useEmployees } from "../../hooks/useEmployees";
import { bulkUploadEmployees } from "../../services/employeeService";

import "./EmployeesList.scss";

export default function EmployeesList() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);
  const [showBulkUploadModal, setShowBulkUploadModal] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const { data = [], isLoading, isError, error, refetch } = useEmployees();

  const employees = Array.isArray(data) ? data : [];

  const filteredEmployees = useMemo(() => {
    let result = [...employees];

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();

      result = result.filter((employee) => {
        return (
          employee.fullName?.toLowerCase().includes(term) ||
          employee.email?.toLowerCase().includes(term) ||
          employee.employeeId?.toLowerCase().includes(term) ||
          employee.department?.toLowerCase().includes(term) ||
          employee.jobTitle?.toLowerCase().includes(term)
        );
      });
    }

    if (departmentFilter !== "ALL") {
      result = result.filter(
        (employee) => employee.department === departmentFilter
      );
    }

    if (statusFilter !== "ALL") {
      result = result.filter((employee) => employee.status === statusFilter);
    }

    return result;
  }, [employees, searchTerm, departmentFilter, statusFilter]);

  const departmentOptions = useMemo(() => {
    const uniqueDepartments = new Set();

    employees.forEach((employee) => {
      if (employee.department && employee.department !== "-") {
        uniqueDepartments.add(employee.department);
      }
    });

    return Array.from(uniqueDepartments);
  }, [employees]);

  const handleBulkUpload = async (file) => {
    await bulkUploadEmployees(file);
    setShowBulkUploadModal(false);
    refetch();
  };

  return (
    <div className="employees-page">
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        isMobileOpen={isMobileSidebarOpen}
        onToggle={() => setIsSidebarCollapsed((prev) => !prev)}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      <main
        className={`employees-content ${
          isSidebarCollapsed ? "sidebar-collapsed" : ""
        }`}
      >
        <Topbar onMenuClick={() => setIsMobileSidebarOpen(true)} />

        <section className="page-header">
          <div>
            <h1>Employees</h1>
            <p>Manage employees, departments, roles, and training assignments.</p>
          </div>

          <div className="page-actions">
            <ActionButton
              icon={UploadCloud}
              variant="secondary"
              onClick={() => setShowBulkUploadModal(true)}
            >
              Bulk Upload
            </ActionButton>

            <ActionButton
              icon={Plus}
              variant="primary"
              onClick={() => setShowAddEmployeeModal(true)}
            >
              Add Employee
            </ActionButton>
          </div>
        </section>

        {isError && (
          <div className="page-error">
            {error?.response?.data?.message || "Failed to load employees."}
          </div>
        )}

        <EmployeeStats employees={employees} />

        <EmployeesFilterBar
          searchTerm={searchTerm}
          departmentFilter={departmentFilter}
          statusFilter={statusFilter}
          departmentOptions={departmentOptions}
          onSearchChange={setSearchTerm}
          onDepartmentChange={setDepartmentFilter}
          onStatusChange={setStatusFilter}
        />

        <EmployeesTable employees={filteredEmployees} isLoading={isLoading} />
      </main>

      {showAddEmployeeModal && (
        <AddEmployeeModal
          onClose={() => setShowAddEmployeeModal(false)}
          onSuccess={refetch}
        />
      )}

      {showBulkUploadModal && (
        <BulkUploadModal
          onClose={() => setShowBulkUploadModal(false)}
          onUpload={handleBulkUpload}
          title="Bulk Upload Employees"
          description="Upload an Excel file to create employees in bulk."
          uploadButtonText="Upload Employees"
        />
      )}
    </div>
  );
}
import { useState } from "react";
import { Plus, UploadCloud } from "lucide-react";

import Sidebar from "../../components/Layout/Sidebar/Sidebar";
import Topbar from "../../components/Layout/Topbar/Topbar";
import ActionButton from "../../components/Common/ActionButton/ActionButton";

import EmployeeStats from "../../components/Employees/EmployeeStats";
import EmployeesFilterBar from "../../components/Employees/EmployeesFilterBar";
import EmployeesTable from "../../components/Employees/EmployeesTable";
import AddEmployeeModal from "../../components/Employees/AddEmployeeModal";
import BulkUploadModal from "../../components/Common/BulkUploadModal/BulkUploadModal";

import "./EmployeesList.scss";

export default function EmployeesList() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);
  const [showBulkUploadModal, setShowBulkUploadModal] = useState(false);

  
  const openAddEmployeeModal = () => {
    console.log("helllowwww")
    
    setShowAddEmployeeModal(true);
  };

  const closeAddEmployeeModal = () => {
    setShowAddEmployeeModal(false);
  };

  const openBulkUploadModal = () => {
    setShowBulkUploadModal(true);
  };

  const closeBulkUploadModal = () => {
    setShowBulkUploadModal(false);
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
              onClick={openBulkUploadModal}
            >
              Bulk Upload
            </ActionButton>

            <ActionButton
              icon={Plus}
              variant="primary"
              onClick={openAddEmployeeModal}
            >
              Add Employee
            </ActionButton>
          </div>
        </section>

        <EmployeeStats />
        <EmployeesFilterBar />
        <EmployeesTable />
      </main>

      {showAddEmployeeModal === true && (
        <AddEmployeeModal onClose={closeAddEmployeeModal} />
      )}

      {showBulkUploadModal === true && (
        <BulkUploadModal onClose={closeBulkUploadModal} />
      )}
    </div>
  );
}
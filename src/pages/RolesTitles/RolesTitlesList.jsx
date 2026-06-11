import { useState } from "react";
import { Plus } from "lucide-react";

import Sidebar from "../../components/Layout/Sidebar/Sidebar";
import Topbar from "../../components/Layout/Topbar/Topbar";
import ActionButton from "../../components/Common/ActionButton/ActionButton";
import RolesTabs from "../../components/RolesTitles/RolesTabs";
import AddRoleModal from "../../components/RolesTitles/AddRoleModal";
import RolesTitlesTable from "../../components/RolesTitles/RolesTitlesTable";

import {
  useEmployeeRoles,
  useDeleteEmployeeRole,
  useCreateEmployeeRole,
  useUpdateEmployeeRole,
} from "../../hooks/useEmployeeRoles";

import {
  usePositions,
  useCreatePosition,
  useUpdatePosition,
  useDeletePosition,
} from "../../hooks/usePositions";

import {
  useSpecializations,
  useCreateSpecialization,
  useUpdateSpecialization,
  useDeleteSpecialization,
} from "../../hooks/useSpecializations";

import "./RolesTitlesList.scss";

function RolesTitlesList() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("roles");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const { data: rolesData = [], isLoading: rolesLoading } = useEmployeeRoles();
  const { data: positionsData = [], isLoading: positionsLoading } = usePositions();
  const { data: specializationsData = [], isLoading: specializationsLoading } =
    useSpecializations();

  const createRoleMutation = useCreateEmployeeRole();
  const updateRoleMutation = useUpdateEmployeeRole();
  const deleteRoleMutation = useDeleteEmployeeRole();

  const createPositionMutation = useCreatePosition();
  const updatePositionMutation = useUpdatePosition();
  const deletePositionMutation = useDeletePosition();

  const createSpecializationMutation = useCreateSpecialization();
  const updateSpecializationMutation = useUpdateSpecialization();
  const deleteSpecializationMutation = useDeleteSpecialization();

  const roles = Array.isArray(rolesData) ? rolesData : rolesData?.data || [];
  const jobTitles = Array.isArray(positionsData)
    ? positionsData
    : positionsData?.data || [];
  const specializations = Array.isArray(specializationsData)
    ? specializationsData
    : specializationsData?.data || [];

  const closeModal = () => {
    setShowAddModal(false);
    setEditingItem(null);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setShowAddModal(true);
  };

  const handleDelete = async (item) => {
    if (activeTab === "roles") {
      if (!window.confirm("Delete this role?")) return;
      await deleteRoleMutation.mutateAsync(item.id);
    }

    if (activeTab === "jobTitles") {
      if (!window.confirm("Delete this job title?")) return;
      await deletePositionMutation.mutateAsync(item.id);
    }

    if (activeTab === "specializations") {
      if (!window.confirm("Delete this specialization?")) return;
      await deleteSpecializationMutation.mutateAsync(item.id);
    }
  };

  const getAddButtonText = () => {
    if (activeTab === "roles") return "Add Role";
    if (activeTab === "jobTitles") return "Add Job Title";
    return "Add Specialization";
  };

  return (
    <div className="roles-page">
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        isMobileOpen={isMobileSidebarOpen}
        onToggle={() => setIsSidebarCollapsed((prev) => !prev)}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      <main className={`roles-content ${isSidebarCollapsed ? "sidebar-collapsed" : ""}`}>
        <Topbar onMenuClick={() => setIsMobileSidebarOpen(true)} />

        <section className="page-header">
          <div>
            <h1>Roles, Titles & Specializations</h1>
          </div>

          <div className="page-actions">
            <ActionButton
              icon={Plus}
              onClick={() => {
                setEditingItem(null);
                setShowAddModal(true);
              }}
            >
              {getAddButtonText()}
            </ActionButton>
          </div>
        </section>

        <RolesTabs
          activeTab={activeTab}
          onTabChange={(tab) => {
            setActiveTab(tab);
            setEditingItem(null);
            setShowAddModal(false);
          }}
          rolesCount={roles.length}
          jobTitlesCount={jobTitles.length}
          specializationsCount={specializations.length}
        />

        <RolesTitlesTable
          data={
            activeTab === "roles"
              ? roles
              : activeTab === "jobTitles"
              ? jobTitles
              : specializations
          }
          activeTab={activeTab}
          isLoading={
            activeTab === "roles"
              ? rolesLoading
              : activeTab === "jobTitles"
              ? positionsLoading
              : specializationsLoading
          }
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </main>

      {showAddModal && (
        <AddRoleModal
          activeTab={activeTab}
          editingItem={editingItem}
          onClose={closeModal}
          onCreateRole={(payload) =>
            createRoleMutation.mutate(payload, {
              onSuccess: closeModal,
            })
          }
          onUpdateRole={(id, payload) =>
            updateRoleMutation.mutate(
              { id, payload },
              { onSuccess: closeModal }
            )
          }
          onCreateJobTitle={(payload) =>
            createPositionMutation.mutate(
              {
                code: payload.title.toUpperCase().replaceAll(" ", "_"),
                name: payload.title,
                departmentId: payload.departmentId,
                description: payload.description,
                active: payload.active,
              },
              { onSuccess: closeModal }
            )
          }
          onUpdateJobTitle={(id, payload) =>
            updatePositionMutation.mutate(
              {
                id,
                payload: {
                  code: payload.title.toUpperCase().replaceAll(" ", "_"),
                  name: payload.title,
                  departmentId: payload.departmentId,
                  description: payload.description,
                  active: payload.active,
                },
              },
              { onSuccess: closeModal }
            )
          }
          onCreateSpecialization={(payload) =>
            createSpecializationMutation.mutate(payload, {
              onSuccess: closeModal,
            })
          }
          onUpdateSpecialization={(id, payload) =>
            updateSpecializationMutation.mutate(
              { id, payload },
              { onSuccess: closeModal }
            )
          }
        />
      )}
    </div>
  );
}

export default RolesTitlesList;
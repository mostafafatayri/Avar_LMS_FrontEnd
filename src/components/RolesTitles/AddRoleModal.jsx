import { useEffect, useState } from "react";
import { X } from "lucide-react";

import { useDepartments } from "../../hooks/useDepartments";
import { useSubTeams } from "../../hooks/useSubTeams";

import "./AddRoleModal.scss";

export default function AddRoleModal({
  activeTab,
  editingItem,
  onClose,
  onCreateRole,
  onUpdateRole,
  onCreateJobTitle,
  onUpdateJobTitle,
  onCreateSpecialization,
  onUpdateSpecialization,
}) {
  const isEditMode = Boolean(editingItem);

  const { data: departmentsData = [], isLoading: departmentsLoading } =
    useDepartments();

  const { data: subTeamsData = [], isLoading: subTeamsLoading } = useSubTeams();

  const departments = Array.isArray(departmentsData)
    ? departmentsData
    : departmentsData?.data || [];

  const subTeams = Array.isArray(subTeamsData)
    ? subTeamsData
    : subTeamsData?.data || [];

  const [roleForm, setRoleForm] = useState({
    name: "",
    departmentId: "",
    seniority: "Mid",
    description: "",
    active: true,
  });

  const [jobTitleForm, setJobTitleForm] = useState({
    title: "",
    departmentId: "",
    description: "",
    active: true,
  });

  const [specializationForm, setSpecializationForm] = useState({
    name: "",
    departmentId: "",
    subTeamId: "",
    description: "",
    active: true,
  });

  useEffect(() => {
    if (!editingItem) return;

    if (activeTab === "roles") {
      setRoleForm({
        name: editingItem.name || "",
        departmentId: editingItem.departmentId ? String(editingItem.departmentId) : "",
        seniority: editingItem.seniority || "Mid",
        description: editingItem.description || "",
        active: editingItem.active ?? true,
      });
    }

    if (activeTab === "jobTitles") {
      setJobTitleForm({
        title: editingItem.name || editingItem.title || "",
        departmentId: editingItem.departmentId ? String(editingItem.departmentId) : "",
        description: editingItem.description || "",
        active: editingItem.active ?? true,
      });
    }

    if (activeTab === "specializations") {
      setSpecializationForm({
        name: editingItem.name || "",
        departmentId: editingItem.departmentId ? String(editingItem.departmentId) : "",
        subTeamId: editingItem.subTeamId ? String(editingItem.subTeamId) : "",
        description: editingItem.description || "",
        active: editingItem.active ?? true,
      });
    }
  }, [editingItem, activeTab]);

  const filteredSubTeams = subTeams.filter((team) => {
    if (!specializationForm.departmentId) return true;
    return String(team.departmentId) === String(specializationForm.departmentId);
  });

  const getModalTitle = () => {
    if (activeTab === "roles") return isEditMode ? "Edit Role" : "Add Role";
    if (activeTab === "jobTitles")
      return isEditMode ? "Edit Job Title" : "Add Job Title";
    return isEditMode ? "Edit Specialization" : "Add Specialization";
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (activeTab === "roles") {
      if (!roleForm.name.trim() || !roleForm.departmentId) return;

      const payload = {
        ...roleForm,
        departmentId: Number(roleForm.departmentId),
      };

      isEditMode
        ? onUpdateRole?.(editingItem.id, payload)
        : onCreateRole?.(payload);
    }

    if (activeTab === "jobTitles") {
      if (!jobTitleForm.title.trim() || !jobTitleForm.departmentId) return;

      const payload = {
        ...jobTitleForm,
        departmentId: Number(jobTitleForm.departmentId),
      };

      isEditMode
        ? onUpdateJobTitle?.(editingItem.id, payload)
        : onCreateJobTitle?.(payload);
    }

    if (activeTab === "specializations") {
      if (!specializationForm.name.trim() || !specializationForm.departmentId)
        return;

      const payload = {
        name: specializationForm.name,
        departmentId: Number(specializationForm.departmentId),
        subTeamId: specializationForm.subTeamId
          ? Number(specializationForm.subTeamId)
          : null,
        description: specializationForm.description,
        active: specializationForm.active,
      };

      isEditMode
        ? onUpdateSpecialization?.(editingItem.id, payload)
        : onCreateSpecialization?.(payload);
    }
  };

  const renderDepartmentOptions = () => (
    <>
      <option value="">
        {departmentsLoading ? "Loading departments..." : "Select department"}
      </option>

      {departments.map((department) => (
        <option key={department.id} value={department.id}>
          {department.name}
        </option>
      ))}
    </>
  );

  return (
    <div className="modal-overlay">
      <form className="add-role-modal" onSubmit={handleSubmit}>
        <div className="modal-header">
          <h2>{getModalTitle()}</h2>

          <button type="button" className="close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          <div className="form-grid single-column">
            {activeTab === "roles" && (
              <>
                <div className="form-group">
                  <label>Name *</label>
                  <input
                    value={roleForm.name}
                    onChange={(e) =>
                      setRoleForm({ ...roleForm, name: e.target.value })
                    }
                  />
                </div>

                <div className="form-group">
                  <label>Department *</label>
                  <select
                    value={roleForm.departmentId}
                    disabled={departmentsLoading}
                    onChange={(e) =>
                      setRoleForm({ ...roleForm, departmentId: e.target.value })
                    }
                  >
                    {renderDepartmentOptions()}
                  </select>
                </div>

                <div className="form-group">
                  <label>Seniority Level</label>
                  <select
                    value={roleForm.seniority}
                    onChange={(e) =>
                      setRoleForm({ ...roleForm, seniority: e.target.value })
                    }
                  >
                    <option value="Junior">Junior</option>
                    <option value="Mid">Mid</option>
                    <option value="Senior">Senior</option>
                    <option value="Lead">Lead</option>
                    <option value="Manager">Manager</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <input
                    value={roleForm.description}
                    onChange={(e) =>
                      setRoleForm({ ...roleForm, description: e.target.value })
                    }
                  />
                </div>
              </>
            )}

            {activeTab === "jobTitles" && (
              <>
                <div className="form-group">
                  <label>Title *</label>
                  <input
                    value={jobTitleForm.title}
                    onChange={(e) =>
                      setJobTitleForm({
                        ...jobTitleForm,
                        title: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="form-group">
                  <label>Department *</label>
                  <select
                    value={jobTitleForm.departmentId}
                    disabled={departmentsLoading}
                    onChange={(e) =>
                      setJobTitleForm({
                        ...jobTitleForm,
                        departmentId: e.target.value,
                      })
                    }
                  >
                    {renderDepartmentOptions()}
                  </select>
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <input
                    value={jobTitleForm.description}
                    onChange={(e) =>
                      setJobTitleForm({
                        ...jobTitleForm,
                        description: e.target.value,
                      })
                    }
                  />
                </div>
              </>
            )}

            {activeTab === "specializations" && (
              <>
                <div className="form-group">
                  <label>Name *</label>
                  <input
                    value={specializationForm.name}
                    onChange={(e) =>
                      setSpecializationForm({
                        ...specializationForm,
                        name: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="form-group">
                  <label>Department *</label>
                  <select
                    value={specializationForm.departmentId}
                    disabled={departmentsLoading}
                    onChange={(e) =>
                      setSpecializationForm({
                        ...specializationForm,
                        departmentId: e.target.value,
                        subTeamId: "",
                      })
                    }
                  >
                    {renderDepartmentOptions()}
                  </select>
                </div>

                <div className="form-group">
                  <label>Sub-Team</label>
                  <select
                    value={specializationForm.subTeamId}
                    disabled={subTeamsLoading}
                    onChange={(e) =>
                      setSpecializationForm({
                        ...specializationForm,
                        subTeamId: e.target.value,
                      })
                    }
                  >
                    <option value="">
                      {subTeamsLoading ? "Loading sub-teams..." : "Select"}
                    </option>

                    {filteredSubTeams.map((team) => (
                      <option key={team.id} value={team.id}>
                        {team.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <input
                    value={specializationForm.description}
                    onChange={(e) =>
                      setSpecializationForm({
                        ...specializationForm,
                        description: e.target.value,
                      })
                    }
                  />
                </div>
              </>
            )}
          </div>
        </div>

        <div className="modal-footer">
          <button type="button" className="btn-secondary" onClick={onClose}>
            Cancel
          </button>

          <button type="submit" className="btn-primary">
            {isEditMode ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
}
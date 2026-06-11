import { useState } from "react";
import { X } from "lucide-react";
import "./AddRoleModal.scss";

export default function AddRoleModal({
  activeTab,
  onClose,
  onCreateRole,
  onCreateJobTitle,
  onCreateSpecialization,
}) {
  const [roleForm, setRoleForm] = useState({
    name: "",
    department: "",
    seniority: "Mid",
    description: "",
    active: true,
  });

  const [jobTitleForm, setJobTitleForm] = useState({
    title: "",
    department: "",
    description: "",
    active: true,
  });

  const [specializationForm, setSpecializationForm] = useState({
    name: "",
    department: "",
    subTeam: "",
    description: "",
    active: true,
  });

  const getModalTitle = () => {
    if (activeTab === "roles") return "Add Role";
    if (activeTab === "jobTitles") return "Add Job Title";
    return "Add Specialization";
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (activeTab === "roles") {
      if (!roleForm.name.trim()) return;
      onCreateRole(roleForm);
    }

    if (activeTab === "jobTitles") {
      if (!jobTitleForm.title.trim()) return;
      onCreateJobTitle(jobTitleForm);
    }

    if (activeTab === "specializations") {
      if (!specializationForm.name.trim()) return;
      onCreateSpecialization(specializationForm);
    }
  };

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
                  <label>Department</label>
                  <select
                    value={roleForm.department}
                    onChange={(e) =>
                      setRoleForm({ ...roleForm, department: e.target.value })
                    }
                  >
                    <option value="">Select</option>
                    <option value="Human Resources">Human Resources</option>
                    <option value="Information Technology">Information Technology</option>
                    <option value="Learning">Learning</option>
                    <option value="Operations">Operations</option>
                    <option value="Finance">Finance</option>
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
                  <label>Department</label>
                  <select
                    value={jobTitleForm.department}
                    onChange={(e) =>
                      setJobTitleForm({
                        ...jobTitleForm,
                        department: e.target.value,
                      })
                    }
                  >
                    <option value="">Select</option>
                    <option value="Human Resources">Human Resources</option>
                    <option value="Information Technology">Information Technology</option>
                    <option value="Learning">Learning</option>
                    <option value="Operations">Operations</option>
                    <option value="Finance">Finance</option>
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
                  <label>Department</label>
                  <select
                    value={specializationForm.department}
                    onChange={(e) =>
                      setSpecializationForm({
                        ...specializationForm,
                        department: e.target.value,
                      })
                    }
                  >
                    <option value="">Select</option>
                    <option value="Human Resources">Human Resources</option>
                    <option value="Information Technology">Information Technology</option>
                    <option value="Learning">Learning</option>
                    <option value="Operations">Operations</option>
                    <option value="Finance">Finance</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Sub-Team</label>
                  <select
                    value={specializationForm.subTeam}
                    onChange={(e) =>
                      setSpecializationForm({
                        ...specializationForm,
                        subTeam: e.target.value,
                      })
                    }
                  >
                    <option value="">Select</option>
                    <option value="Compliance">Compliance</option>
                    <option value="IT Support">IT Support</option>
                    <option value="Learning Operations">Learning Operations</option>
                    <option value="Accounting">Accounting</option>
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
            Create
          </button>
        </div>
      </form>
    </div>
  );
}
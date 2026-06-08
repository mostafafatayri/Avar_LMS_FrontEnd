import { X } from "lucide-react";
import "./AddEmployeeModal.scss";

export default function AddEmployeeModal({ onClose }) {
  return (
    <div className="modal-overlay">
      <div className="employee-modal">
        <div className="modal-header">
          <div>
            <h2>Add Employee</h2>
            <p>Create a new employee profile.</p>
          </div>

          <button className="close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          <div className="form-grid">
            <div className="form-group">
              <label>Employee ID</label>
              <input placeholder="EMP-001" />
            </div>

            <div className="form-group">
              <label>First Name</label>
              <input placeholder="John" />
            </div>

            <div className="form-group">
              <label>Middle Name</label>
              <input placeholder="Michael" />
            </div>

            <div className="form-group">
              <label>Last Name</label>
              <input placeholder="Doe" />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input placeholder="john@company.com" />
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input placeholder="+961 xx xxx xxx" />
            </div>

            <div className="form-group">
              <label>Department</label>
              <select>
                <option>Select Department</option>
              </select>
            </div>

            <div className="form-group">
              <label>Sub Team</label>
              <select>
                <option>Select Team</option>
              </select>
            </div>

            <div className="form-group">
              <label>Role / Title</label>
              <select>
                <option>Select Role</option>
              </select>
            </div>

            <div className="form-group">
              <label>Hire Date</label>
              <input type="date" />
            </div>

            <div className="form-group">
              <label>Status</label>
              <select>
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>
            Cancel
          </button>

          <button className="btn-primary">
            Save Employee
          </button>
        </div>
      </div>
    </div>
  );
}
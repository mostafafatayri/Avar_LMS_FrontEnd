import { User, Lock, LogOut } from "lucide-react";
import "./ProfileDropdown.scss";

export default function ProfileDropdown({ onLogout }) {
  return (
    <div className="profile-dropdown">
      <button type="button" className="profile-dropdown-item">
        <User size={18} />
        <span>My Profile</span>
      </button>

      <button type="button" className="profile-dropdown-item">
        <Lock size={18} />
        <span>Change Password</span>
      </button>

      <div className="profile-dropdown-divider" />

      <button
        type="button"
        className="profile-dropdown-item danger"
        onClick={onLogout}
      >
        <LogOut size={18} />
        <span>Sign Out</span>
      </button>
    </div>
  );
}
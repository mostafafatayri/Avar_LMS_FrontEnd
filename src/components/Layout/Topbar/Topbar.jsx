import { useEffect, useMemo, useRef, useState } from "react";
import { Menu, Building2, Bell, ChevronDown } from "lucide-react";

import ProfileDropdown from "./ProfileDropdown";
import { getCurrentUser, logout } from "../../../services/authService";
import "./Topbar.scss";

export default function Topbar({ onMenuClick, title = "Home" }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);

  const currentUser = getCurrentUser();

  const initials = useMemo(() => {
    const name = currentUser?.fullName || currentUser?.username || "User";

    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  }, [currentUser]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button className="menu-button" type="button" onClick={onMenuClick}>
          <Menu size={24} />
        </button>

        <h1>{title}</h1>
      </div>

      <div className="topbar-right">
        <button className="company-selector" type="button">
          <Building2 size={22} />
          <span>Avar Facilities</span>
          <ChevronDown size={18} />
        </button>

        <button className="notification-btn" type="button">
          <Bell size={22} />
          <span />
        </button>

        <div className="profile-wrapper" ref={profileRef}>
          <button
            type="button"
            className="user-profile"
            onClick={() => setIsProfileOpen((prev) => !prev)}
          >
            <div className="avatar">{initials}</div>

            <div className="profile-text">
              <h4>{currentUser?.fullName || currentUser?.username || "User"}</h4>
              <p>{currentUser?.positionName || "System User"}</p>
            </div>

            <ChevronDown className="profile-chevron" size={18} />
          </button>

          {isProfileOpen && (
            <ProfileDropdown
              onLogout={() => {
                logout();
                window.location.href = "/login";
              }}
            />
          )}
        </div>
      </div>
    </header>
  );
}
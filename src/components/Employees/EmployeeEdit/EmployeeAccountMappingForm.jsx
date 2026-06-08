import { useEffect, useRef, useState } from "react";
import { Link2, Search, Unlink } from "lucide-react";
import {
  linkEmployeeToUser,
  unlinkEmployeeUser,
} from "../../../services/employeeService";
import { searchUsers } from "../../../services/userService";

export default function EmployeeAccountMappingForm({ employee, employeeId }) {
  const [username, setUsername] = useState(employee?.username || "");
  const [users, setUsers] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const searchRef = useRef(null);

  useEffect(() => {
    setUsername(employee?.username || "");
  }, [employee?.username]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(async () => {
      const keyword = username.trim();

      if (keyword.length < 2) {
        setUsers([]);
        setShowDropdown(false);
        return;
      }

      try {
        setIsSearching(true);
        const result = await searchUsers(keyword);
        setUsers(result);
        setShowDropdown(result.length > 0);
      } catch {
        setUsers([]);
        setShowDropdown(false);
      } finally {
        setIsSearching(false);
      }
    }, 350);

    return () => clearTimeout(timeout);
  }, [username]);

  const handleSelectUser = (user) => {
    setUsername(user.username);
    setUsers([]);
    setShowDropdown(false);
    setMessage("");
  };

  const handleLink = async () => {
    if (!username.trim()) {
      setMessage("Please enter a username.");
      return;
    }

    try {
      setIsLoading(true);
      await linkEmployeeToUser(employeeId, username.trim());
      setMessage("Employee linked to user successfully.");
    } catch (error) {
      setMessage(error?.response?.data?.message || "Failed to link user.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnlink = async () => {
    try {
      setIsLoading(true);
      await unlinkEmployeeUser(employeeId);
      setUsername("");
      setUsers([]);
      setShowDropdown(false);
      setMessage("Employee unlinked from user successfully.");
    } catch (error) {
      setMessage(error?.response?.data?.message || "Failed to unlink user.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="employee-edit-card">
      <h3>Account Mapping</h3>
      <p className="card-description">
        Link this employee to an existing system user by username.
      </p>

      <div className="employee-form-grid">
        <div className="form-group full">
          <label>Username</label>

          <div className="user-search-wrapper" ref={searchRef}>
            <Search size={18} className="user-search-icon" />

            <input
              autoComplete="off"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setMessage("");
              }}
              onFocus={() => {
                if (users.length > 0) setShowDropdown(true);
              }}
              placeholder="Start typing a username, name, or email"
            />

            {isSearching && (
              <span className="user-search-loading">Searching...</span>
            )}

            {showDropdown && (
              <div className="user-search-dropdown">
                {users.map((user) => (
                  <button
                    key={user.id}
                    type="button"
                    onClick={() => handleSelectUser(user)}
                  >
                    <div>
                      <strong>{user.username}</strong>
                      <span>{user.fullName || "No full name"}</span>
                    </div>

                    <small>{user.email}</small>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {message && <div className="mapping-message">{message}</div>}

      <div className="mapping-actions">
        <button
          className="primary-action"
          onClick={handleLink}
          disabled={isLoading}
        >
          <Link2 size={18} />
          {isLoading ? "Processing..." : "Link User"}
        </button>

        <button
          className="secondary-action"
          onClick={handleUnlink}
          disabled={isLoading}
        >
          <Unlink size={18} />
          Unlink User
        </button>
      </div>
    </section>
  );
}
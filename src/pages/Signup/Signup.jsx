import { useState } from "react";
import { User, Mail, Lock, Eye, EyeOff, Building2 } from "lucide-react";
import "./Signup.scss";
import { signup } from "../../services/authService";

export default function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [backendError, setBackendError] = useState("");
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    setBackendError("");
    setSuccessMessage("");
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setBackendError("");
    setSuccessMessage("");

    if (!validateForm()) return;

    try {
      setLoading(true);

      const response = await signup({
        username: formData.username.trim(),
        firstName: formData.firstName.trim(),
        middleName: formData.middleName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        password: formData.password,
      });

      setSuccessMessage(response.message || "Account created successfully");

      setFormData({
        username: "",
        firstName: "",
        middleName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      setBackendError(
        error.response?.data?.message || "Signup failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <section className="signup-left">
        <div className="signup-box">
          <div className="brand">
            <div className="brand-mark">A</div>
            <span>AVAR</span>
          </div>

          <div className="signup-title">
            <h1>Create your account</h1>
            <p>Sign up to Avar</p>
          </div>

          {backendError && <div className="alert-error">{backendError}</div>}
          {successMessage && <div className="alert-success">{successMessage}</div>}

          <form className="signup-form" onSubmit={handleSubmit}>
            <div className={`input-block ${errors.username ? "has-error" : ""}`}>
              <div className="input-group">
                <User className="input-icon" size={20} />
                <input
                  name="username"
                  type="text"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
              {errors.username && <span>{errors.username}</span>}
            </div>

            <div className={`input-block ${errors.firstName ? "has-error" : ""}`}>
              <div className="input-group">
                <User className="input-icon" size={20} />
                <input
                  name="firstName"
                  type="text"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              {errors.firstName && <span>{errors.firstName}</span>}
            </div>

            <div className="input-block">
              <div className="input-group">
                <User className="input-icon" size={20} />
                <input
                  name="middleName"
                  type="text"
                  placeholder="Middle name (optional)"
                  value={formData.middleName}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className={`input-block ${errors.lastName ? "has-error" : ""}`}>
              <div className="input-group">
                <User className="input-icon" size={20} />
                <input
                  name="lastName"
                  type="text"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
              {errors.lastName && <span>{errors.lastName}</span>}
            </div>

            <div className={`input-block ${errors.email ? "has-error" : ""}`}>
              <div className="input-group">
                <Mail className="input-icon" size={20} />
                <input
                  name="email"
                  type="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              {errors.email && <span>{errors.email}</span>}
            </div>

            <div className={`input-block ${errors.password ? "has-error" : ""}`}>
              <div className="input-group">
                <Lock className="input-icon" size={20} />
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && <span>{errors.password}</span>}
            </div>

            <div
              className={`input-block ${
                errors.confirmPassword ? "has-error" : ""
              }`}
            >
              <div className="input-group">
                <Lock className="input-icon" size={20} />
                <input
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.confirmPassword && <span>{errors.confirmPassword}</span>}
            </div>

            <button className="signup-btn" type="submit" disabled={loading}>
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>

          <p className="login-link">
            Already have an account? <a href="/login">Log in</a>
          </p>
        </div>
      </section>

      <section className="signup-right">
        <div className="facility-content">
          <div className="facility-icon">
            <Building2 size={76} strokeWidth={1.7} />
          </div>

          <h2>Facility Management</h2>
          <p>
            Create your account to manage buildings, assets, work orders, and
            facility operations from one centralized platform.
          </p>
        </div>
      </section>
    </div>
  );
}
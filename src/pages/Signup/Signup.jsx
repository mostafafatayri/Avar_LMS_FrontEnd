import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  UserPlus,
  Building2,
  CheckCircle2,
} from "lucide-react";

import { signup } from "../../services/authService";
import "./Signup.scss";

export default function Signup() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignup = async (event) => {
    event.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    if (
      !formData.username.trim() ||
      !formData.firstName.trim() ||
      !formData.lastName.trim() ||
      !formData.email.trim() ||
      !formData.password.trim()
    ) {
      setErrorMessage("Please fill all required fields.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      setIsLoading(true);

      await signup({
        username: formData.username.trim(),
        firstName: formData.firstName.trim(),
        middleName: formData.middleName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        password: formData.password,
      });

      setSuccessMessage(
        "Account created successfully. You can now sign in."
      );

      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 1200);
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Failed to create account.";

      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-shell">
        <section className="signup-brand-panel">
          <div className="signup-brand">
            <div className="signup-logo">A</div>
            <div>
              <h2>
                AVAR <span>LMS</span>
              </h2>
              <p>Learning Management System</p>
            </div>
          </div>

          <div className="signup-hero">
            <div className="signup-hero-icon">
              <Building2 size={42} />
            </div>

            <h1>
              Join your organization.
              <span>Start learning faster.</span>
            </h1>

            <p>
              Create your AVAR LMS account using your company email. Your domain
              will automatically connect you to the right organization.
            </p>
          </div>

          <div className="signup-benefits">
            <div>
              <CheckCircle2 size={19} />
              <span>Automatic domain detection</span>
            </div>

            <div>
              <CheckCircle2 size={19} />
              <span>Secure organization access</span>
            </div>

            <div>
              <CheckCircle2 size={19} />
              <span>Centralized learning profile</span>
            </div>
          </div>
        </section>

        <section className="signup-form-panel">
          <button
            className="signup-back-btn"
            type="button"
            onClick={() => navigate("/login")}
          >
            <ArrowLeft size={18} />
            Back to login
          </button>

          <div className="signup-form-wrapper">
            <div className="signup-form-header">
              <div className="signup-header-icon">
                <UserPlus size={32} />
              </div>

              <h1>Create account</h1>
              <p>Use your work email to join AVAR LMS.</p>
            </div>

            <form className="signup-form" onSubmit={handleSignup}>
              {errorMessage && (
                <div className="signup-message error">{errorMessage}</div>
              )}

              {successMessage && (
                <div className="signup-message success">{successMessage}</div>
              )}

              <div className="signup-grid">
                <div className="signup-field">
                  <label>First name *</label>
                  <div className="signup-input">
                    <User size={19} />
                    <input
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="First name"
                    />
                  </div>
                </div>

                <div className="signup-field">
                  <label>Last name *</label>
                  <div className="signup-input">
                    <User size={19} />
                    <input
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Last name"
                    />
                  </div>
                </div>
              </div>

              <div className="signup-grid">
                <div className="signup-field">
                  <label>Middle name</label>
                  <div className="signup-input">
                    <User size={19} />
                    <input
                      name="middleName"
                      value={formData.middleName}
                      onChange={handleChange}
                      placeholder="Middle name"
                    />
                  </div>
                </div>

                <div className="signup-field">
                  <label>Username *</label>
                  <div className="signup-input">
                    <User size={19} />
                    <input
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      placeholder="Username"
                    />
                  </div>
                </div>
              </div>

              <div className="signup-field">
                <label>Work email *</label>
                <div className="signup-input">
                  <Mail size={19} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@company.com"
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="signup-grid">
                <div className="signup-field">
                  <label>Password *</label>
                  <div className="signup-input">
                    <Lock size={19} />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Create password"
                      autoComplete="new-password"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                    </button>
                  </div>
                </div>

                <div className="signup-field">
                  <label>Confirm password *</label>
                  <div className="signup-input">
                    <Lock size={19} />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm password"
                      autoComplete="new-password"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword((prev) => !prev)
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={19} />
                      ) : (
                        <Eye size={19} />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="signup-domain-note">
                <Building2 size={18} />
                <p>
                  Your email domain will be detected automatically and linked to
                  your organization if available.
                </p>
              </div>

              <button
                className="signup-submit-btn"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : "Create account"}
              </button>

              <p className="signup-footer">
                Already have an account?{" "}
                <button type="button" onClick={() => navigate("/login")}>
                  Sign in
                </button>
              </p>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
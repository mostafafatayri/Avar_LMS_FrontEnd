import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  GraduationCap,
  BookOpen,
  Users,
  BarChart3,
  Sun,
} from "lucide-react";

import { login } from "../../services/authService";
import "./Login.scss";

export default function LoginPage() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    setErrorMessage("");

    if (!identifier.trim() || !password.trim()) {
      setErrorMessage("Please enter your email and password.");
      return;
    }

    try {
      setIsLoading(true);

      await login(identifier, password);

      navigate("/home", { replace: true });
    } catch (error) {
      console.error("Login error:", error);

      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Invalid email or password.";

      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-shell">
        <section className="login-brand-panel">
          <div className="login-brand">
            <div className="login-logo">A</div>
            <div>
              <h2>
                AVAR <span>LMS</span>
              </h2>
              <p>Learning Management System</p>
            </div>
          </div>

          <div className="login-hero-text">
            <h1>
              Empower Learning.
              <span>Drive Growth.</span>
            </h1>

            <p>
              A modern learning management platform designed to help
              organizations train, engage and grow their people.
            </p>
          </div>

          <div className="login-illustration">
            <div className="laptop-card">
              <div className="mini-sidebar" />
              <div className="mini-content">
                <span />
                <span />
                <span />
              </div>
            </div>

            <div className="floating-card cap">
              <GraduationCap size={34} />
            </div>

            <div className="floating-card chart">
              <BarChart3 size={34} />
            </div>
          </div>

          <div className="login-features">
            <div>
              <BookOpen size={20} />
              <h4>Structured Learning</h4>
              <p>Organized training paths and courses</p>
            </div>

            <div>
              <Users size={20} />
              <h4>Engaged Teams</h4>
              <p>Track progress and boost participation</p>
            </div>

            <div>
              <BarChart3 size={20} />
              <h4>Data Driven</h4>
              <p>Measure results and improve performance</p>
            </div>
          </div>
        </section>

        <section className="login-form-panel">
          <button className="theme-btn" type="button">
            <Sun size={20} />
          </button>

          <div className="login-form-wrapper">
            <div className="login-form-header">
              <h1>Welcome back 👋</h1>
              <p>Sign in to continue to AVAR LMS</p>
            </div>

            <form className="login-form" onSubmit={handleLogin}>
              {errorMessage && (
                <div className="login-error-message">{errorMessage}</div>
              )}

              <div className="login-field">
                <label>Email address</label>
                <div className="input-shell">
                  <Mail size={20} />
                  <input
                    type="text"
                    placeholder="Enter your email or username"
                    value={identifier}
                    onChange={(event) => setIdentifier(event.target.value)}
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="login-field">
                <label>Password</label>
                <div className="input-shell">
                  <Lock size={20} />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    autoComplete="current-password"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="login-options">
                <label>
                  <input type="checkbox" />
                  Remember me
                </label>

                <button type="button">Forgot password?</button>
              </div>

              <button className="sign-in-btn" type="submit" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign in"}
              </button>

              <div className="divider">
                <span />
                <p>or continue with</p>
                <span />
              </div>

              <button className="google-btn" type="button">
                <span>G</span>
                Sign in with Google
              </button>

              <p className="login-footer-text">
                Don’t have an account? <span>Contact your administrator</span>
              </p>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, Building2 } from "lucide-react";
import "./Login.scss";
import { login } from "../../services/authService";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [loginWithoutPassword, setLoginWithoutPassword] = useState(false);
  const [identifierError, setIdentifierError] = useState(
    "Please enter your email or username"
  );

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!identifier.trim()) {
      setIdentifierError("Please enter your email or username");
      return;
    }

    setIdentifierError("");

    if (loginWithoutPassword) {
      console.log("Send magic link to:", identifier);
      return;
    }

    try {
      const data = await login(identifier, password);
      console.log("Login success:", data);
      navigate("/home");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="login-page">
      <section className="login-left">
        <div className="login-box">
          <div className="brand">
            <div className="brand-mark">A</div>
            <span>AVAR</span>
          </div>

          <div className="title-block">
            <h2>Welcome back</h2>
            <p>Log in to Avar</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className={`form-group ${identifierError ? "has-error" : ""}`}>
              <div className="input-wrapper">
                <Mail className="input-icon" size={20} />

                <input
                  type="text"
                  placeholder="Email address or username"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                />
              </div>

              {identifierError && <span>{identifierError}</span>}
            </div>

            {!loginWithoutPassword && (
              <div className="password-wrapper">
                <Lock className="input-icon" size={20} />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            )}

            <div className="switch-row">
              <label className="switch">
                <input
                  type="checkbox"
                  checked={loginWithoutPassword}
                  onChange={(e) => setLoginWithoutPassword(e.target.checked)}
                />
                <span className="slider"></span>
              </label>

              <div>
                <strong>Log in without password</strong>
                <p>Send me a magic link to log in</p>
              </div>
            </div>

            <label className="checkbox-row">
              <input
                type="checkbox"
                checked={keepLoggedIn}
                onChange={(e) => setKeepLoggedIn(e.target.checked)}
              />
              <span>Keep me logged in</span>
            </label>

            <button className="login-btn" type="submit">
              Log in
            </button>
          </form>

          <div className="divider">
            <span></span>
            <p>Or</p>
            <span></span>
          </div>

          <button className="social-btn">
            <span className="google">G</span>
            Log in with Google
          </button>

          <button className="social-btn">
            <span className="microsoft">■</span>
            Log in with Microsoft
          </button>

          <div className="bottom-links">
            <a href="#">Forgot password?</a>
            <p>
              Don't have an account? <a href="/signup">Sign up</a>
            </p>
          </div>
        </div>
      </section>

      <section className="login-right">
        <div className="facility-card">
          <div className="facility-icon">
            <Building2 size={76} strokeWidth={1.7} />
          </div>

          <h2>Facility Management</h2>
          <p>
            Streamline operations, optimize resources, and create smarter,
            safer, and more efficient facilities.
          </p>
        </div>
      </section>
    </div>
  );
}
import { useState } from "react";
import { thunkLogin } from "../../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
      navigate("/dashboard");
    }
  };

  return (
    <>
      <h2>Log In</h2>
      <form
        onSubmit={handleSubmit}
        id="login-form"
      >
        <div>
          <div className="form-label">
            <label htmlFor="email">Email</label>
            {errors.email && <span className="form-error">{errors.email}</span>}
          </div>
          <input
            id="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <div className="form-label">
            <label htmlFor="password">Password</label>
            {errors.password && (
              <span className="form-error">{errors.password}</span>
            )}
          </div>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="form-submit" type="submit">Log In</button>
      </form>
    </>
  );
}

export default LoginFormModal;

import { useEffect, useState } from "react";
import { thunkLogin } from "../../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { useNavigate } from "react-router-dom";

import { validateEmail } from "../../../utils/customValidators";
import "./LoginFormModal.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { closeModal } = useModal();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validations, setValidations] = useState({});
  // const [errors, setErrors] = useState({});
  const [submitClass, setSubmitClass] = useState("form-submit");
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const setSubmitDisabledStatus = (disabled) => {
    (disabled)
      ? setSubmitClass("form-submit disabled")
      : setSubmitClass("form-submit");
    setSubmitDisabled(disabled);
  };

  // Validation checking
  useEffect(() => {
    // Submit button disabled functionality subject to change
    if (!hasSubmitted) return;

    const newValidations = {};
    if (!validateEmail(email)) newValidations.email = "Invalid Email Format";

    setSubmitDisabledStatus(Object.keys(newValidations).length > 0);
    setValidations(newValidations);
  }, [hasSubmitted, email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setValidations(serverResponse);
    } else {
      closeModal();
      navigate("/");
    }
  };

  const handleDemo = () => {
    setEmail('demo@aa.io')
    setPassword('demo_password')
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
            {validations.email && (
              <span className="form-error">{validations.email}</span>
            )}
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
            {validations.password && (
              <span className="form-error">{validations.password}</span>
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
        <button
          className={submitClass}
          disabled={submitDisabled}
          type="submit"
        >
          Log In
        </button>
        <button
          className={submitClass}
          onClick={handleDemo}
          type="submit"
        >
          Demo User
        </button>
      </form>
    </>
  );
}

export default LoginFormModal;

import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { thunkSignup } from "../../../redux/session";
import { useNavigate } from "react-router-dom";

import { validateEmail } from "../../../utils/customValidators";
import "./SignupFormModal.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { closeModal } = useModal();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState({});
  const [validations, setValidations] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [submitClass, setSubmitClass] = useState("form-submit");
  const [submitDisabled, setSubmitDisabled] = useState(false);

  const setSubmitDisabledStatus = (disabled) => {
    (disabled)
      ? setSubmitClass("form-submit disabled")
      : setSubmitClass("form-submit");
    setSubmitDisabled(disabled);
  };

  const getValidations = useCallback(() => {
    const newValidations = {};

    if (!name) {
      newValidations.name = "Name is required";
    }
    if (!email) {
      newValidations.email = "Email is required";
    } else if (!validateEmail(email)) {
      newValidations.email = "Invalid Email Format";
    }
    if (password.length < 8) {
      newValidations.password = "Password must be at least 8 characters"
    }
    if (password !== confirmPassword) {
      newValidations.confirmPassword = "Confirm password must match password"
    }

    return newValidations;
  }, [name, email, password, confirmPassword]);

  useEffect(() => {
    if (!hasSubmitted) return;
    const newValidations = getValidations();
    setSubmitDisabledStatus(Object.keys(newValidations).length > 0);
    setValidations(newValidations);
  }, [hasSubmitted, getValidations]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!hasSubmitted) {
      setHasSubmitted(true);
      const newValidations = getValidations();
      if (Object.keys(newValidations).length) return;
    }

    const serverResponse = await dispatch(
      thunkSignup({
        name,
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse); // Change to reflect LoginFormModal later
    } else {
      closeModal();
      navigate("/");
    }
  };

  return (
    <>
      <h2>Sign Up</h2>
      {validations.server && <p>{validations.server}</p>}
      <form
        onSubmit={handleSubmit}
        id="signup-form"
      >
        <div>
          <div className="form-label">
            <label htmlFor="name">Name</label>
            {validations.name && (
              <span className="form-error">{validations.name}</span>
            ) || errors.name && (
              <span className="form-error">{errors.name}</span>
            )}
          </div>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <div className="form-label">
            <label htmlFor="email">Email</label>
            {validations.email && (
              <span className="form-error">{validations.email}</span>
            ) || errors.email && (
              <span className="form-error">{errors.email}</span>
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
            <label htmlFor="password">
              Password
            </label>
            {errors.password && (
              <span className="form-error">{errors.password}</span>
            ) || validations.password && (
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
        <div>
          <div className="form-label">
            <label htmlFor="confirm-password">Confirm Password</label>
            {validations.confirmPassword && (
              <span className="form-error">{validations.confirmPassword}</span>
            )}
          </div>
        <input
          id="confirm-password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        </div>
        <button
          className={submitClass}
          type="submit"
          disabled={submitDisabled}
        >
          Sign Up
        </button>
      </form>
    </>
  );
}

export default SignupFormModal;

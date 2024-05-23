import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { thunkSignup } from "../../../redux/session";
import { useNavigate } from "react-router-dom";

// import { validateEmail } from "../../../utils/customValidators";
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
  // const [submitClass, setSubmitClass] = useState("form-submit");
  // const [submitDisabled, setSubmitDisabled] = useState(false);
  // const [hasSubmitted, setHasSubmitted] = useState(false);

  // const setSubmitDisabledStatus = (disabled) => {
  //   (disabled)
  //     ? setSubmitClass("form-submit disabled")
  //     : setSubmitClass("form-submit");
  //   setSubmitDisabled(disabled);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setHasSubmitted(true);

    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });
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
      navigate("/dashboard");
    }
  };

  return (
    <>
      <h2>Sign Up</h2>
      {errors.server && <p>{errors.server}</p>}
      <form
        onSubmit={handleSubmit}
        id="signup-form"
      >
        <div>
          <div className="form-label">
            <label htmlFor="name">Name</label>
            {errors.name && (
              <span className="form-error">{errors.name}</span>
            )}
            {/* Edit this later to reflect LoginFormModal
            changes to validation and error checking */}
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
            {errors.email && (
              <span className="form-error">{errors.email}</span>
            )}
            {/* Edit this later to reflect LoginFormModal
            changes to validation and error checking */}
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
            )}
            {/* Edit this later to reflect LoginFormModal
            changes to validation and error checking */}
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
            {errors.confirmPassword && (
              <span className="form-error">{errors.confirmPassword}</span>
            )}
            {/* Edit this later to reflect LoginFormModal
            changes to validation and error checking */}
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
          className="form-submit"
          // className={submitClass}
          type="submit"
          // disabled={disabled}
        >
          Sign Up
        </button>
      </form>
    </>
  );
}

export default SignupFormModal;

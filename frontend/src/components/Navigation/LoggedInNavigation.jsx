import { NavLink } from "react-router-dom";
import "./Navigation.css";

function LoggedInNavigation() {
  return (
    <>
      <nav className="nav-header">
        <NavLink to="/">
          <span className="animated-text-underline">Dashboard</span>
        </NavLink>
        <NavLink to="/expenses">
          <span className="animated-text-underline">Expenses</span>
        </NavLink>
      </nav>
    </>
  );
}

export default LoggedInNavigation;

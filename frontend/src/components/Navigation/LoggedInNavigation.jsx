import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function LoggedInNavigation() {
  return (
    <nav className="nav-header">
      <a href="/api/friends">
        <span className="animated-text-underline">friends</span>
      </a>
      <a href="/api/friends_expenses">
        <span className="animated-text-underline">expenses</span>
      </a>
      <a href="/api/payments">
        <span className="animated-text-underline">payments</span>
      </a>
      <NavLink to="/">
        <span className="animated-text-underline">home</span>
      </NavLink>
      <ProfileButton />
    </nav>
  );
}

export default LoggedInNavigation;

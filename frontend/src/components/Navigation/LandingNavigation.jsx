import { useState, useEffect, useRef } from "react";

import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import "./Navigation.css";

function LandingNavigation() {
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  return (
    <nav className="nav-header">
      <OpenModalMenuItem
        itemText="Log In"
        onItemClick={closeMenu}
        modalComponent={<LoginFormModal />}
      />
      <OpenModalMenuItem
        itemText="Sign Up"
        onItemClick={closeMenu}
        modalComponent={<SignupFormModal />}
      />
    </nav>
  )
}

export default LandingNavigation;

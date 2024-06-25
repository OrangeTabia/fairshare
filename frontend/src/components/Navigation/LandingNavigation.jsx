import { useState, useEffect, useRef } from "react";

import OpenModalMenuItem from "../modals/OpenModalMenuItem";
import LoginFormModal from "../modals/LoginFormModal";
import SignupFormModal from "../modals/SignupFormModal";
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
    <nav className="nav-header-landing">
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

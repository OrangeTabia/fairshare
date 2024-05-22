import { ModalProvider, Modal } from "../context/Modal";
import OpenModalMenuItem from "../components/Navigation/OpenModalMenuItem";
import LoginFormModal from "../components/LoginFormModal";
import SignupFormModal from "../components/SignupFormModal";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const user = useSelector((state) => state.session.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      console.log({ user });
      navigate("/dashboard");
    }
  }, [user, navigate]);

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
    <>
      <ModalProvider>
        <header>
          <div id="header-contents">
            <p id="site-name">
              <span id="site-name-1">fair</span>
              <span id="site-name-2">share</span>
            </p>
          </div>
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
        </header>
        <Modal />
      </ModalProvider>
    </>
  );
}

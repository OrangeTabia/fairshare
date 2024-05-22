import { useEffect, useState, useRef } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ModalProvider, Modal } from "../context/Modal";
import { thunkAuthenticate } from "../redux/session";
import { useNavigate } from "react-router-dom";

import Navigation from "../components/Navigation/Navigation";
import OpenModalMenuItem from "../components/Navigation/OpenModalMenuItem";
import LoginFormModal from "../components/LoginFormModal";
import SignupFormModal from "../components/SignupFormModal";
import loadState from "../utils/loadData";

export default function Layout() {
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(thunkAuthenticate())
      .then(() => loadState(dispatch))
      .then(() => setIsLoaded(true))
      .catch((error) => console.log(error));
  }, [dispatch]);

  useEffect(() => {
    if (!user) {
      navigate("/", { replace: true });
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
            {user && isLoaded ? (
              <Navigation />
            ) : (
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
            )}
          </div>
        </header>
        {user && <Outlet />}
        <Modal />
      </ModalProvider>
    </>
  );
}

import { NavLink } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { useState, useEffect } from "react";
import WalkthroughModal from "../modals/WalkthroughModal/WalkthroughModal";
import "./Navigation.css";



function LoggedInNavigation() {
  const { setModalContent } = useModal();
  const [navInvisible, setNavInvisible] = useState(window.innerWidth < 800);

  const handleResources = () => {
    const modalComponent = <WalkthroughModal />
    setModalContent(modalComponent);
  }

    // used to track the size of the page and remove sections based on the size
    useEffect(() => {
      const mediaQuery = window.matchMedia('(min-width: 800px)');

      const removeSomeNav = (e) => {
        setNavInvisible(!e.matches)
      }
      removeSomeNav(mediaQuery);

      mediaQuery.addEventListener('change', removeSomeNav);
      return () => {
        mediaQuery.removeEventListener('change', removeSomeNav)
      }

    }, [])

  return (
    <>
      <nav className="nav-header">
        <NavLink onClick={handleResources} style={{display: navInvisible ? 'none' : 'block'}}>
          <span className="animated-text-underline">Resources</span>
        </NavLink>
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

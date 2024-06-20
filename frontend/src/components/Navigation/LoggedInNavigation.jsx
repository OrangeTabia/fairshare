import { NavLink } from "react-router-dom";
import { useModal } from "../../context/Modal";
import WalkthroughModal from "../modals/WalkthroughModal/WalkthroughModal";
import "./Navigation.css";



function LoggedInNavigation() {
  const { setModalContent } = useModal();

  const handleResources = () => {
    const modalComponent = <WalkthroughModal />
    setModalContent(modalComponent);
  }

  return (
    <>
      <nav className="nav-header">
        <NavLink onClick={handleResources}>
          <span className="animated-text-underline">Resources</span>
        </NavLink>
        <NavLink to="/">
          <span className="animated-text-underline">Dashboard</span>
        </NavLink>
        <NavLink to="/expenses">
          <span className="animated-text-underline">Expenses</span>
        </NavLink>
        <div className='media-less-than-1000'>
          <span className="animated-text-underline">Developers</span>
        </div>
      </nav>
    </>
  );
}

export default LoggedInNavigation;

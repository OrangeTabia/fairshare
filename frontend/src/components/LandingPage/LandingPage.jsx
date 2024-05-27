import { ModalProvider, Modal } from "../../context/Modal";

import LandingNavigation from "../../components/Navigation/LandingNavigation";
import LandingPageLayout from './LandingPageLayout'
import './LandingPage.css'; 

export default function LandingPage() {

  return (
    <>
      <ModalProvider>
        <header id="main-header">
          <div id="header-content">
            <p id="site-name">
              <span id="site-name-1">fair</span>
              <span id="site-name-2">share</span>
            </p>
            <LandingNavigation />
          </div>
        </header>
        <main id="main-content">
          <LandingPageLayout />
        </main>
        <Modal />
      </ModalProvider>
    </>
  );
}

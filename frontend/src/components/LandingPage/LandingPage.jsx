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
        <footer id='main-footer'>
          <div id='footer-container'>
            <div id='developers-container'>
              <div className='footer-devs'>
                <a href="https://github.com/llfbh33" target="_blank" rel="noreferrer">Aubrie Woodbine</a>
              </div>
              <div className='footer-devs'>
                <a href="https://github.com/ethanharrasser" target="_blank" rel="noreferrer">Ethan Harrasser</a>
              </div>
              <div className='footer-devs'>
                <a href="https://github.com/jeramief" target="_blank" rel="noreferrer">Jeramie Forbes</a>
              </div>
              <div className='footer-devs'>
                <a href="https://github.com/OrangeTabia" target="_blank" rel="noreferrer">Tabia Ye</a>
              </div>
            </div>
            <div id='footer-name'>
              &copy;&nbsp;fairshare 2024
            </div>
          </div>
        </footer>
      </ModalProvider>
    </>
  );
}

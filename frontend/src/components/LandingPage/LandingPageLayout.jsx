import './LandingPage.css'; 
import SignupFormModal from '../modals/SignupFormModal';
import OpenModalButton from '../modals/OpenModalButton';
import { useModal } from '../../context/Modal'; 

import LandingPageImg from '../../../images/landing-page-img2.png';
import HousematesIcon from '../../../images/housemates.png'
import TravelIcon from '../../../images/travel.png';
import GroupsIcon from '../../../images/groups.png';
import Friends from '../../../images/friends.png';

function LandingPageLayout () {
    const { closeModal } = useModal();
    return (
        <div id='landing-main-container'>
            <div className='elements-landing-container'>
                <div className='landing-motto-container'>
                    <div id="landing-mottos">
                        <h1 className='first-mot-line'>You want to share?</h1>
                        <h1 className='second-mot-line'>We make it fair!</h1>
                    </div>
                    <div id="landing-icons">
                        <img className="landing-icon-images" src={HousematesIcon} alt="house"></img>
                        <img className="landing-icon-images" src={TravelIcon} alt="plane"></img>
                        <img className="landing-icon-images" src={GroupsIcon} alt="group"></img>
                        <img className="landing-icon-images" src={Friends} alt="friends"></img>
                    </div>
                    <div id="landing-sentence">
                        <span>Keep track of your shared expenses and balances <br></br>with <span className="icons">housemates</span>, <span className="icons">trips</span>, <span className="icons">groups</span>, <span className="icons">friends</span>, and <span className="icons">family</span>.</span>
                    </div>
                    <div className="big-signup">
                        <OpenModalButton
                            buttonText="Sign Up"
                            onItemClick={closeModal}
                            modalComponent={<SignupFormModal />}
                        />
                    </div>

                </div>
                <div className='landingPage-image-container'>
                    <img className='landingPage-image' src={LandingPageImg} />
                    <p>Payments can be made through Venmo, PayPal, or your bank account.</p>
                    <p>Android and iOS application features coming soon!</p>

                </div>
            </div>
            <div>
                <div style={{height: '1000px'}}>MORE LANDING CONTENT</div>
            </div>
        </div>
    )
}

export default LandingPageLayout;

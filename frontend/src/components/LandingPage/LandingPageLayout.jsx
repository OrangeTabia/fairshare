import './LandingPage.css'; 
import SignupFormModal from '../modals/SignupFormModal';
import OpenModalButton from '../modals/OpenModalButton';
import { useModal } from '../../context/Modal'; 

import LandingPageImg from '../../../images/landing-page-img.png';
import HousematesIcon from '../../../images/housemates.png'
import TravelIcon from '../../../images/travel.png';
import GroupsIcon from '../../../images/groups.png';
import Friends from '../../../images/friends.png';

function LandingPageLayout () {
    const { closeModal } = useModal();
    return (
        <div id='landingPage-main-container'>
            <div className='elements-landing-container'>
                <div className='landingPage-moto-container'>
                    <div id="landing-mottos">
                        <h1 className='first-mot-line'>You want to $hare?</h1>
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
                    <div>
                        <OpenModalButton
                            id="big-signup-button"
                            buttonText="Sign Up"
                            onItemClick={closeModal}
                            modalComponent={<SignupFormModal />}
                        />
                    </div>

                </div>
                <div className='landingPage-image-container'>
                    <img className='landingPage-image' src={LandingPageImg} />
                </div>
            </div>
        </div>
    )
}

export default LandingPageLayout;

import './LandingPage.css'; 
import SignupFormModal from '../modals/SignupFormModal';
import OpenModalButton from '../modals/OpenModalButton';
import { useModal } from '../../context/Modal'; 

import LandingPageImg from '../../../images/landing-page-img2.png';
import HousematesIcon from '../../../images/housemates.png'
import LandingPageImg3 from '../../../images/landing3.png';
import LandingPageImg4 from '../../../images/landing2.png';
import TravelIcon from '../../../images/travel.png';
import GroupsIcon from '../../../images/groups.png';
import Friends from '../../../images/friends.png';

function LandingPageLayout () {
    const { closeModal } = useModal();
    return (
        <div id='landing-main-container'>
            <div className='landing-elements-container1'>
                <div id='left-container1'>
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
                {/* <div id='right-container1'>
                </div> */}
            </div>

            <div className='landing-elements-container2'>
                <div id='left-container2'>
                    <img src={LandingPageImg3} alt='settle-up-image'></img>
                </div>
                <div id='right-container2'>
                    <h1>Pay friends back</h1>
                    <p>Settle up with a friend and record any <br></br>cash or online payment.</p>
                </div>
            </div>

            <div className='landing-elements-container3'>
                <div id='left-container2'>
                    <h1>Add expenses easily</h1>
                    <p>Quickly add expenses before you forget who paid.</p>
                </div>
                <div id='right-container2'>
                    <img src={LandingPageImg4} alt='add-expense-image'></img>
                </div>
            </div>
        </div>
    )
}

export default LandingPageLayout;

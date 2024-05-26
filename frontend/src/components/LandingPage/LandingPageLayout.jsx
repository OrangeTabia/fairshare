import './LandingPage.css'; 
import LandingPageImg from '../../../images/landing-page-img.png';
import SignupFormModal from '../modals/SignupFormModal';
import OpenModalButton from '../modals/OpenModalButton';
import { useModal } from '../../context/Modal'; 

function LandingPageLayout () {
    const { closeModal } = useModal();
    return (
        <div id='landingPage-main-container'>
            <div className='elements-landing-container'>
                <div className='landingPage-moto-container'>
                    <h1 className='first-mot-line'>You want to $hare?</h1>
                    <h1 className='second-mot-line'>We make it fair!</h1>
                    <div id="landing-sentence">
                        <p>Keep track of your shared expenses and balances with housemates, trips, groups, friends, and family.</p>
                    </div>
                    <div>
                        <OpenModalButton
                            className="big-signup-button"
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

import './LandingPage.css'; 
import LandingPageImg from '../../../images/landing-page-img.png';

function LandingPageLayout () {
    return (
        <div id='landingPage-main-container'>
            <div className='elements-landing-container'>
                <div className='landingPage-moto-container'>
                    <h1 className='first-mot-line'>You want to share?</h1>
                    <h1 className='second-mot-line'>We make it fair!</h1>
                    <p>Keep track of your shared expenses and balances with housemates, trips, groups, friends, and family.</p>
                    <button>Sign up</button>
                </div>
                <div className='landingPage-image-container'>
                    <img className='landingPage-image' src={LandingPageImg} />
                </div>
            </div>


        </div>
    )
}

export default LandingPageLayout;

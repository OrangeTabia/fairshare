import './DevLinksList.css';
import LinkedInIcon from '../../../images/linkedin-logo.png'; 
import GitHubIcon from '../../../images/github-logo.png';

function DevLinksList() {
    return (
        <div>
            <h4 id="dev-list-title">DEVELOPED BY:</h4>
            <div className="dev-list">
            <div className="dev-name">
                    <span>Aubrie Woodbine&nbsp;&nbsp;
                    <span><a href="https://github.com/llfbh33" target="_blank" rel="noreferrer"><img src={GitHubIcon} alt="github-icon" className="github-icon"></img></a></span>
                    <span>&nbsp;&nbsp;<a href="https://www.linkedin.com/in/aubriewoodbine/" target="_blank" rel="noreferrer"><img src={LinkedInIcon} alt="linkedin-icon" className="linkedin-icon"></img></a></span>
                    </span>
                </div>

                <div className="dev-name">
                    <span>Ethan Harrasser&nbsp;&nbsp;
                    <span><a href="https://github.com/ethanharrasser" target="_blank" rel="noreferrer"><img src={GitHubIcon} alt="github-icon" className="github-icon"></img></a></span>
                    <span>&nbsp;&nbsp;<img src={LinkedInIcon} alt="linkedin-icon" className="linkedin-icon"></img></span>
                    </span>
                </div>
                
                <div className="dev-name">
                    <span>Jeramie Forbes&nbsp;&nbsp;
                    <span><a href="https://github.com/jeramief" target="_blank" rel="noreferrer"><img src={GitHubIcon} alt="github-icon" className="github-icon"></img></a></span>
                    <span>&nbsp;&nbsp;<a href="https://www.linkedin.com/in/jeramieforbes/" target="_blank" rel="noreferrer"><img src={LinkedInIcon} alt="linkedin-icon" className="linkedin-icon"></img></a></span>
                    </span>
                </div>
                
                <div className="dev-name">
                    <span>Tabia Ye&nbsp;&nbsp;
                    <span><a href="https://github.com/OrangeTabia" target="_blank" rel="noreferrer"><img src={GitHubIcon} alt="github-icon" className="github-icon"></img></a></span>
                    <span>&nbsp;&nbsp;<a href="https://www.linkedin.com/in/tabiaye/" target="_blank" rel="noreferrer"><img src={LinkedInIcon} alt="linkedin-icon" className="linkedin-icon"></img></a></span>
                    </span>
                </div>

            </div>
        </div>
    )
}

export default DevLinksList;

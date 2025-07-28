import "../App.css";
import { Link, useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <>
      <div className="LandingPageContainer">
        <nav className="navBar">
          <div className="navHeader">
            <Link to="/" className="Link">
              <div>
                <img src="/Now Call.png" alt="logo image" />
              </div>
              <div>
                <h2>Now Video Call</h2>
              </div>
            </Link>
          </div>
          <div className="navItems">
            <p onClick={() => navigate("/Lobby")}>Join As Guest</p>
            <p onClick={() => navigate("/authentication")}>Register</p>
            <div role="button" onClick={() => navigate("/authentication")}>
              Login
            </div>
          </div>
        </nav>
        <div className="desc">
          <div className="content">
            <h1>
              <span style={{ color: "#ff9839" }}>Connect</span> with your Loved
              Ones
            </h1>
            <p>Apno se baat, Now Video Call ke saath!</p>
            <div className="contentBtn" role="button">
              <Link to="/authentication" className="Link">
                Get Started
              </Link>
            </div>
          </div>
          <div className="mobileImg">
            <img src="/mobile.png" alt="Mobile Image" />
          </div>
        </div>
      </div>
    </>
  );
}

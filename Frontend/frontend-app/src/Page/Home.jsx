import { IconButton } from "@mui/material";
import styles from "../styles/VideoComponent.module.css";
import withAuth from "../Utils/withAuth";
import RestoreIcon from "@mui/icons-material/Restore";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { AuthContext } from "../Contexts/AuthContext";

function Home() {
  const [meetingCode, setMeetingCode] = useState("");

  const navigate = useNavigate();

  const { addToUserHistory } = useContext(AuthContext);

  const handleJoinCall = async () => {
    await addToUserHistory(meetingCode);
    navigate(`/${meetingCode}`);
  };

  return (
    <div className={styles.Home}>
      <nav className={styles.navBar}>
        <div
          onClick={() => navigate("/home")}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.7rem"
          }}
        >
          <div>
            <img
              src="/Now Call.png"
              alt="logo image"
              style={{ width: "60px", borderRadius: "50%", marginTop: "0.5rem" }}
            />
          </div>
          <div>
            <h2>Now Video Call</h2>
          </div>
        </div>

        <div className={styles.navItems}>
          <IconButton
            onClick={() => navigate("/history")}
            style={{ fontSize: "1.1rem", marginTop: "0.1rem" }}
          >
            <RestoreIcon></RestoreIcon>
            <span>History</span>
          </IconButton>

          <div
            role="button"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/authentication");
            }}
            style={{ fontSize: "1.1rem", fontWeight: "500" }}
          >
            Logout
          </div>
        </div>
      </nav>

      <div className={styles.joinCall}>
        <div className={styles.leftPanel}>
          <h1>Provide Quality Video Calls Just Like Quality Education</h1>

          <TextField
            onChange={(e) => setMeetingCode(e.target.value)}
            id="outlined-basic"
            label="Enter Your Meeting Code"
            variant="outlined"
          />
          <br></br>
          <br></br>
          <Button variant="contained" onClick={handleJoinCall}>
            Join
          </Button>
        </div>

        <div className={styles.rightPanel}>
          <img src="/logo3.png" alt="mobile logo" />
        </div>
      </div>
    </div>
  );
}

export default withAuth(Home);

import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContext";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import styles from "../styles/videoComponent.module.css";
import { IconButton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

export default function History() {
  const router = useNavigate();

  const { getHistoryOfUser } = useContext(AuthContext);

  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    let fetchHistory = async () => {
      try {
        let history = await getHistoryOfUser();
        console.log("History response:", history);
        setMeetings(history.meetings);
      } catch (e) {
        console.log("Error fetching history", e);
      }
    };

    fetchHistory();
  }, []);

  let formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  return (
    <div>
      <div className={styles.homeIcon}>
        <IconButton onClick={() => router("/home")}>
          <HomeIcon></HomeIcon>
        </IconButton>
      </div>
      {meetings.length !== 0 ? (
        meetings.map((e, index) => {
          console.log(e);
          return (
            <Card variant="outlined" key={index}>
              <CardContent>
                <Typography
                  gutterBottom
                  sx={{ color: "text.secondary", fontSize: 14 }}
                >
                  Code: {e.meeting_code}
                </Typography>
                <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
                  Date: {formatDate(e.date)}
                </Typography>
              </CardContent>
            </Card>
          );
        })
      ) : (
        <Typography>No meeting History Available!</Typography>
      )}
    </div>
  );
}

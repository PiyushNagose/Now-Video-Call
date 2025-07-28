import { useContext, useEffect, useState } from "react";
import {
  Avatar,
  Button,
  TextField,
  Paper,
  Box,
  Snackbar,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import axios from "axios";
import { AuthContext } from "../Contexts/AuthContext";

const defaultTheme = createTheme();

const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_API;

export default function Authentication() {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const res = await axios.get(
          `https://api.unsplash.com/photos/random?query=nature,technology,city,travel&orientation=landscape`,
          {
            headers: {
              Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
            },
          }
        );
        setImageUrl(res.data.urls.regular);
      } catch (error) {
        console.error(
          "Error fetching image:",
          error.response?.data || error.message
        );
        setImageUrl("https://source.unsplash.com/1600x900/?nature,technology");
      }
    };

    fetchImage();
  }, []);

  const [formState, setFormState] = useState(0);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const { handleRegister, handleLogin } = useContext(AuthContext);

  let handleAuth = async () => {
    try {
      if (formState === 0) {
        let result = await handleLogin(email, password);
        console.log(result);
        setMessage(result || "login success!");
        setOpen(true);
      }
      if (formState === 1) {
        let result = await handleRegister(username, email, password);
        console.log(result);
        setUsername("");
        setEmail("");
        setMessage(result);
        setOpen(true);
        setError("");
        setFormState(0);
        setPassword("");
      }
    } catch (err) {
      console.log(err);
      let message = err.response.data.message;
      setError(message);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "7fr 5fr" },
          height: "100vh",
        }}
      >
        {/* Left Image Panel */}
        <Box
          sx={{
            display: { xs: "none", md: "block" },
            width: "100%",
            height: "100vh",
            backgroundImage: `url(${imageUrl})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* Right Form Panel */}
        <Paper
          square
          elevation={6}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              width: "80%",
              maxWidth: "400px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>

            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
              <Button
                variant={formState === 0 ? "contained" : "outlined"}
                onClick={() => setFormState(0)}
              >
                Sign In
              </Button>
              <Button
                variant={formState === 1 ? "contained" : "outlined"}
                onClick={() => setFormState(1)}
              >
                Sign Up
              </Button>
            </Box>

            <Box component="form" noValidate sx={{ mt: 1, width: "100%" }}>
              {formState === 1 && (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  value={username}
                  autoFocus
                  onChange={(e) => setUsername(e.target.value)}
                />
              )}

              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                value={password}
                id="password"
                onChange={(e) => setPassword(e.target.value)}
              />

              <p style={{ color: "red", fontSize: 14 }}> {error}</p>

              <Button
                type="button"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleAuth}
              >
                {formState === 0 ? "Login" : "Register"}
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>

      <Snackbar open={open} autoHideDuration={4000} message={message} />
    </ThemeProvider>
  );
}

import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { makeStyles } from "@mui/styles";

// 1. הגדרת העיצוב (CSS בתוך JS)
const useStyles = makeStyles({
  // המעטפת של כל העמוד (במקום page-container)
 
  // הכרטיס הלבן במרכז (במקום card)
  card: {
    backgroundColor: "white",
    padding: "40px",
    borderRadius: "15px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)", // צל עדין
    width: "400px",
    maxWidth: "90%", // כדי שלא יחרוג במובייל
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  // הכותרת
  welcomingLabel: {
    fontSize: "1.8rem",
    color: "#08155a",
    fontWeight: "bold",
    marginBottom: "20px",
    textAlign: "center",
    fontFamily: "'Poppins', sans-serif",
  },
  // קונטיינר לשדות הקלט
  formContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "15px", // רווח אחיד בין השדות
    width: "100%",
    marginBottom: "20px",
  },
  // קונטיינר לכפתורים
  buttonsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    width: "100%",
  },
});

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{10,}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Register = () => {
  const navigate = useNavigate();
  const classes = useStyles(); // שימוש בעיצובים

  const [mail, setMail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");

  const [mailError, setMailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleRegister = async () => {
    // ולידציות
    if (!emailRegex.test(mail)) return setMailError("Invalid email format");
    if (password !== verifyPassword) return alert("Passwords do not match!");
    if (!passwordRegex.test(password)) {
      return setPasswordError("Password must be 10+ chars with Upper, Lower, Number & Special");
    }

    // שליחה לשרת
    try {
      await axios.post("http://localhost:3000/register", {
        username: userName,
        email: mail,
        password: password,
      });

      alert("Registration Successful! Please Login.");
      navigate("/");
    } catch (error) {
      console.error("Registration failed:", error);
      if (error.response?.status === 409) {
        alert("User already exists!");
      } else {
        alert("Registration failed. Please try again.");
      }
    }
  };

  return (
    <div>
      <div className={classes.card}>
        <div className={classes.welcomingLabel}>
          Welcome to our site, please register:
        </div>

        <div className={classes.formContainer}>
          <TextField
            label="Email" variant="standard"
            value={mail}
            error={!!mailError} helperText={mailError}
            onChange={(e) => {
                setMail(e.target.value);
                setMailError("");
            }}
          />
          <TextField
            label="Username" variant="standard"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <TextField
            label="Password" type="password" variant="standard"
            value={password}
            error={!!passwordError} helperText={passwordError}
            onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError("");
            }}
          />
          <TextField
            label="Verify Password" type="password" variant="standard"
            value={verifyPassword}
            onChange={(e) => setVerifyPassword(e.target.value)}
          />
        </div>

        <div className={classes.buttonsContainer}>
          <Button variant="contained" color="primary" startIcon={<PersonAddIcon />} onClick={handleRegister}>
            Register
          </Button>
          <Button onClick={() => navigate("/")}>
            Back to Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Register;
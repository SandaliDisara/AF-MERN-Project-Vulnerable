import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button, Grid, Paper } from "@material-ui/core";
import { Email, Lock } from "@material-ui/icons";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "90vh",
    overflow: "hidden",
  },
  formContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  paper: {
    padding: theme.spacing(3),
    borderRadius: 15,
    backgroundColor: "#e6ffe6",
  },
  form: {
    width: "100%",
  },
  submitBtn: {
    marginTop: theme.spacing(2),
    backgroundColor: "#1a8b1f",
    "&:hover": {
      backgroundColor: "#2cbb2c",
    },
  },
}));

export default function LandingPageGrassroot() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8070/staff/loginStaff", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        navigate("/agriServices");
      } else {
        alert("Login failed. Please check your credentials and try again.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className={classes.root}>
      <Grid container className={classes.formContainer}>
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <Paper elevation={3} className={classes.paper}>
            <form className={classes.form} onSubmit={handleSubmit}>
              <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
                Login to Your Account
              </h2>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Username"
                    InputProps={{
                      startAdornment: <Email style={{ color: "#1a8b1f" }} />,
                    }}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Password"
                    type="password"
                    InputProps={{
                      startAdornment: <Lock style={{ color: "#1a8b1f" }} />,
                    }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submitBtn}
                fullWidth
              >
                Login
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

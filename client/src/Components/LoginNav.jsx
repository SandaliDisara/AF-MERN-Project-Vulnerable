import { ThemeProvider, makeStyles } from '@material-ui/core/styles';
import { createTheme } from "@material-ui/core/styles";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { GoogleLogout } from 'react-google-login';
import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';

// Create a theme with desired colors
const theme = createTheme({
  palette: {
    primary: {
      main: "#1a8b1f", // Set your desired primary color here
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    marginRight: theme.spacing(10),
  },
  logoutButton: {
    marginLeft: 'auto',
  },
}));

export default function Navbar() {
  const classes = useStyles();
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const navigate = useNavigate();

  // Manage login state
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if the user is logged in when the component mounts
  useEffect(() => {
    const hasLoggedIn = sessionStorage.getItem("hasLoggedIn");
    setIsLoggedIn(!!hasLoggedIn); // If 'hasLoggedIn' exists, set to true
  }, []);

  // Google logout success
  const onLogoutSuccess = () => {
    console.log("Google Logout Success!");

    // Clear session data and navigate to login
    sessionStorage.removeItem("hasLoggedIn");
    setIsLoggedIn(false); // Update the state to reflect the logout
    navigate("/login");
  }

  // Google logout failure
  const onLogoutFailure = (res) => {
    console.log("Google Logout Failed! res: ", res);
  }

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              LAAIF
            </Typography>

            {/* Show Google Logout if user is logged in, else show Login */}
            {isLoggedIn ? (
              <GoogleLogout
                clientId={clientId}
                buttonText={"Logout"}
                onLogoutSuccess={onLogoutSuccess}
                onFailure={onLogoutFailure}
                className={classes.logoutButton}
              />
            ) : (
              // Show User Home button only if not logged in
              <Button color="inherit" href="/">User Home</Button>
            )}
          </Toolbar>
        </AppBar>
      </div>
    </ThemeProvider>
  );
}

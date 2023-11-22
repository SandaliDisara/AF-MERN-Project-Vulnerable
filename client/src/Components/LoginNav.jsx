import { ThemeProvider, makeStyles } from '@material-ui/core/styles';
import { createTheme } from "@material-ui/core/styles";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


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

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              LAAIF
            </Typography>
            <div>
              <Button color="inherit" href="/">User Home</Button>
            </div>
            <Button color="inherit" href="/login" className={classes.logoutButton}>Logout</Button>
          </Toolbar>
        </AppBar>
      </div>
    </ThemeProvider>
  );
}

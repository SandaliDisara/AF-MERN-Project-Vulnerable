import { useState } from "react";
import axios from "axios";
import { ThemeProvider, makeStyles } from "@material-ui/core/styles";
import { createTheme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Autocomplete from "@mui/material/Autocomplete";
import "../AnimalProduction/AnimalProduction.css";
import { useNavigate } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1a8b1f", // Set your desired primary color here
    },
  },
});

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: theme.spacing(10),
  },
  input: {
    margin: theme.spacing(1),
    width: "50%",
  },
  button: {
    margin: theme.spacing(3),
    width: "25%",
  },

  root: {
    display: "flex",
    margin: theme.spacing(1.5),
    gap: theme.spacing(3),
    alignItems: "center",
  },
}));

export default function Beef() {
  const classes = useStyles();
  const navigate = useNavigate();

  // const [ID , setID] = useState(null);
  const [District, setDistrict] = useState('');
  const [Division, setDivision] = useState('');
  const [RiceType, setRiceT] = useState('');
  const [Season, setSeason] = useState('');
  const [CLArea, setCLArea] = useState('');
  const [Harvest, setHarvest] = useState('');
  const [SurplusDeficit, setSurDef] = useState(''); 
  const [Year, setYear] = useState('');

  function sendData(e) {
    e.preventDefault();
    const newRice = {
      District,
      Division,
      RiceType,
      Season,
      CLArea,
      Harvest,
      SurplusDeficit,
      Year,
    };
    console.log(newRice);
    //send http request
    axios
      .post("http://localhost:8070/riceProduction/addRiceProduction", newRice)
      .then(() => {
        alert("New Rice details added");
       
        navigate("/vrice");
      })
      .catch((err) => {
        alert(err);
      });
  }

  const Regi = [
    // Regi = Region
    { label: "Rathnapura", option: "Rathnapura" },
    { label: "Kegalle", option: "Kegalle" },
  ];

  const Divi = [
    // Divi = Division
    { label: "Rabukkana", option: "Rabukkana" }, // Kegalle divisions list starts
    { label: "Mavanalla", option: "Mavanalla" },
    { label: "Aranayake", option: "Aranayake" },
    { label: "Kegalle", option: "Kegalle" },
    { label: "Galigamuwa", option: "Galigamuwa" },
    { label: "Varakapola", option: "Varakapola" },
    { label: "Ruwanwalla", option: "Ruwanwalla" },
    { label: "Bulathkohupitiya", option: "Bulathkohupitiya" },
    { label: "Yatiyanthota", option: "Yatiyanthota" },
    { label: "Dehiowita", option: "Dehiowita" },
    { label: "Daraniyagala", option: "Daraniyagala" },
    { label: "Undugoda", option: "Undugoda" }, // Kegalle divisions list ends

    { label: "Ahaliyagoda", option: "Ahaliyagoda" }, // Rathnapura divisions list starts
    { label: "Kuruwita", option: "Kuruwita" },
    { label: "Kiriella", option: "Kiriella" },
    { label: "Rathnapura", option: "Rathnapura" },
    { label: "Ibulpee", option: "Ibulpee" },
    { label: "Balangoda", option: "Balangoda" },
    { label: "Kalthota", option: "Kalthota" },
    { label: "Oopanayeka", option: "Oopanayeka" },
    { label: "Palmadulla", option: "Palmadulla" },
    { label: "Elapaana", option: "Elapaana" },
    { label: "Ayagama", option: "Ayagama" },
    { label: "Kalawaana", option: "Kalawaana" },
    { label: "Niwithigala", option: "Niwithigala" },
    { label: "Kahawatte", option: "Kahawatte" },
    { label: "Godakawela", option: "Godakawela" },
    { label: "Weligepola", option: "Weligepola" },
    { label: "Abilipitiya", option: "Abilipitiya" },
    { label: "Kollonna", option: "Kollonna" }, // Rathnapura divisions list ends
  ];

  return (
    <ThemeProvider theme={theme}>
      <form className={classes.form} onSubmit={sendData}>
        <h1 className="h1">Rice Details</h1>
        <div className={classes.root}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            sx={{ width: 325 }}
            options={Regi}
            textContent={District}
            onChange={(e) => {setDistrict(e.target.textContent);}}
            renderInput={(params) => <TextField {...params} label="Select District" required = {true}/>}  
          />
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            sx={{ width: 325 }}
            options={Divi}
            textContent={Division}
            onChange={(e) => {setDivision(e.target.textContent);}}
            renderInput={(params) => <TextField {...params} label="Select Division" required = {true}/>}
          />
        </div>

        <TextField
          className={classes.input}
          label="Rice Type"
          variant="outlined"
          name="species" // name from the animal object
          onChange={(e) => {
            setRiceT(e.target.value);
          }}
          required = {true}
        />
        <TextField
          className={classes.input}
          label="Season"
          variant="outlined"
          name="age"
          onChange={(e) => {
            setSeason(e.target.value);
          }}
          required = {true}
        />
        <TextField
          className={classes.input}
          label="Cultivated Area"
          variant="outlined"
          color="primary"
          name="habitat"
          onChange={(e) => {
            setCLArea(e.target.value);
          }}
          required = {true}
        />

      <TextField
        className={classes.input}
        label="Harvest"
        variant="outlined"
        name="Cattle Population" // name from the animal object
        onChange={(e) => {
          setHarvest(e.target.value);
        }}
        required = {true}
      />
  

        <TextField
          className={classes.input}
          label="Surpuls / Deficit"
          variant="outlined"
          color="primary"
          name="habitat"
          onChange={(e) => {
            setSurDef(e.target.value);
          }}
          required = {true}
        />
        <TextField
          className={classes.input}
          label="Year"
          variant="outlined"
          color="primary"
          name="habitat"
          onChange={(e) => {
            setYear(e.target.value);
          }}
          required = {true}
        />

        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          type="submit"
        >
          Add Rice
        </Button>
      </form>
    </ThemeProvider>
  );
}

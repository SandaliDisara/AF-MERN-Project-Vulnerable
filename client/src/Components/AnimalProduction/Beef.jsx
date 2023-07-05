import { useState } from "react";
import axios from "axios";
import { ThemeProvider, makeStyles } from "@material-ui/core/styles";
import { createTheme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Autocomplete from "@mui/material/Autocomplete";
import "./AnimalProduction.css";
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

  // const [beefID, beefPID] = useState("");
  const [Region, setRegion] = useState("");
  const [Division, setDivision] = useState("");
  const [CPopulation, setCPopulation] = useState("");
  const [NeedPP, setNeedPP] = useState("");
  const [ConsuptionPY, setConsuptionPY] = useState("");
  const [SurplusDeficit, setSurplusDeficit] = useState("");
  const [AvgCWeight, setAvgCWeight] = useState("");
  const [productionValue, setPproductionValue] = useState("");

  function sendData(e) {
    e.preventDefault();
    const newBeef = {
      Region,
      Division,
      CPopulation,
      NeedPP,
      ConsuptionPY,
      SurplusDeficit,
      AvgCWeight,
      productionValue,
    };
    console.log(newBeef);
    //send http request
    axios
      .post("http://localhost:8070/beefProduction/addBeefProduction", newBeef)
      .then(() => {
        alert("New Beef details added");
       
        navigate("/vbeef");
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
        <h1 className="h1">Cattle Details</h1>
        <div className={classes.root}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            sx={{ width: 325 }}
            options={Regi}
            textContent={Region}
            onChange={(e) => {setRegion(e.target.textContent);}}
            renderInput={(params) => <TextField {...params} label="Select Region" required = {true}/>}  
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
          label="Cattle Population"
          variant="outlined"
          name="species" // name from the animal object
          onChange={(e) => {
            setCPopulation(e.target.value);
          }}
          required = {true}
        />
        <TextField
          className={classes.input}
          label="Consuption per person"
          variant="outlined"
          name="age"
          onChange={(e) => {
            setNeedPP(e.target.value);
          }}
          required = {true}
        />
        <TextField
          className={classes.input}
          label="Consumption per year"
          variant="outlined"
          color="primary"
          name="habitat"
          onChange={(e) => {
            setConsuptionPY(e.target.value);
          }}
          required = {true}
        />

      <TextField
        className={classes.input}
        label="Surplus / Deficit"
        variant="outlined"
        name="Cattle Population" // name from the animal object
        onChange={(e) => {
          setSurplusDeficit(e.target.value);
        }}
        required = {true}
      />
  

        <TextField
          className={classes.input}
          label="Avg weight of cows"
          variant="outlined"
          color="primary"
          name="habitat"
          onChange={(e) => {
            setAvgCWeight(e.target.value);
          }}
          required = {true}
        />
        <TextField
          className={classes.input}
          label="Amount needed to increase production"
          variant="outlined"
          color="primary"
          name="habitat"
          onChange={(e) => {
            setPproductionValue(e.target.value);
          }}
          required = {true}
        />

        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          type="submit"
        >
          Submit
        </Button>
      </form>
    </ThemeProvider>
  );
}

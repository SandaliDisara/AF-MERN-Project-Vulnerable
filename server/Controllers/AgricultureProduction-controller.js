const AgricultureProduction = require("../Models/AgricultureProduction");


//this controller is used to add a new agriculture production.
const addAgricultureProduction = async (req, res, next) => {
    const { 
        District,
        SecretariatDivision,
        OfficerID, 
        ProductionName,
        ProductionType,
        Season,
        TargetedLandArea,
        CultivatedLandArea,
        Harvest,
        Year
        
    } = req.body;

    const newAgricultureProduction = new AgricultureProduction({
        District,
        SecretariatDivision,
        OfficerID, 
        ProductionName,
        ProductionType,
        Season,
        TargetedLandArea,
        CultivatedLandArea,
        Harvest,
        Year,
    });

    newAgricultureProduction.save().then(() => {
        res.json("Agriculture production has been added successfully.")
    })
    .catch((error) => {
        console.log(error)
    });
};

//This controller is used to view all the Agriclture pruduction.
const getAllAgricultureProduction = async (req, res, next) => {
    AgricultureProduction.find().then((agricultureproduction) => {
        res.json(agricultureproduction);
    })
    .catch((error) => {
        console.log(error);
    });
};

//This controller is used to get the agriculture production details by ID
const getAgricultureProductionByID = async (req, res) => {
    let agricultureProductionID = req.params.id;

    const production = await AgricultureProduction.findById(agricultureProductionID).then((production) => {
        res.status(200).send({ status: "Agriculture production is fetched", production});
    })
    .catch((error) => {
        console.log(error.message);
        res.status(500).send({ status: "An internal server error occurred.", error: error.message });
    });
};

//This controller is used to update the agriculture production details
const updateAgricultureProduction = async (req, res, next) => {
    let agricultureProductionID = req.params.id;

    const { 
        District,
        SecretariatDivision,
        OfficerID, 
        ProductionName,
        ProductionType,
        Season,
        TargetedLandArea,
        CultivatedLandArea,
        Harvest,
        Year
    } = req.body;

    const updateAgricultureProduction = {
        District,
        SecretariatDivision,
        OfficerID, 
        ProductionName,
        ProductionType,
        Season,
        TargetedLandArea,
        CultivatedLandArea,
        Harvest,
        Year
    };

    const updateProduction = await AgricultureProduction.findOneAndUpdate(agricultureProductionID, updateAgricultureProduction).then(() => {
        res.status(200).send({ status: "Agriculture production is updated successfully!!"})
    })
    .catch((error) => {
        console.log(error);
        res.status(500).send({ status: "An internal server error occurred.", error: error.message});
    });
};

//This controller is used to delete the agriculture production details.
const deleteAgricultureProduction  = async (req, res, next) => {
    let agricultureProductionID = req.params.id;

    await AgricultureProduction.findOneAndDelete(agricultureProductionID).then(() => {
        res.status(200).send({ status: "Agriculture production have been deleted successfully!!"});
    })
    .catch((error) => {
        console.log(error.message);
        res.status(500).send({ status: "An internal server error occurred.", error: error.message});
    });
};



exports.addAgricultureProduction = addAgricultureProduction;
exports.getAllAgricultureProduction = getAllAgricultureProduction;
exports.getAgricultureProductionByID = getAgricultureProductionByID;
exports.updateAgricultureProduction = updateAgricultureProduction;
exports.deleteAgricultureProduction = deleteAgricultureProduction;
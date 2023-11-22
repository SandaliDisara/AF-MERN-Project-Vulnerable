const ChickenProduction = require("../../Models/AnimalProduction/ChickenProduction");


//this controller is used to add a new chicken production.
const addChickenProduction = async (req, res, next) => {
    const { 
        Region,
        Division,
        CPopulation,
        NeedPP,
        ConsuptionPY,
        SurplusDeficit,
        AvgCWeight,
        productionValue,
    } = req.body;

    const newChickenProduction = new ChickenProduction({
        Region,
        Division,
        CPopulation,
        NeedPP,
        ConsuptionPY,
        SurplusDeficit,
        AvgCWeight,
        productionValue,
    });

    newChickenProduction.save().then(() => {
        res.json("Chicken production has been added successfully.")
    })
    .catch((error) => {
        console.log(error)
    });
};

//This controller is used to view all the chicken pruduction.
const getAllChickenProduction = async (re, res, next) => {
    ChickenProduction.find().then((chickenproduction) => {
        res.json(chickenproduction);
    })
    .catch((error) => {
        console.log(error);
    });
};

//This controller is used to get the chicken production details by ID
const getChickenProductionByID = async (req, res) => {
    let chickenProductionID = req.params.id;

    const production = await ChickenProduction.findById(chickenProductionID).then((production) => {
        res.status(200).send({ status: "Chicken production is fetched", production});
    })
    .catch((error) => {
        console.log(error.message);
        res.status(500).send({ status: "error occured when fetching", error: error.message });
    });
};

//This controller is used to update the chicken production details
const updateChickenProduction = async (req, res, next) => {
    let chickenProductionID = req.params.id;

    const { 
        Region,
        Division,
        CPopulation,
        NeedPP,
        ConsuptionPY,
        SurplusDeficit,
        AvgCWeight,
        productionValue
    } = req.body;

    const updateChickenProduction = {
        Region,
        Division,
        CPopulation,
        NeedPP,
        ConsuptionPY,
        SurplusDeficit,
        AvgCWeight,
        productionValue
    };

    const updateProduction = await ChickenProduction.findByIdAndUpdate(chickenProductionID, updateChickenProduction).then(() => {
        res.status(200).send({ status: "Chicken production is updated successfully!!"})
    })
    .catch((error) => {
        console.log(error);
        res.status(500).send({ status: "Error occured when updating", error: error.message});
    });
};

//This controller is used to delete the chicken production details.
const deleteChickenProduction  = async (req, res, next) => {
    let chickenProductionID = req.params.id;

    await ChickenProduction.findByIdAndDelete(chickenProductionID).then(() => {
        res.status(200).send({ status: "Chicken production have been deleted successfully!!"});
    })
    .catch((error) => {
        console.log(error.message);
        res.status(500).send({ status: "Error when deleting the chicken production", error: error.message});
    });
};



exports.addChickenProduction = addChickenProduction;
exports.getAllChickenProduction = getAllChickenProduction;
exports.getChickenProductionByID = getChickenProductionByID;
exports.updateChickenProduction = updateChickenProduction;
exports.deleteChickenProduction = deleteChickenProduction;



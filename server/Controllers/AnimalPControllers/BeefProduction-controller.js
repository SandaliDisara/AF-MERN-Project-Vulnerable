const BeefProduction = require("../../Models/AnimalProduction/BeefProduction");


//this controller is used to add a new beef production.
const addBeefProduction = async (req, res, next) => {
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

    const newBeefProduction = new BeefProduction({
        Region,
        Division,
        CPopulation,
        NeedPP,
        ConsuptionPY,
        SurplusDeficit,
        AvgCWeight,
        productionValue
    });

    newBeefProduction.save().then(() => {
        res.json("Beef production has been added successfully.")
    })
    .catch((error) => {
        console.log(error)
    });
};

//This controller is used to view all the beef pruduction.
const getAllBeefProduction = async (re, res, next) => {
    BeefProduction.find().then((beefproduction) => {
        res.json(beefproduction);
    })
    .catch((error) => {
        console.log(error);
    });
};

//This controller is used to get the beef production details by ID
const getBeefProductionByID = async (req, res) => {
    let beefProductionID = req.params.id;

    const production = await BeefProduction.findById(beefProductionID).then((production) => {
        res.status(200).send({ status: "Beef production is fetched", production});
    })
    .catch((error) => {
        console.log(error.message);
        res.status(500).send({ status: "error occured when fetching", error: error.message });
    });
};

//This controller is used to update the beef production details
const updateBeefProduction = async (req, res, next) => {
    let beefProductionID = req.params.id;

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

    const updateBeefProduction = {
        Region,
        Division,
        CPopulation,
        NeedPP,
        ConsuptionPY,
        SurplusDeficit,
        AvgCWeight,
        productionValue
    };

    const updateProduction = await BeefProduction.findByIdAndUpdate(beefProductionID, updateBeefProduction).then(() => {
        res.status(200).send({ status: "Beef production is updated successfully!!"})
    })
    .catch((error) => {
        console.log(error);
        res.status(500).send({ status: "Error occured when updating", error: error.message});
    });
};

//This controller is used to delete the beef production details.
const deleteBeefProduction  = async (req, res) => {
    let beefProductionID = req.params.id;

    await BeefProduction.findByIdAndDelete(beefProductionID).then(() => {
        res.status(200).send({ status: "Beef production have been deleted successfully!!"});
    })
    .catch((error) => {
        console.log(error.message);
        res.status(500).send({ status: "Error when deleting the beef production", error: error.message});
    });
};



exports.addBeefProduction = addBeefProduction;
exports.getAllBeefProduction = getAllBeefProduction;
exports.getBeefProductionByID = getBeefProductionByID;
exports.updateBeefProduction = updateBeefProduction;
exports.deleteBeefProduction = deleteBeefProduction;



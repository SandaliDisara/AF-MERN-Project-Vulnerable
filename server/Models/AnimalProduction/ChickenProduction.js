const mongoose = require('mongoose');

const schema = mongoose.Schema;

const chickenProductionSchema = new schema({
    
    Region: {
        type: String,
        required: true
    },
    
    Division: {
        type: String,
        required: true
    },

    CPopulation: { // c = chicken
        type: String,
        required: true
    },

    NeedPP: { // pp = per person
        type: String,
        required: true
    },

    ConsuptionPY: { // py = per year
        type: String,
        required: true
    },

    SurplusDeficit: { // of chicken
        type: String,
        required: true
    },

    AvgCWeight: { // c = chicken
        type: String,
        required: true
    },

    productionValue: { // amount of chicken to increase production
        type: String,
        required: true
    },
})

const chickenProduction = mongoose.model("ChickenProduction", chickenProductionSchema);
module.exports = chickenProduction;
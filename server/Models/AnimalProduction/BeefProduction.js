const mongoose = require('mongoose');

const schema = mongoose.Schema;

const beefProductionSchema = new schema({
    
    Region: {
        type: String,
        required: true
    },
    
    Division: {
        type: String,
        required: true
    },

    CPopulation: {  // c = cattle
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

    SurplusDeficit: { // of cattle
        type: String,
        required: true
    },

    AvgCWeight: { // c = cattle
        type: String,
        required: true
    },

    productionValue: { // amount of cattle to increase production
        type: String,
        required: true
    },

    
})

const beefProduction = mongoose.model("BeefProduction", beefProductionSchema);
module.exports = beefProduction;


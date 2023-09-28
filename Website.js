const mongoose = require("mongoose")

const FAOSchema = new mongoose.Schema(
    {
    DA: String,
    Website: String,
    Email: String,
    Contacted: String,
    DF: String,
    Topic: String,
    LTE: String,
    AnchorText: String,
    PublishedLink: String, 
    Status: String,
    SS: String
    },
    {
        collection: "FAO"
    }
    )

const FAOModel = mongoose.model("FAO", FAOSchema)

module.exports=FAOModel
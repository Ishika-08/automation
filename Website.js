const mongoose = require("mongoose")

const TableSchema = new mongoose.Schema({
    MailBox: String,
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
})

const CTModel = mongoose.model("CTModel", TableSchema, "CT")
const H4Model = mongoose.model("H4Model", TableSchema, "4H")
const CanModel = mongoose.model("CanModel", TableSchema, "Can")
const FAOModel = mongoose.model("FAOModel", TableSchema, "FAO")
const FPModel = mongoose.model("FPModel", TableSchema, "FP")
const SCModel = mongoose.model("SCModel", TableSchema, "SC")
const TPlusModel = mongoose.model("TPlusModel", TableSchema, "TPlus")
const THModel = mongoose.model("THModel", TableSchema, "TH")
const TWModel = mongoose.model("TWModel", TableSchema, "TW")
const VEModel = mongoose.model("VEModel", TableSchema, "VE")


module.exports= {
    CTModel,
    H4Model,
    CanModel,
    THModel,
    TPlusModel,
    FAOModel,
    FPModel,
    SCModel,
    TWModel,
    VEModel
}
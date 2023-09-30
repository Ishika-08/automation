const mongoose = require('mongoose');

const checkLinksSchema = new mongoose.Schema({
  websiteName: String,
  rowID: mongoose.Schema.Types.ObjectId,
  status: String,
  anchorText: String,
  newAnchor: String
},
{
    collection: "checkLinks"
});

const CheckLinksModel = mongoose.model('checkLinks', checkLinksSchema);

module.exports = CheckLinksModel;

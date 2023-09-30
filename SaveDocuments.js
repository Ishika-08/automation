const mongoose = require('mongoose');

const savedDocumentsSchema = new mongoose.Schema({
  docId: String, // Assuming docId is a string
  // Add any other fields you may need here
}, {
  collection: 'SavedDocuments' // Specify the collection name
});

// Create a model for the schema
const SavedDocumentsModel = mongoose.model('SavedDocuments', savedDocumentsSchema);

module.exports = SavedDocumentsModel;

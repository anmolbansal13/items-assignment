const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  // entry: String,
  name: String,
  type: String,
  description: String,
  coverImage: Buffer,
  coverImageMimeType: String,
  additionalImages: [
    {
      data: Buffer,
      mimeType: String,
    },
  ],
});


const Item = mongoose.model('Item', ItemSchema);

module.exports = Item;
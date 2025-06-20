const multer = require('multer');
const path = require('path');

// store files in uploads/ folder
const storage = multer.memoryStorage();

const upload = multer({ storage });
module.exports = upload;
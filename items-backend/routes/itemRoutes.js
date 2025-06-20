const express = require('express');
const upload = require('../config/multer');
const { createItem, getAllItems } = require('../controllers/itemController');

const router = express.Router();

// POST /items
router.post(
  '/',
  upload.fields([
    { name: 'cover-image', maxCount: 1 },
    { name: 'additional-images', maxCount: 10 },
  ]),
  createItem
);

// GET /items
router.get('/', getAllItems);

// GET /items/:id
// router.get('/:id', getItemById);

module.exports = router;
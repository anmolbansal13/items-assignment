// const { v4: uuidv4 } = require('uuid');
const Item = require("../models/Item");
// const be_url = process.env.BACKEND_URL;
// Create new item
const createItem = async (req, res) => {
  try {
    const { name, type, description } = req.body;

    const coverImage = req.files["cover-image"]?.[0] || null;
    const additionalImages = req.files["additional-images"] || [];

    // const entry = `entry-${uuidv4().slice(0, 8)}`;

    const newItem = new Item({
      name,
      type,
      description,
      coverImage: coverImage?.buffer || null,
      coverImageMimeType: coverImage?.mimetype || null,
      additionalImages: additionalImages.map((file) => ({
        data: file.buffer,
        mimeType: file.mimetype,
      })),
    });

    const saved = await newItem.save();
    res.status(201).json(saved);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating item", error: error.message });
  }
};

// Get all items
const getAllItems = async (req, res) => {
  try {
    const items = await Item.find().lean();
    const processedItems = items.map((item) => ({
      ...item,
      coverImage: item.coverImage
        ? `data:${item.coverImageMimeType};base64,${item.coverImage.toString(
            "base64"
          )}`
        : null,
      additionalImages: item.additionalImages.map((img) => ({
        data: `data:${img.mimeType};base64,${img.data.toString("base64")}`,
        mimeType: img.mimeType,
      })),
    }));

    res.json(processedItems);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching items", error: error.message });
  }
};

// Get item by ID
// const getItemById = async (req, res) => {
//   try {
//     const item = await Item.findById(req.params.id);
//     if (!item) return res.status(404).json({ message: 'Item not found' });
//     res.json(item);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching item', error: error.message });
//   }
// };

module.exports = {
  createItem,
  getAllItems,
  // getItemById,
};

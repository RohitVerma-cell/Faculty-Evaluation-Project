const express = require('express');
const router  = express.Router();
const imagekit = require('../config/imagekit');
const upload   = require('../middleware/upload');

// POST /api/upload
router.post('/', upload.single('pdf'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    // ImageKit pe upload karo
    const result = await imagekit.upload({
      file:     req.file.buffer,        
      fileName: req.file.originalname,  
      folder:   '/sap-2025/proofs',     
    });

    res.json({
      message:      'Uploaded successfully',
      fileId:       result.fileId,   
      filePath:     result.url,      
      fileName:     result.name,
      originalName: req.file.originalname,
      size:         req.file.size,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/upload
router.delete('/', async (req, res) => {
  try {
    const { fileId } = req.body;
    if (!fileId) return res.status(400).json({ message: 'fileId required' });

    await imagekit.deleteFile(fileId); 
    res.json({ message: 'File deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
module.exports = router;
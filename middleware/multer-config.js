const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');


const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};


const storage = multer.memoryStorage(); 


const upload = multer({ storage: storage });

const processImage = (req, res, next) => {
  if (!req.file) return next();
  
  const name = req.file.originalname.split(' ').join('_');
  const extension = MIME_TYPES[req.file.mimetype];
  const filename = `${name}-${Date.now()}.${extension}`;

  
  sharp(req.file.buffer)
    .resize(800, 800)
    .jpeg({ quality: 80 })
    .toFile(path.join('images', filename), (err) => {
      if (err) {
        console.error("Erreur lors du traitement de l'image:", err);
        return res.status(500).json({ error: 'Erreur lors du traitement de l\'image' });
      }
      req.file.filename = filename; 
      next(); 
    });
};

module.exports = { upload: upload.single('image'), processImage };
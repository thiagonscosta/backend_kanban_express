require('dotenv').config();

const multer = require('multer');
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

const storage = cloudinaryStorage({
    cloudinary,
    folder: 'avatars',
    allowedFormats: ['jpg', 'png'],
    transformation: [{ width: 90, height: 90, crop: 'limit' }]
});

const parser = multer({ storage });

module.exports = parser;

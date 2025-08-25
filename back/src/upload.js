const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./utils/cloudinary');

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'web-trabajo', // Opcional, crea una carpeta en Cloudinary
        allowed_formats: ['jpg', 'jpeg', 'png', 'gif'],
    },
});

const upload = multer({ storage });

module.exports = upload;

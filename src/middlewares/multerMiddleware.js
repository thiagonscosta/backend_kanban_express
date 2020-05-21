const multer = require('multer');
const path = require('path');

module.exports = (multer({
    storage: new multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'uploads'),
        filename: function (req, file, cb) {
            cb(null, Date.now().toString() + '-' + file.originalname)
        }
    }),

    fileFilter: (req, file, cb) => {
        const isAccepted = ['image/png', 'image/jpg', 'image/jpeg'].find(format => format == file.mimetype);

        if (isAccepted) {
            return cb(null, true);
        }

        return cb(null, false);
    }
}));
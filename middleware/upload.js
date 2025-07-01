// middleware/upload.js
const multer = require('multer');
//const path = require('path');

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/'); // make sure this folder exists
//   },
//   filename: (req, file, cb) => {
//     const ext = path.extname(file.originalname);
//     cb(null, Date.now() + '-' + file.originalname);
//   },
// });


const storage = multer.memoryStorage();

const upload = multer({ storage: storage });
module.exports = upload;

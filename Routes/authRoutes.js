const express = require('express');
const { signup, login, forgotPassword, verifyOtp } = require('../controllers/controllerAuth');
const information = require('../models/files');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();



router.post("/Signup",signup);
router.post("/login",login);
router.post("/forgotpassword",forgotPassword);
router.post("/verifyotp",verifyOtp);

router.post('/upload', auth, upload.single('file'), async (req, res) => {
  try {
    const{ name, description } = req.body;
    
    const product = new information({name,description,file:[{

      filename: req.file.filename,
      originalName: req.file.originalname,
      path: req.file.path,
      mimetype: req.file.mimetype,
      size: req.file.size,
      uploadedBy: req.user.userId, // from JWT

    }]})
    await product.save();
    res.status(201).json({ message: 'File uploaded', product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Get files of logged-in user
// router.get('/myfiles', auth, async (req, res) => {
//   try {
//     const files = await information.find({ uploadedBy: req.user.userId });
//     res.json(files);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });
router.get('/myfiles', async (req, res) => {
  try {
    const files = await information.find();
    res.json(files);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;

//upload.array('files', 5) // max 5 files, for example
// for multiple files upload
// files: req.files.map(file => ({
//   filename: file.filename,
//   originalName: file.originalname,
//   path: file.path,
//   mimetype: file.mimetype,
//   size: file.size,
// }))
